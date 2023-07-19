const { Pokemon, Type } = require('../db.js');

async function newPokemon(req, res) {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos } = req.body;
    if (!nombre || !imagen || !vida || !ataque || !defensa || !tipos || tipos.length < 2) {
        return res.status(422).json({error: 'Datos incompletos'});
    }
    try {
        const newPokemon = await Pokemon.create({
            nombre,
            imagen,
            vida,
            ataque,
            defensa,
            velocidad,
            altura,
            peso
        });
        const tipoIds = [];
        for (const tipoNombre of tipos) {
            const [tipo, created] = await Type.findOrCreate({
                where: { nombre: tipoNombre }
            });
            tipoIds.push(tipo.id);
        }
        await newPokemon.setTypes(tipoIds);
        res.status(200).json(newPokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = newPokemon;
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

async function newPokemon(req, res) {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos } = req.body;

    try {
        if (!nombre || !imagen || !vida || !ataque || !defensa || tipos.length < 2) {
            return res.status(422).json({ error: 'Datos incompletos' });
        }

        const existingPokemonDb = await Pokemon.findOne({ where: { nombre } });
        if (existingPokemonDb) {
            return res.status(409).json({ error: 'Pokemon ya creado' });
        }

        try {
            await axios.get(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
            return res.status(409).json({ error: 'Pokemon ya existe en la API' });
        } catch (apiError) {
        }

        const newPokemon = await Pokemon.create({
            nombre: nombre.toLowerCase(),
            imagen: imagen.toLowerCase(),
            vida: parseInt(vida),
            ataque: parseInt(ataque),
            defensa: parseInt(defensa),
            velocidad: parseInt(velocidad),
            altura: parseInt(altura),
            peso: parseInt(peso)
        });

        const tipoIds = [];
        for (const tipoNombre of tipos) {
            const [tipo, created] = await Type.findOrCreate({ where: { nombre: tipoNombre } });
            tipoIds.push(tipo.id);
        }
        await newPokemon.setTypes(tipoIds);

        const pokemonWithTypes = await Pokemon.findByPk(newPokemon.id, { include: Type });
        const updatedPokemonDb = {
            id: pokemonWithTypes.id,
            nombre: pokemonWithTypes.nombre,
            imagen: pokemonWithTypes.imagen,
            ataque: pokemonWithTypes.ataque,
            origen: 'db',
            tipos: pokemonWithTypes.types.map(type => type.nombre)
        };
        res.status(200).json(updatedPokemonDb);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: "Error al crear el pokemon" });
    }
}

module.exports = newPokemon; 

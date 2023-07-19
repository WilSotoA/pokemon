const { Pokemon } = require('../db.js');
const axios = require('axios');

async function detailPokemon(req, res) {
    const { idPokemon } = req.params;
    const pokemon = await Pokemon.findByPk(idPokemon);
    if (pokemon) return res.status(200).json(pokemon);
    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const pokemon = {
            id: data.id.toString(),
            nombre: data.name,
            imagen: data.sprites.front_default,
            vida: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight
        };
        return res.status(200).json(pokemon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    return res.status(404).json({error: 'El pokemon con ' + idPokemon + ' no se encontro'});
}

module.exports = detailPokemon;
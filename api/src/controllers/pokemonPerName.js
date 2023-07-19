const { Pokemon } = require('../db.js');
const axios = require('axios');

async function pokemonPerName(req, res) {
    let { name } = req.query;
    name = name.toLowerCase();

    try {
        const pokemonDb = await Pokemon.findAll({ where: { nombre: name } });
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const pokemonApi = {
            id: data.id.toString(),
            nombre: data.name,
            imagen: data.sprites.front_default,
            vida: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
            velocidad: data.stats[5].base_stat,
            altura: data.height,
            peso: data.weight
        }
        const mergedResults = pokemonDb.concat(pokemonApi);

        if (!mergedResults.length) {
            res.status(404).json({ error: 'No se encontraron Pokémon.' });
        } else {
            res.status(200).json(mergedResults);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = pokemonPerName;
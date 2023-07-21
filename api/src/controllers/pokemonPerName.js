const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

async function pokemonPerName(req, res) {
    let { name } = req.query;
    name = name.toLowerCase();

    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const tipos = data.types.map((tipo) => tipo.type.name);
        const pokemonApi = {
            id: data.id.toString(),
            nombre: data.name,
            imagen: data.sprites.other.home.front_default,
            tipos: tipos
        };
        const pokemonDb = await Pokemon.findAll({ where: { nombre: name }, include: Type });
        const updatedPokemonDb = pokemonDb.map(pokemon => ({
            id: pokemon.id,
            nombre: pokemon.nombre,
            imagen: pokemon.imagen,
            tipos: pokemon.types.map(type => type.nombre)
        }));
        const result = updatedPokemonDb.concat(pokemonApi);
        res.status(200).json(result);
    } catch (error) {
        const statusCode = error.response ? error.response.status : 500;
        res.status(statusCode).json({ error: error.message });
    }
}

module.exports = pokemonPerName;
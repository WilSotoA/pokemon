const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

async function allPokemons(req, res) {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params: { limit: 500 } });
        const results = data.results;

        // Hacer una solicitud a cada URL de los resultados
        const pokemonDataPromises = results.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            const tipos = data.types.map((tipo) => tipo.type.name);
            return {
                id: data.id.toString(),
                nombre: data.name,
                imagen: data.sprites.other.home.front_default,
                origen: 'api',
                tipos: tipos,
            };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        const pokemonDb = await Pokemon.findAll({ include: Type });
        const updatedPokemonDb = pokemonDb.map(pokemon => ({
            id: pokemon.id,
            nombre: pokemon.nombre,
            imagen: pokemon.imagen,
            origen: 'db',
            tipos: pokemon.types.map(type => type.nombre)
        }));
        const result = pokemonData.concat(updatedPokemonDb);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = allPokemons;
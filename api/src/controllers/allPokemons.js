const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

async function allPokemons(req, res) {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params: { limit: 100 } });
        const results = data.results;

        // Hacer una solicitud a cada URL de los resultados
        const pokemonDataPromises = results.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            const tipos = data.types.map((tipo) => tipo.type.name);
            return {
                id: data.id.toString(),
                nombre: data.name,
                imagen: data.sprites.other.home.front_default,
                vida: data.stats[0].base_stat,
                ataque: data.stats[1].base_stat,
                defensa: data.stats[2].base_stat,
                velocidad: data.stats[5].base_stat,
                altura: data.height,
                peso: data.weight,
                tipos: tipos
            };
        });

        const pokemonData = await Promise.all(pokemonDataPromises);
        const pokemonDb = await Pokemon.findAll({ include: Type });
        const updatedPokemonDb = pokemonDb.map(pokemon => ({
            ...pokemon.dataValues,
            types: pokemon.types.map(type => type.nombre)
        }));
        const result = pokemonData.concat(updatedPokemonDb);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = allPokemons;
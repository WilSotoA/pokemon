const axios = require('axios');
const { Pokemon, Type } = require('../db.js');

async function allPokemons(req, res) {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon', { params: { limit: 40 } });
        const results = data.results;

        // Hacer una solicitud a cada URL de los resultados
        const pokemonDataPromises = results.map(async (pokemon) => {
            try {
                const { data } = await axios.get(pokemon.url);
                const tipos = data.types.map((tipo) => tipo.type.name);
                return {
                    id: data.id.toString(),
                    nombre: data.name,
                    imagen: data.sprites.other.home.front_default,
                    ataque: data.stats[1].base_stat,
                    origen: 'api',
                    tipos: tipos,
                };
            } catch (error) {
                throw new Error(`Error al obtener datos del Pokémon desde la API: ${error.message}`);
            }
        });

        const pokemonData = await Promise.all(pokemonDataPromises);

        try {
            const pokemonDb = await Pokemon.findAll({ include: Type });
            const updatedPokemonDb = pokemonDb.map(pokemon => ({
                id: pokemon.id,
                nombre: pokemon.nombre,
                imagen: pokemon.imagen,
                ataque: pokemon.ataque,
                origen: 'db',
                tipos: pokemon.types.map(type => type.nombre)
            }));
            const result = pokemonData.concat(updatedPokemonDb);
            res.status(200).json(result);
        } catch (error) {
            throw new Error(`Error al obtener datos del Pokémon desde la base de datos: ${error.message}`);
        }
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}
module.exports = allPokemons;
const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

async function detailPokemon(req, res) {
    const { idPokemon } = req.params;
    let pokemonData;

    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idPokemon}`);
        const tipos = data.types.map((tipo) => tipo.type.name);
        pokemonData = {
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
    } catch (error) {
        if (error.response?.status === 404) {
            try {
                const pokemon = await Pokemon.findByPk(idPokemon, { include: Type });
                if (pokemon) {
                    pokemonData = {
                        id: pokemon.id,
                        nombre: pokemon.nombre,
                        imagen: pokemon.imagen,
                        vida: pokemon.vida,
                        ataque: pokemon.ataque,
                        defensa: pokemon.defensa,
                        velocidad: pokemon.velocidad,
                        altura: pokemon.altura,
                        peso: pokemon.peso,
                        tipos: pokemon.types.map(type => type.nombre)
                    };
                }
            } catch (error) {
                return res.status(error.response?.status || 500).json({ error: 'Error al obtener detalles del Pokémon desde la base de datos' });
            }
        } else {
            return res.status(error.response?.status || 500).json({ error: 'Error al obtener detalles del Pokémon desde la API' });
        }
    }

    if (!pokemonData) {
        return res.status(404).json({ error: 'No se encontró el detalle del Pokémon con ese id' });
    }

    return res.status(200).json(pokemonData);
}

module.exports = detailPokemon;
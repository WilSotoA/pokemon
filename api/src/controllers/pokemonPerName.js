const { Pokemon, Type } = require('../db.js');
const axios = require('axios');

async function pokemonPerName(req, res) {
    let { name } = req.query;
    name = name.toLowerCase();

    let pokemonData;

    try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const tipos = data.types.map((tipo) => tipo.type.name);
        pokemonData = [{
            id: data.id.toString(),
            nombre: data.name,
            imagen: data.sprites.other.home.front_default,
            origen: 'api',
            tipos: tipos,
        }];
    } catch (error) {
        if (error.response?.status === 404) {
            try {
                const pokemon = await Pokemon.findOne({ where: { nombre: name }, include: Type });
                if (pokemon) {
                    pokemonData = [{
                        id: pokemon.id,
                        nombre: pokemon.nombre,
                        imagen: pokemon.imagen,
                        ataque: pokemon.ataque,
                        origen: 'db',
                        tipos: pokemon.types.map(type => type.nombre)
                    }];
                }
            } catch (error) {
                return res.status(error.response?.status || 500).json({ error: 'Error al obtener el Pokémon desde la base de datos' });
            }
        } else {
            return res.status(error.response?.status || 500).json({ error: 'Error al obtener el Pokémon desde la API' });
        }
    }

    if (!pokemonData) {
        return res.status(404).json({ error: `No se encontró el Pokémon con el nombre ${name}` });
    }

    return res.status(200).json(pokemonData);
}
module.exports = pokemonPerName;

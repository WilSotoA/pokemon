const { Router } = require('express');
const { Pokemon, Type } = require('../db.js');
const crypto = require('crypto');

const axios = require('axios');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon');
        const results = data.results;

        // Hacer una solicitud a cada URL de los resultados
        const pokemonDataPromises = results.map(async (pokemon) => {
            const { data } = await axios.get(pokemon.url);
            const tipos = data.types.map((tipo) => tipo.type.name);
            return {
                id: data.id.toString(),
                nombre: data.name,
                imagen: data.sprites.front_default,
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
        res.status(500).send(error.message);
    }
});

router.get('/id/:idPokemon', async (req, res) => {
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
        return res.status(404).send('El pokemon con ' + idPokemon + ' no se encontro');
    }
});

router.get('/name', async (req, res) => {
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
            res.status(404).json({ message: 'No se encontraron Pokémon.' });
        } else {
            res.status(200).json(mergedResults);
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
});

router.post('/', async (req, res) => {
    const { nombre, imagen, vida, ataque, defensa, velocidad, altura, peso, tipos } = req.body;
    if (!nombre || !imagen || !vida || !ataque || !defensa || !tipos || tipos.length < 2) {
        return res.status(422).send('Datos incompletos');
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
        res.status(400).send(error.message);
    }

});

router.get('/types', async (req, res) => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/type');
        const types = [];
        for (const typeData of data.results) {
            const [type, created] = await Type.findOrCreate({
                where: { nombre: typeData.name }
            });
            types.push(type);
        }

        res.status(200).json(types);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


module.exports = router;
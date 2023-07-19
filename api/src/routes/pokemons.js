const allPokemons = require('../controllers/allPokemons.js');
const detailPokemon = require('../controllers/detailPokemon.js');
const pokemonPerName = require('../controllers/pokemonPerName.js');
const newPokemon = require('../controllers/newPokemon.js');
const types = require('../controllers/types.js');

const { Router } = require('express');
const router = Router();

router.get('/', allPokemons);

router.get('/id/:idPokemon', detailPokemon);

router.get('/name', pokemonPerName);

router.post('/', newPokemon);

router.get('/types', types);


module.exports = router;
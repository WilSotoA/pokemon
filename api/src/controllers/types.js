const axios = require('axios');
const { Type } = require('../db.js');

async function types(req, res) {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/type');
        const types = [];

        for (const typeData of data.results) {
            try {
                const [type, created] = await Type.findOrCreate({
                    where: { nombre: typeData.name }
                });
                types.push(type);
            } catch (error) {
                console.error(`Error al buscar o crear el tipo ${typeData.name}: ${error.message}`);
            }
        }
        res.status(200).json(types);
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
}

module.exports = types;
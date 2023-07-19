const axios = require('axios');
const { Type } = require('../db.js');

async function types(req, res) {
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
        res.status(500).json({ error: error.message });
    }
}

module.exports = types;
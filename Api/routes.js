// Importando as dependências do projeto
const express = require("express");
const routes = express.Router();
const Pokedex = require('./models/Pokemons');
const { createRandomPokedexEntry } = require('./models/Pokemons');
// Referencia o Controller CourseController
const PokeController = require("./controllers/PokeController");
// associa as rotas ao seu método do Controller
routes.get("/Poke", PokeController.index);
routes.post('/Poke',PokeController.store);
routes.get('/Poke/:id',PokeController.show);
routes.put('/Poke/:id',PokeController.update);
routes.delete('/Poke/:id',PokeController.delete);
routes.post('/Poke/CreateRandom', async (req, res) => {
    try {
        await createRandomPokedexEntry();
        res.status(200).json({ message: 'Nova entrada aleatória na Pokedex criada com sucesso!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = routes;

// Importando as dependências do projeto
const express = require('express');
// Referencia ao db.js
const db = require("./db");
const routes = express.Router();
const PokeController = require('./controllers/PokeController');
// associa as rotas ao seu método do db.js
routes.get('/Poke', db.selectPokemons);
routes.post('/Poke', db.insertPokemon);
routes.get('/Poke/:id', db.getPokemon);
routes.put('/Poke/:id', db.updatePokemon);
routes.delete('/Poke/:id', db.deletePokemon);
routes.post('/Poke/CreateRandom', PokeController.create);

module.exports = routes;



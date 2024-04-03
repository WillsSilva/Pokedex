// Importando as dependências do projeto
const express = require("express");
const routes = express.Router();
// Referencia o Controller CourseController
const PokeController = require("./controllers/PokeController");
// associa as rotas ao seu método do Controller
routes.get("/Poke", PokeController.index);
routes.post('/Poke',PokeController.store);
routes.get('/Poke/:id',PokeController.show);
routes.put('/Poke/:id',PokeController.update);
routes.delete('/Poke/:id',PokeController.delete);
module.exports = routes;

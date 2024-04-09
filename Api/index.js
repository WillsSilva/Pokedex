// Importando as dependências do projeto
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const requireDir = require("require-dir");
// Cria uma aplicação Express
const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE','CREATE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

//Permitir enviar dados para a App no formato JSON
app.use(express.json());

//const uri = "<connection string>";
const uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, { dbName: 'db_POKE01', });
//Registra o Model em index.js
requireDir("./models");
// Redireciona o caminho http://localhost:3000/api para o routes
app.use('/api', require('./routes'));
// Inicia o servidor na porta '3000'
app.listen(3001, () => {
    console.log('Servidor está rodando na porta 3001');
  });
  

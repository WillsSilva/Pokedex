// Importando as dependências do projeto
const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");
// Cria uma aplicação Express
const app = express();

//Permitir enviar dados para a App no formato JSON
app.use(express.json());

//const uri = "<connection string>";
const uri = "mongodb://127.0.0.1:27017";
mongoose.connect(uri, { dbName: 'db_POKE', });
//Registra o Model em index.js
requireDir("./models");
// Redireciona o caminho http://localhost:3000/api para o routes
app.use('/api', require('./routes'));
// Inicia o servidor na porta '3000'
app.listen(3000, () => {
    console.log("Exemplo de aplicativo ouvindo a porta 3000");
});

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', require('./routes'));

app.listen(3001, () => {
    console.log("Exemplo de aplicativo ouvindo a porta 3001");
});

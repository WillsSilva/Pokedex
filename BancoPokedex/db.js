const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    database: 'Pokedexdb',
    user: 'root',
    password: '12345678'
});

con.connect((err) => {
    if (err) {
        console.log(err);
        console.log('Erro ao conectar ao banco de dados');
        return;
    }
    console.log('Conexão estabelecida');
});

module.exports = {
    async selectPokemons(req, res) {
        con.query('SELECT * FROM pokedexes', (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao buscar dados' });
            }
            console.log(results);
            res.json(results);
        });
    },

    async insertPokemon(req, res) {
        const { name, species, abilities, hp, attack, defense, speed } = req.body;
        const query = 'INSERT INTO pokedexes (name, species, abilities, hp, attack, defense, speed, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())';
        con.query(query, [name, species, abilities, hp, attack, defense, speed], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao inserir dados' });
            }
            res.status(201).json({ id: results.insertId, ...req.body });
        });
    },

    async updatePokemon(req, res) {
        const { id } = req.params;
        const { name, species, abilities, hp, attack, defense, speed } = req.body;
        const query = 'UPDATE pokedexes SET name = ?, species = ?, abilities = ?, hp = ?, attack = ?, defense = ?, speed = ? WHERE id = ?';
        con.query(query, [name, species, abilities, hp, attack, defense, speed, id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao atualizar dados' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Registro não encontrado' });
            }
            res.json({ id, ...req.body });
        });
    },

    async deletePokemon(req, res) {
        const { id } = req.params;
        const query = 'DELETE FROM pokedexes WHERE id = ?';
        con.query(query, [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao deletar dados' });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Registro não encontrado' });
            }
            res.json({ message: 'Registro deletado com sucesso' });
        });
    },

    async getPokemon(req, res) {
        const { id } = req.params;
        const query = 'SELECT * FROM pokedexes WHERE id = ?';
        con.query(query, [id], (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({ error: 'Erro ao buscar dados' });
            }
            if (results.length === 0) {
                return res.status(404).json({ error: 'Pokémon não encontrado' });
            }
            res.json(results[0]);
        });
    }
};

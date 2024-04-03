const mongoose = require("mongoose");
const Pokedex = mongoose.model("Pokedex");
module.exports = {
    async index(req, res) {
        const pokedexList = await Pokedex.find();
        return res.json(pokedexList);
    },
    // Criar um novo curso
    async store(req, res) {
        try {
            // Cria um novo registro na Pokedex com base nos dados fornecidos no corpo da solicitação
            const pokedexCreate = await Pokedex.create(req.body);
            // Retorna o novo registro criado
            return res.status(201).json(pokedexCreate);
        } catch (error) {
            // Se houver algum erro durante a criação do registro, retorna um erro 500 (erro interno do servidor)
            return res.status(500).json({ error: error.message });
        }
    },
    // Mostrar o detalhe de um curso
    async show(req, res) {
        try {
            const pokedexListId = await Pokedex.findById(req.params.id);
            if (!pokedexListId) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            return res.json(pokedexListId);
        } catch (error) {
            // Se houver algum erro durante a busca, retorna um erro 500 (erro interno do servidor)
            return res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        const PokeUpdate = await Pokedex.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.json(PokeUpdate);
    },
    // Excluir um curso
    async delete(req, res) {
        await Pokedex.findByIdAndDelete(req.params.id);
        // Vamos retornar uma mensagem de sucesso sem conteúdo
        return res.send({ msg: "Registro apagado com sucesso!" });
    },


};

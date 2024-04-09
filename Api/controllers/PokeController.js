const mongoose = require("mongoose");
const Pokedex = mongoose.model("Pokedex");
const { createRandomPokedexEntry } = require("../models/Pokemons");

module.exports = {
    async index(req, res) {
        const pokedexList = await Pokedex.find();
        return res.json(pokedexList);
    },
    async store(req, res) {
        try {
            const pokedexCreate = await Pokedex.create(req.body);
            return res.status(201).json(pokedexCreate);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async show(req, res) {
        try {
            const pokedexListId = await Pokedex.findById(req.params.id);
            if (!pokedexListId) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            return res.json(pokedexListId);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async update(req, res) {
        try {
            const PokeUpdate = await Pokedex.findByIdAndUpdate(req.params.id, req.body, { new: true });
            return res.json(PokeUpdate);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            await Pokedex.findByIdAndDelete(req.params.id);
            return res.send({ msg: "Registro apagado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const PokeUpdate = await createRandomPokedexEntry();
            return res.json(PokeUpdate);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

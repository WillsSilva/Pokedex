// Pokemons.js

const mongoose = require("mongoose");
const faker = require("faker");

const Pokedexchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    species: {
        type: String,
        required: true,
    },
    abilities: {
        type: String,
        required: true,
    },
    hp: {
        type: Number,
        required: true,
    },
    attack: {
        type: Number,
        required: true,
    },
    defense: {
        type: Number,
        required: true,
    },
    speed: {
        type: Number,
        required: true,
    },
});

const Pokedex = mongoose.model("Pokedex", Pokedexchema);

const usedNumbers = new Set();

const namesBySpecies = {
    "Planta": ["bulbasaur", "ivysaur", "venusaur"],
    "Fogo": ["charmander", "charmeleon", "charizard", "chimchar"],
    "Agua": ["squirtle", "wartortle", "blastoise", "piplup"],
    "Normal": ["rattata", "raticate", "pidgey"],
    "Terra": ["diglett", "dugtrio", "torterra"],    
};

const speciesList = ["Planta", "Fogo", "Agua", "Normal"];

const getRandomItem = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};

const getRandomNameBySpecies = (species) => {
    const availableNames = namesBySpecies[species] || [];
    if (availableNames.length === 0) {
        console.warn(`Nenhum nome disponível para a espécie '${species}'.`);
        return null;
    }
    return getRandomItem(availableNames);
};

const generateRandomPokedexData = () => {
    const species = getRandomItem(speciesList);
    const name = getRandomNameBySpecies(species);

    if (!name) {
        return null;
    }

    return {
        name: name,
        species: species,
        abilities: faker.random.word(),
        hp: faker.datatype.number(),
        attack: faker.datatype.number(),
        speed: faker.datatype.number(),
        defense: faker.datatype.number(),
    };
};

const createRandomPokedexEntry = async () => {
    try {
        const randomPokedexData = generateRandomPokedexData();
        const newEntry = await Pokedex.create(randomPokedexData);
        console.log("Novo registro na Pokedex criado:");
        console.log(newEntry);
    } catch (error) {
        console.error("Erro ao criar novo registro na Pokedex:", error);
    }
};

module.exports = {
    createRandomPokedexEntry
};

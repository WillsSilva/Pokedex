const mongoose = require("mongoose");
const faker = require("faker");

const Pokedexchema = new mongoose.Schema({
    number: {
        type: Number,
        unique: true, // Garante que o número seja único
    },
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

// Função para gerar um número único para a Pokedex
const generateUniqueNumber = () => {
    let number;
    do {
        number = faker.datatype.number();
    } while (usedNumbers.has(number)); // Verifica se o número já foi usado
    usedNumbers.add(number); // Adiciona o número ao conjunto de números usados
    return number;
};

// Mapeamento de espécies para nomes disponíveis
const namesBySpecies = {
    "Planta": ["Bulbasaur", "Ivysaur", "Venusaur"],
    "Fogo": ["Charmander", "Charmeleon", "Charizard", "Chimchar"],
    "Agua": ["Squirtle", "Wartortle", "Blastoise", "Piplup"],
    "Normal": ["Rattata", "Raticate", "Pidgey"],
    "Terra": ["Diglett", "Dugtrio", "Torterra"],    
    // Adicione mais espécies e nomes conforme necessário
};

const speciesList = ["Planta", "Fogo", "Agua", "Normal"];

// Função para selecionar aleatoriamente um item de uma lista
const getRandomItem = (list) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};

// Função para selecionar aleatoriamente um nome com base na espécie
const getRandomNameBySpecies = (species) => {
    const availableNames = namesBySpecies[species] || []; // Obtém a lista de nomes para a espécie fornecida
    if (availableNames.length === 0) {
        console.warn(`Nenhum nome disponível para a espécie '${species}'.`);
        return null;
    }
    return getRandomItem(availableNames);
};

// Função para gerar dados aleatórios para a Pokedex
const generateRandomPokedexData = () => {
    const species = getRandomItem(speciesList); // Seleciona uma espécie aleatória
    const name = getRandomNameBySpecies(species); // Seleciona um nome aleatório com base na espécie

    if (!name) {
        // Se não houver nomes disponíveis para a espécie selecionada, retorna null
        return null;
    }

    return {
        number: generateUniqueNumber(),
        name: name,
        species: species,
        abilities: faker.random.word(),
        hp: faker.datatype.number(),
        attack: faker.datatype.number(),
        speed: faker.datatype.number(),
        defense: faker.datatype.number(),
    };
};



// Exemplo de uso: gerar um novo registro na Pokedex com dados aleatórios
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

// // Chamada da função para criar um novo registro aleatório na Pokedex
// createRandomPokedexEntry();

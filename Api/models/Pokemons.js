const mongoose = require("mongoose");
const faker = require("faker");

const Pokedexchema = new mongoose.Schema({
    number: {
        type: Number,
        required: true,
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
        type: int,
        required: true,
    },
    attack: {
        type: int,
        required: true,
    },
    defense: {
        type: int,
        required: true,
    },
    speed: {
        type: int,
        required: true,
    },    
});

const Pokedex = mongoose.model("Pokedex", Pokedexchema);

const usedNumbers = new Set();

// Função para gerar um número único para a Pokedex
const generateUniqueNumber = () => {
    let number;
    do {
        number = faker.random.number();
    } while (usedNumbers.has(number)); // Verifica se o número já foi usado
    usedNumbers.add(number); // Adiciona o número ao conjunto de números usados
    return number;
};

// Função para gerar dados aleatórios para a Pokedex
const generateRandomPokedexData = () => {
    return {
        number: generateUniqueNumber(),
        abilities: faker.random.word(),
        hp: faker.random.int(),
        attack: faker.random.int(),
        speed: faker.random.int(),
        defense: faker.random.int(),
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

// Chamada da função para criar um novo registro aleatório na Pokedex
createRandomPokedexEntry();

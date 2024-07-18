const { Pokedex } = require('../models'); // Certifique-se de que o caminho está correto
const { faker } = require('@faker-js/faker');

const namesBySpecies = {
    "Planta": ["Bulbasaur", "Ivysaur", "Venusaur"],
    "Fogo": ["Charmander", "Charmeleon", "Charizard", "Chimchar"],
    "Agua": ["Squirtle", "Wartortle", "Blastoise", "Piplup", "Psyduck"],
    "Normal": ["Rattata", "Raticate", "Pidgey"],
    "Terra": ["Diglett", "Dugtrio", "Torterra"],
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
        hp: faker.datatype.number({ min: 1, max: 100 }),
        attack: faker.datatype.number({ min: 1, max: 100 }),
        speed: faker.datatype.number({ min: 1, max: 100 }),
        defense: faker.datatype.number({ min: 1, max: 100 }),
    };
};

async function createRandomPokedexEntry() {
    try {
        const randomPokedexData = generateRandomPokedexData();
        if (!randomPokedexData) {
            console.error('Falha ao gerar dados da Pokedex.');
            return;
        }
        const newEntry = await Pokedex.create(randomPokedexData);
        console.log("Novo registro na Pokedex criado:");
        console.log(newEntry);
        return newEntry;
    } catch (error) {
        console.error("Erro ao criar novo registro na Pokedex:", error);
        throw error;
    }
}

module.exports = {
    async index(req, res) {
        const pokedexList = await Pokedex.findAll();
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
            const pokedexListId = await Pokedex.findByPk(req.params.id);
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
            const PokeUpdate = await Pokedex.update(req.body, {
                where: { id: req.params.id },
                returning: true,
                plain: true
            });
            return res.json(PokeUpdate[1]); // PokeUpdate[1] contém os dados atualizados
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async delete(req, res) {
        try {
            const result = await Pokedex.destroy({ where: { id: req.params.id } });
            if (result === 0) {
                return res.status(404).json({ error: "Registro não encontrado" });
            }
            return res.send({ msg: "Registro apagado com sucesso!" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
    async create(req, res) {
        try {
            const newEntry = await createRandomPokedexEntry();
            return res.json(newEntry);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};

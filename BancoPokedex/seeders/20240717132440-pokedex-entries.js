'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const speciesList = ["Planta", "Fogo", "Agua", "Normal"];
    const namesBySpecies = {
      "Planta": ["Bulbasaur", "Ivysaur", "Venusaur"],
      "Fogo": ["Charmander", "Charmeleon", "Charizard", "Chimchar"],
      "Agua": ["Squirtle", "Wartortle", "Blastoise", "Piplup", "Psyduck"],
      "Normal": ["Rattata", "Raticate", "Pidgey"],
      "Terra": ["Diglett", "Dugtrio", "Torterra"],
    };

    const generateRandomPokedexData = () => {
      const species = faker.helpers.arrayElement(speciesList);
      const name = faker.helpers.arrayElement(namesBySpecies[species]);

      return {
        name: name,
        species: species,
        abilities: faker.random.word(),
        hp: faker.datatype.number({ min: 1, max: 100 }),
        attack: faker.datatype.number({ min: 1, max: 100 }),
        defense: faker.datatype.number({ min: 1, max: 100 }),
        speed: faker.datatype.number({ min: 1, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date()
      };
    };

    // Generate 10 random entries
    const entries = [];
    for (let i = 0; i < 10; i++) {
      entries.push(generateRandomPokedexData());
    }

    // Insert data into the 'Pokedex' table
    await queryInterface.bulkInsert('Pokedexes', entries, {});
  },

  down: async (queryInterface, Sequelize) => {
    // Remove seeded data from the 'Pokedex' table
    await queryInterface.bulkDelete('Pokedexes', null, {});
  }
};

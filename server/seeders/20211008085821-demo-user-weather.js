"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_weather", [
      {
        userId: 1,
        weatherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        weatherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        weatherId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        weatherId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        weatherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 4,
        weatherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        weatherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 5,
        weatherId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        weatherId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        weatherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 6,
        weatherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        weatherId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        weatherId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 7,
        weatherId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user_weather", null, {});
  },
};

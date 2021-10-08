"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("weather", [
      {
        weather: "맑음",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weather: "구름",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weather: "비",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        weather: "눈",
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
    return queryInterface.bulkDelete("weather", null, {});
  },
};

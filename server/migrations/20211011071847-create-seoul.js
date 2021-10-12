"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("seoul", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        type: Sequelize.INTEGER,
      },
      nx: {
        type: Sequelize.INTEGER,
      },
      ny: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      value: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("seoul");
  },
};

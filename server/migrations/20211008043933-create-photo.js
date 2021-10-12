"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("photo", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      weather: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      comment: {
        type: Sequelize.STRING,
      },
      filename: {
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
    await queryInterface.dropTable("photo");
  },
};

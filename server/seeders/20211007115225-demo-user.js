module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        email: "kimcoding@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};

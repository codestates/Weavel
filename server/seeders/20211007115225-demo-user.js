module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        name: "김코딩",
        email: "kimcoding@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박해커",
        email: "park@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "이땡땡",
        email: "lee@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "김아무개",
        email: "kim@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "고영희",
        email: "cat@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "까까",
        email: "kkakka@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박소민",
        email: "somin@gmail.com",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "테스트",
        email: "test@gmail.com",
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

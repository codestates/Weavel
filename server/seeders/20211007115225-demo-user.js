module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        name: "김코딩",
        email: "kimcoding@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박해커",
        email: "park@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "이땡땡",
        email: "lee@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "김아무개",
        email: "kim@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "고영희",
        email: "cat@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "까까",
        email: "kkakka@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박소민",
        email: "somin@gmail.com",
        salt: "aaa",
        password: "1234",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "테스트",
        email: "test@gmail.com",
        salt: "aaa",
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

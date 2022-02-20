// npx sequelize-cli db:migrate
// npx sequelize-cli db:seed:all
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user", [
      {
        name: "김코딩",
        email: "kimcoding@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박해커",
        email: "park@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "이땡땡",
        email: "lee@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "김아무개",
        email: "kim@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "고영희",
        email: "cat@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "까까",
        email: "kkakka@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "박소민",
        email: "somin@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "테스트",
        email: "test@gmail.com",
        salt: "9c37a6c50710e23b31eb92b7851b2b5f3648e038d4852bbc822285819fe1d79e2466d734ac96f988ffc381a3f3e1206ff7a9c515739ef64137590a164a09c9b0",
        password:
          "+Us8lWQSD58LAzt8MS+pxmxC9gKCAKx/rJIsaSXHpVZqExp0zgOMMqzYnoCJACfU32GVge6+wuzM0OgbxRCsTg==",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("user", null, {});
  },
};

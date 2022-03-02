const { startServer, stopServer } = require("../../app.js");
const axios = require("axios");
const faker = require("faker");
const { sequelize } = require("../../models/index.js");

describe("user APIs", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await startServer();
    request = await axios.create({
      baseURL: `http://localhost:${server.address().port}`,
      validateStatus: null,
    });
  });

  afterAll(async () => {
    await stopServer(server);
  });

  describe("POST to /user/signup", () => {
    it("returns 201 ", async () => {
      const fakeUser = faker.helpers.userCard();
      const user = {
        name: fakeUser.name,
        email: fakeUser.email,
        password: faker.internet.password(8, true),
        weather: [0, 1],
      };

      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(201);
    });

    it("returns 409 ", async () => {
      const fakeUser = faker.helpers.userCard();
      const user = {
        name: fakeUser.name,
        email: fakeUser.email,
        password: faker.internet.password(8, true),
        weather: [0, 1],
      };

      const resFrist = await request.post("/user/signup", user);
      expect(resFrist.status).toBe(201);

      const resSecond = await request.post("/user/signup", user);
      expect(resSecond.status).toBe(409);
    });
  });
});

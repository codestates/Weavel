const axios = require("axios");
const { startServer, stopServer } = require("../../app.js");
const faker = require("faker");

describe("user APIs", () => {
  let server;
  let request;
  beforeAll(async () => {
    server = await startServer();
    request = axios.create({
      baseURL: `http://localhost:${server.address().port}`,
      validateStatus: null,
    });
  });

  afterAll(async () => {
    await stopServer(server);
  });

  describe("POST to /user/signup", () => {
    it("returns 201 and authrozation token when user details are valid", async () => {
      const fakeUser = faker.helpers.userCard();
      const user = {
        name: fakeUser.name,
        email: fakeUser.email,
        password: faker.internet.password(10, true),
        weather: faker.datatype.array(),
      };

      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(201);
    });
  });
});

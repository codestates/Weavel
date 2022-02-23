const faker = require("faker");
const { userController } = require("../user.js");
const user = require("../user.js");
const httpMocks = require("node-mocks-http");
const { body } = require("express-validator");

describe("signup", () => {
  let UserController;
  let userDB;
  let userWeatherDB;
  beforeEach(() => {
    userDB = {};
    userWeatherDB = {};
    UserController = new userController(userDB, userWeatherDB);
  });

  describe("signup", () => {
    let email, userId, name, password, weather, response;
    beforeEach(() => {
      email = faker.internet.email();
      userId = faker.random.alphaNumeric(16);
      name = faker.internet.userName();
      password = faker.internet.password();
      weather = faker.random.number(1);
      response = httpMocks.createResponse();
    });

    it("이미 존재하는 이메일이 있는 경우 409 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: { email: email },
      });
      userDB.resultUserByEmail = () => email;

      await UserController.signup(request, response);

      expect(response.statusCode).toBe(409);
      expect(response._getJSONData().message).toBe(
        "이미 존재하는 이메일입니다.",
      );
    });

    it("유저 생성", async () => {
      const request = httpMocks.createRequest({
        method: "POST",
        url: "/signup",
        body: {
          name: name,
          email: email,
          password: password,
          weather: weather,
        },
      });
      const response = httpMocks.createResponse();

      // user.createCrypto = jest.fn((password) =>
      //   Promise.resolve([salt, encryptedPassword]),
      // );

      // userDB.createUser = jest.fn((name, email, salt, encryptedPassword) => {
      //   name, email, salt, encryptedPassword;
      // });

      // userWeatherDB.createMapUserWeather = jest.fn(() => userId, weather);

      await UserController.signup(request, response);

      expect(response.statusCode).toBe(201);
      expect(response._getJSONData().message).toBe("회원가입이 완료되었습니다");
      expect(response._getJSONData().date).toBe({
        userId: userId,
        email: email,
        password: password,
        weather: weather,
      });
    });
  });
});

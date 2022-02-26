const faker = require("faker");
const { userController } = require("../user.js");
const user = require("../user.js");
const httpMocks = require("node-mocks-http");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("crypto");

describe("user Controller", () => {
  let UserController;
  let userDB;
  let userWeatherDB;
  beforeEach(() => {
    userDB = {};
    userWeatherDB = {};
    UserController = new userController(userDB, userWeatherDB);
  });

  describe("signup", () => {
    let email,
      userId,
      name,
      password,
      weather,
      salt,
      encryptedPassword,
      response;
    beforeEach(() => {
      email = faker.internet.email();
      userId = faker.random.alphaNumeric(16);
      name = faker.internet.userName();
      password = faker.internet.password();
      weather = faker.datatype.number();
      salt = faker.random.alphaNumeric(16);
      encryptedPassword = faker.random.alphaNumeric(16);
      response = httpMocks.createResponse();
    });

    it("이미 존재하는 이메일이 있는 경우 409 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: { email: email },
      });
      userDB.resultUserByEmail = jest.fn(() => true);

      await UserController.signup(request, response);

      expect(response.statusCode).toBe(409);
      expect(response._getJSONData().message).toBe(
        "이미 존재하는 이메일입니다.",
      );
    });

    it("회원가입을 완료하고 201을 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: {
          name: name,
          email: email,
          password: password,
          weather: weather,
        },
      });
      userDB.resultUserByEmail = jest.fn(() => undefined);
      user.createCrypto = jest.fn(() => [salt, encryptedPassword]);
      userDB.createUser = jest.fn((name, email, salt, encryptedPassword) => ({
        name: name,
        email: email,
        salt: salt,
        password: encryptedPassword,
      }));
      userWeatherDB.createMapUserWeather = jest.fn((userId, weather) => ({
        userId: userId,
        weather: weather,
      }));

      await UserController.signup(request, response);

      expect(response.statusCode).toBe(201);
      expect(response._getJSONData().message).toBe(
        "회원가입이 완료되었습니다.",
      );
    });
  });

  describe("login", () => {
    let email, password;
    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
      response = httpMocks.createResponse();
    });

    it("존재하지 않는 이메일로 로그인을 할 경우 404 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => undefined);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(404);
      expect(response._getJSONData().message).toBe("회원을 찾을수 없습니다.");
    });
  });
});

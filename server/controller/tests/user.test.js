const faker = require("faker");
const { userController } = require("../user.js");
const httpMocks = require("node-mocks-http");

describe("user Controller", () => {
  let UserController;
  let userDB;
  let userWeatherDB;
  let crypto;
  let jwt;
  beforeEach(() => {
    userDB = {};
    userWeatherDB = {};
    crypto = {};
    jwt = {};
    UserController = new userController(userDB, userWeatherDB, crypto, jwt);
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
      weather = faker.datatype.array();
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
      crypto.createCrypto = jest.fn(() => [salt, encryptedPassword]);
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
    let email, password, userId;
    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
      userId = faker.random.alphaNumeric(16);
      response = httpMocks.createResponse();
    });

    it("존재하지 않는 이메일로 로그인을 할 경우 404 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => false);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(404);
      expect(response._getJSONData().message).toBe("회원을 찾을수 없습니다.");
    });

    it("비밀번호가 틀렸을때 403을 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => true);
      crypto.checkUserPassword = jest.fn(() => false);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(403);
      expect(response._getJSONData().message).toBe("비밀번호가 틀렸습니다.");
    });

    it("로그인에 완료", async () => {
      const token = faker.random.alphaNumeric(128);
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => userId);
      crypto.checkUserPassword = jest.fn(() => true);
      jwt.createAccessToken = jest.fn(() => token);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe("로그인에 성공하였습니다.");
      expect(response._getJSONData().data).toMatchObject({
        accessToken: token,
      });
    });
  });

  describe("logout", () => {
    let token;
    beforeEach(() => {
      token = faker.random.alphaNumeric(128);
    });

    it("로그아웃시 200 리턴", async () => {
      const request = httpMocks.createRequest({
        cookies: token,
      });
      const response = httpMocks.createResponse();

      await UserController.logout(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe("로그아웃 되었습니다.");
    });
  });

  describe("get", () => {
    let email, password, userId, name, user_weathers, weather;
    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
      userId = faker.random.alphaNumeric(16);
      name = faker.internet.userName();
      user_weathers = faker.datatype.array(2);
      response = httpMocks.createResponse();
    });

    it("유저가 존재하지 않을 때 404 리턴", async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      userDB.resultUserById = jest.fn(() => false);

      await UserController.get(request, response);

      expect(response.statusCode).toBe(404);
      expect(response._getJSONData().message).toBe(
        "해당 유저를 찾을 수 없습니다.",
      );
    });

    it("유저의 정보와 200 리턴", async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();

      userDB.resultUserById = jest.fn(() => userId);
      userDB.findUserInfo = jest.fn(() => [
        {
          dataValues: {
            id: userId,
            email: email,
            name: name,
            weatherDB: user_weathers,
          },
        },
      ]);
      userWeatherDB.returnMapUserWeather = jest.fn(() => user_weathers);

      await UserController.get(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().data).toMatchObject({
        id: userId,
        email: email,
        name: name,
        weatherDB: user_weathers,
      });
    });
  });
});

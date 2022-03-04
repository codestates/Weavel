const faker = require("faker");
const httpMocks = require("node-mocks-http");
const { userController } = require("../user.js");

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

    it("비밀번호가 틀렸을때 401을 리턴한다.", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => ({ id: userId }));
      crypto.checkUserPassword = jest.fn(() => false);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(401);
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

      userDB.resultUserByEmail = jest.fn(() => ({ id: userId }));
      crypto.checkUserPassword = jest.fn(() => true);
      jwt.createAccessToken = jest.fn(() => token);

      await UserController.login(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe("로그인에 성공하였습니다.");
      expect(response._getJSONData().data).toMatchObject({
        accessToken: token,
        id: userId,
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
    let email, password, userId, name, user_weathers;
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

      userDB.resultUserById = jest.fn(() => false);

      await UserController.get(request, response);

      expect(response.statusCode).toBe(404);
      expect(response._getJSONData().message).toBe(
        "해당 유저를 찾을 수 없습니다.",
      );
    });

    it("유저의 정보와 함께 200 리턴", async () => {
      const request = httpMocks.createRequest();

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

  describe("patch", () => {
    let email, password, weather, salt, encryptedPassword, response;
    beforeEach(() => {
      email = faker.internet.email();
      password = faker.internet.password();
      weather = faker.datatype.array(2);
      salt = faker.random.alphaNumeric(16);
      encryptedPassword = faker.random.alphaNumeric(16);
      response = httpMocks.createResponse();
    });

    it("수정하려는 이메일이 중복일 때 409 리턴", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => email);

      await UserController.patch(request, response);

      expect(response.statusCode).toBe(409);
      expect(response._getJSONData().message).toBe(
        "이미 존재하는 이메일입니다.",
      );
    });

    it("수정하고자 하는 값이 존재한다면 수정하고 200 리턴", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
          password: password,
          weather: weather,
        },
      });
      crypto.createCrypto = jest.fn(() => [salt, encryptedPassword]);
      userDB.putUser = jest.fn();
      userDB.resultUserByEmail = jest.fn(() => false);
      userWeatherDB.deleteUserWeather = jest.fn();
      userWeatherDB.createMapUserWeather = jest.fn();

      await UserController.patch(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe(
        "정보 수정이 완료되었습니다",
      );
    });
  });

  describe("delete", () => {
    let email, userId, response;
    beforeEach(() => {
      email = faker.internet.email();
      userId = faker.random.alphaNumeric(32);
      response = httpMocks.createResponse();
    });

    it("회원탈퇴 완료시 200 리턴", async () => {
      const request = httpMocks.createRequest({
        id: userId,
      });

      userDB.deleteUser = jest.fn();

      await UserController.deleteUser(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe(
        "회원탈퇴가 완료 되었습니다.",
      );
    });
  });

  describe("checkEmail", () => {
    let userId, email, response;
    beforeEach(() => {
      userId = faker.random.alphaNumeric(32);
      email = faker.internet.email();
      response = httpMocks.createResponse();
    });

    it("수정하려는 이메일이 중복일 때 409 리턴", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => email);

      await UserController.checkEmail(request, response);

      expect(response.statusCode).toBe(409);
      expect(response._getJSONData().message).toBe("이메일이 중복됩니다.");
    });

    it("수정하려는 이메일이 중복되지 않으면 200 리턴", async () => {
      const request = httpMocks.createRequest({
        body: {
          email: email,
        },
      });

      userDB.resultUserByEmail = jest.fn(() => false);

      await UserController.checkEmail(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().message).toBe(
        "이메일이 중복되지 않습니다.",
      );
    });
  });

  describe("weatherCount", () => {
    let weatherCount, response;
    beforeEach(() => {
      weatherCount = faker.datatype.number();
      response = httpMocks.createResponse();
    });

    it("모든 회원의 좋아하는 날씨 데이터 200과 리턴", async () => {
      const request = httpMocks.createRequest();

      userWeatherDB.likeWeatherCount = jest.fn(() => ({
        0: weatherCount,
      }));

      await UserController.weatherCount(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData().data).toMatchObject({ 0: weatherCount });
    });
  });
});

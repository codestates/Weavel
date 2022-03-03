const { startServer, stopServer } = require("../../app.js");
const axios = require("axios");
const faker = require("faker");
const { createNewUserAccount, makeValidUserDetails } = require("./userObject");
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
      const user = makeValidUserDetails();
      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(201);
    });

    it("returns 409 ", async () => {
      const user = makeValidUserDetails();

      const resFrist = await request.post("/user/signup", user);
      expect(resFrist.status).toBe(201);

      const resSecond = await request.post("/user/signup", user);
      expect(resSecond.status).toBe(409);
    });

    test.each([
      { missingFieldName: "name", expectedMessage: "이름을 입력해 주세요" },
      {
        missingFieldName: "email",
        expectedMessage: "이메일을 입력해주세요",
      },
      {
        missingFieldName: "password",
        expectedMessage: "비밀번호를 입력해주세요",
      },
      {
        missingFieldName: "weather",
        expectedMessage: "배열에 날씨코드를 입력해주세요",
      },
    ])(
      `returns 400 유효성 검사 $missingFieldName 내용이 없을 때`,
      async ({ missingFieldName, expectedMessage }) => {
        const user = makeValidUserDetails();

        delete user[missingFieldName];
        const res = await request.post("/user/signup", user);

        expect(res.status).toBe(400);
        expect(res.data.message).toBe(expectedMessage);
      },
    );

    it("returns 400 이름이 2자리 미만으로 짧을 때", async () => {
      const user = {
        ...makeValidUserDetails(),
        name: "인",
      };

      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(400);
      expect(res.data.message).toBe("이름을 두글자 이상 입력해주세요");
    });

    it("returns 400 패스워드가 8~16자리가 아닐 때", async () => {
      const user = {
        ...makeValidUserDetails(),
        password: "123",
      };

      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(400);
      expect(res.data.message).toBe("8~16자리 비밀번호를 입력해주세요");
    });
  });

  describe("POST to /user/login", () => {
    it("returns 201 ", async () => {
      const user = await createNewUserAccount(request);

      const res = await request.post("/user/login", {
        email: user.email,
        password: user.password,
      });

      expect(res.status).toBe(200);
    });

    test.each([
      {
        missingFieldName: "email",
        expectedMessage: "이메일을 입력해주세요",
      },
      {
        missingFieldName: "password",
        expectedMessage: "비밀번호를 입력해주세요",
      },
    ])(
      `returns 400 when $missingFieldName filed is missing`,
      async ({ missingFieldName, expectedMessage }) => {
        const fakeUser = faker.helpers.userCard();
        const user = {
          email: fakeUser.email,
          password: faker.internet.password(8, true),
        };

        delete user[missingFieldName];
        const res = await request.post("/user/login", user);

        expect(res.status).toBe(400);
        expect(res.data.message).toBe(expectedMessage);
      },
    );
  });
});

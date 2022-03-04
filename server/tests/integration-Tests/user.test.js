const { startServer, stopServer } = require("../../app.js");
const axios = require("axios");
const faker = require("faker");
const {
  createNewUserLogin,
  createNewUser,
  makeValidUserDetails,
} = require("./userObject");

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
    it("returns 201 accessToken 로그인에 성공할 때", async () => {
      const user = await createNewUser(request);

      const res = await request.post("/user/login", {
        email: user.email,
        password: user.password,
      });

      expect(res.status).toBe(200);
      expect(res.data.data.accessToken.length).toBeGreaterThan(0);
    });

    it("returns 404 해당하는 유저가 없는 email을 입력했을 때", async () => {
      const user = await createNewUser(request);
      const wrongEamil = "321" + user.email;

      const res = await request.post("/user/login", {
        email: wrongEamil,
        password: user.password,
      });

      expect(res.status).toBe(404);
      expect(res.data.message).toMatch("회원을 찾을수 없습니다.");
    });

    it("returns 401 올바른 비밀번호를 입력하지 않았을 때", async () => {
      const user = await createNewUser(request);
      const wrongPassword = user.password.toUpperCase();

      const res = await request.post("/user/login", {
        email: user.email,
        password: wrongPassword,
      });

      expect(res.status).toBe(401);
      expect(res.data.message).toMatch("비밀번호가 틀렸습니다.");
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
      `returns 400 $missingFieldName 내용이 없을 때`,
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

    it("returns 400 email을 입력하지 않았을 때", async () => {
      const user = {
        ...makeValidUserDetails(),
        email: "123",
      };

      const res = await request.post("/user/signup", user);

      expect(res.status).toBe(400);
      expect(res.data.message).toBe("이메일을 입력해주세요");
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

  describe("Get to /user", () => {
    it("returns 201 유저데이터 불러오기", async () => {
      const user = await createNewUserLogin(request);

      const res = await request.get("/user", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      expect(res.status).toBe(200);
      expect(res.data.data).toMatchObject({
        id: res.data.data.id,
        email: user.email,
        name: user.name,
        weatherDB: user.weather,
      });
    });
  });

  describe("Patch to /user", () => {
    it("returns 200 유저데이터 email, password, weather 수정하기", async () => {
      const user = await createNewUserLogin(request);

      const res = await request.patch(
        "/user",
        {
          email: faker.internet.email(),
          password: faker.internet.password(),
          weather: [2, 3],
        },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        },
      );

      expect(res.status).toBe(200);
      expect(res.data.message).toBe("정보 수정이 완료되었습니다");
    });
  });

  describe("delete to /user", () => {
    it("returns 200 회원탈퇴", async () => {
      const user = await createNewUserLogin(request);

      const res = await request.delete("/user", {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });

      expect(res.status).toBe(200);
      expect(res.data.message).toBe("회원탈퇴가 완료 되었습니다.");
    });
  });

  describe("get to /user/email", () => {
    it("returns 409 이메일 중복시", async () => {
      const user = await createNewUser(request);

      const res = await request.get("/user/email", {
        params: { email: user.email },
      });

      expect(res.status).toBe(409);
      expect(res.data.message).toBe("이메일이 중복됩니다.");
    });

    it("returns 200 이메일 중복아닐시", async () => {
      const user = await createNewUser(request);

      const res = await request.get("/user/email", {
        params: { email: "123" + user.email },
      });

      expect(res.status).toBe(200);
      expect(res.data.message).toBe("이메일이 중복되지 않습니다.");
    });
  });

  describe("get to /user/weather", () => {
    it("returns 200 선호하는 날씨 데이터 출력", async () => {
      const res = await request.get("/user/weather");

      expect(res.status).toBe(200);
      expect(res.data.data).toMatchObject({
        0: expect.any(Number),
        1: expect.any(Number),
        2: expect.any(Number),
        3: expect.any(Number),
      });
    });
  });
});

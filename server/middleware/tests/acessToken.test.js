const httpsMocks = require("node-mocks-http");
const { accessToken } = require("../accessToken");
// const faker = require("faker");
// jest.mock("jsonwebtoken");
// jest.mock("../../models/user.js");

describe("Token Middleware", () => {
  it("토큰이 없을 경우 statusCode 401을 리턴한다.", () => {
    const request = httpsMocks.createRequest({
      method: "GET",
      url: "/user",
    });
    const response = httpsMocks.createResponse();
    const next = jest.fn();

    accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 존재하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });

  it("토큰이 유효하지 않을 경우 401을 리턴한다.", () => {
    const request = httpsMocks.createRequest({
      method: "GET",
      url: "/user",
      headers: { authorization: "Basic" },
    });
    const response = httpsMocks.createResponse();
    const next = jest.fn();

    accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 유효하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });
});

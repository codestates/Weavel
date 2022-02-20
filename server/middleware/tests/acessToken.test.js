const httpMocks = require("node-mocks-http");
const accessToken = require("../accessToken.js");
const userDB = require("../../data/user");
const faker = require("faker");
const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken");
jest.mock("../../models");

describe("Token Middleware", () => {
  it("토큰이 없을 경우 statusCode 401을 리턴한다.", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/user",
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await accessToken.accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 존재하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });

  it("토큰을 찾을 수 없는경우 statusCode 401을 리턴한다.", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/user",
      headers: { authorization: "basic" },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await accessToken.accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 존재하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });

  it("토큰이 유효하지 않을 경우 401을 리턴한다.", async () => {
    const token = faker.random.alphaNumeric(128);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/user",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error("bad token"), undefined);
    });

    await accessToken.accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 유효하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });

  it("유저를 찾을 수 없을 때 401 리턴", async () => {
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/user",
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id: userId });
    });

    userDB.findUserById = jest.fn((id) => Promise.resolve(undefined));

    await accessToken.accessToken(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._getJSONData().message).toBe(
      "access token 일치하는 유저가 존재하지 않습니다.",
    );
    expect(next).not.toBeCalled();
  });
});

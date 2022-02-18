const httpMocks = require("node-mocks-http");
const faker = require("faker");
const { validateError } = require("../vaildator.js");
const validator = require("express-validator");

jest.mock("express-validator");

describe("Validator Middleware", () => {
  it(`validator 통과시 next`, () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    validator.validationResult = jest.fn(() => ({
      isEmpty: () => true,
    }));

    validateError(request, response, next);

    expect(next).toBeCalled();
  });

  it(`validator 실패시 에러`, () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const errorMsg = faker.random.words(3);

    validator.validationResult = jest.fn(() => ({
      isEmpty: () => false,
      array: () => [{ msg: errorMsg }],
    }));

    validateError(request, response, next);

    expect(next).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response._getJSONData().message).toMatch(errorMsg);
  });
});

const httpMocks = require("node-mocks-http");
const faker = require("faker");
const multer = require("../multer.js");
const { upload } = require("../multer.js");

jest.mock("multer");

describe("Validator Middleware", () => {
  it(`validator 통과시 next`, () => {
    const imageFile = faker.image;
    const response = httpMocks.createRequest();
    const request = httpMocks.createRequest({
      method: "POST",
      url: "/photo",
      body: { image: imageFile },
    });
    const next = jest.fn();

    multer.diskStorage = jest.fn(() => ({
      destination: (request, file, cb) => cb(null, "uploads/"),
      filename: function (req, file, cb) {
        cb(null, "(" + new Date().toLocaleString() + ")" + file.originalname);
      },
      fileFilter: (req, file, cb) => {
        cb(null, true);
      },
    }));

    upload;

    expect(next).not.toBeCalled();
    // expect(request).toMatchObject(file.path);
    // expect(request).toMatchObject(file.originalname);
  });
});

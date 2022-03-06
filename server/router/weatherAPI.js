const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/vaildator");
const { cityarea } = require("../middleware/cityarea");

function weatherAPIRouter(weatherApiController) {
  router.get(
    "/",
    [
      query("id")
        .trim()
        .notEmpty()
        .withMessage("query(id)에 cityCode를 입력해주세요.")
        .isInt()
        .withMessage("query(id)에 cityCode를 번호를 입력해주세요"),
      validateError,
    ],
    cityarea,
    weatherApiController.weatherData,
  );

  router.get(
    "/recovery",
    [
      query("id")
        .trim()
        .notEmpty()
        .withMessage("query(id)에 cityCode를 입력해주세요.")
        .isInt()
        .withMessage("query(id)에 cityCode를 번호를 입력해주세요"),
      validateError,
    ],
    cityarea,
    weatherApiController.recoverData,
  );

  return router;
}
module.exports = weatherAPIRouter;

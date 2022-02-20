const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/vaildator");
const { weatherAPIController } = require("../controller");
const { cityarea } = require("../middleware/cityarea");

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
  weatherAPIController.weather_data.weatherData,
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
  weatherAPIController.recovery_data.recoverData,
);

module.exports = router;

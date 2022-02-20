const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/vaildator");
const { weatherController } = require("../controller");

// city
router.get(
  "/city",
  [
    query("city")
      .trim()
      .notEmpty()
      .withMessage("query에 cityCode를 입력해주세요.")
      .isInt()
      .withMessage("query에 cityCode를 번호를 입력해주세요"),
    query("day")
      .trim()
      .notEmpty()
      .withMessage("query에 dayCode를 입력해주세요.")
      .isInt()
      .withMessage("query에 dayCode를 번호를 입력해주세요"),
    query("time")
      .trim()
      .notEmpty()
      .withMessage("query에 시간을 입력해주세요.")
      .isInt()
      .withMessage("query에 4자리 숫자 시간을 입력해주세요"),
    query("weather")
      .trim()
      .notEmpty()
      .withMessage("query에 weatherCode 입력해주세요.")
      .isInt()
      .withMessage("query에 weatherCode 번호를 입력해주세요"),
    validateError,
  ],
  weatherController.city.cityWeather,
);

// area
router.get(
  "/area",
  [
    query("nx")
      .trim()
      .notEmpty()
      .withMessage("query에 nx좌표 Code를 입력해주세요.")
      .isInt()
      .withMessage("query에 nx좌표 Code번호를 입력해주세요"),
    query("ny")
      .trim()
      .notEmpty()
      .withMessage("query에 nx좌표 Code를 입력해주세요.")
      .isInt()
      .withMessage("query에 nx좌표 Code번호를 입력해주세요"),
    validateError,
  ],
  weatherController.area.areaWeather,
);

module.exports = router;

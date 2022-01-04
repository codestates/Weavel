const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const { accessToken } = require("../middleware/accessToken");
const { usersController } = require("../controller");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ message: errors.array()[0].msg });
};

// 회원가입 POST /user/signup
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("이름을 두글자 이상 입력해주세요"),
    body("email").isEmail().withMessage("이메일을 입력해주세요"),
    body("password").notEmpty().withMessage("비밀번호를 입력해주세요"),
    body("weather").notEmpty().withMessage("날씨를 입력해주세요"),
    validate,
  ],
  usersController.signup,
);

// 로그인 POST /user/login
router.post("/login", usersController.login);

// 로그아웃 POST /user
router.post("/logout", usersController.logout);

// 회원탈퇴 DELETE /user
router.delete("/", accessToken, usersController.delete);

// 유저정보수정 PUT /user
router.put("/", accessToken, usersController.put);

// 이메일중복검사 GET /user/email?={email}
router.get("/email", usersController.email);

// 유저정보요청 GET /user
router.get("/", accessToken, usersController.get);

// 날씨정보요청 GET /user/weather
router.get("/weather", accessToken, usersController.weather);

module.exports = router;

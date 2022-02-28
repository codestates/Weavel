const express = require("express");
const router = express.Router();
const { body, header, query } = require("express-validator");
const { validateError } = require("../middleware/vaildator");
const { accessToken } = require("../middleware/accessToken");

function userRouter(userController) {
  // 회원가입 POST /user/signup
  router.post(
    "/signup",
    [
      body("name")
        .trim()
        .isLength({ min: 2 })
        .withMessage("이름을 두글자 이상 입력해주세요"),
      body("email").isEmail().withMessage("이메일을 입력해주세요"),
      body("password")
        .notEmpty()
        .withMessage("비밀번호를 입력해주세요")
        .isLength({ min: 8, max: 16 })
        .withMessage("8~16자리 비밀번호를 입력해주세요"),
      body("weather").isArray().withMessage("배열에 날씨코드를 입력해주세요"),
      validateError,
    ],
    userController.signup,
  );

  // 로그인 POST /user/login
  router.post(
    "/login",
    [
      body("email").isEmail().withMessage("이메일을 입력해주세요"),
      body("password")
        .notEmpty()
        .withMessage("비밀번호를 입력해주세요")
        .isLength({ min: 8, max: 16 })
        .withMessage("8~16자리 비밀번호를 입력해주세요"),
      validateError,
    ],
    userController.login,
  );

  // 로그아웃 POST /user
  router.post(
    "/logout",
    [
      header("Authorization")
        .trim()
        .notEmpty()
        .withMessage("이미 로그아웃 되었습니다."),
    ],
    userController.logout,
  );

  // 회원탈퇴 DELETE /user
  router.delete("/", accessToken, userController.deleteUser);

  // 유저정보수정 PATCH /user
  router.patch("/", accessToken, userController.patch);

  // 이메일중복검사 GET /user/email?={email}
  router.get(
    "/email",
    [
      query("email").isEmail().withMessage("이메일을 입력해주세요"),
      validateError,
    ],
    userController.checkEmail,
  );

  // 유저정보요청 GET /user
  router.get("/", accessToken, userController.get);

  // 날씨정보요청 GET /user/weather
  router.get("/weather", userController.weatherCount);

  return router;
}

module.exports = userRouter;

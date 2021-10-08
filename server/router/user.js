var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { usersController } = require("../controller");

// 회원가입 POST /user/signup
router.post("/signup", usersController.signup);

// 로그인 POST /user/login
router.post("/login", usersController.login);

// 로그아웃 POST /user
router.post("/logout", usersController.logout);

// 회원탈퇴 DELETE /user
router.delete("/", accessToken, usersController.delete);

// 유저정보수정 PUT /user
router.put("/", accessToken, usersController.put);

// 이메일중복검사 GET /user/email?={email}
router.get("/", usersController.email);

// 유저정보요청 GET /user
router.get("/", accessToken, usersController.get);

module.exports = router;

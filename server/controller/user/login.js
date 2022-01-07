const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({
      where: { email: email },
    });

    function userConfirm() {
      if (!findUser) {
        return res.status(404).json({ message: "회원을 찾을수 없습니다." });
      }
    }

    function passwordConfirm() {
      const dbPassword = findUser.password;
      const salt = findUser.salt;

      const hashedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, "sha512")
        .toString("base64");

      if (hashedPassword !== dbPassword) {
        return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
      }
    }

    function createAccessToken() {
      const payload = {
        id: findUser.id,
        email: findUser.email,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      });

      return accessToken;
    }

    userConfirm();
    passwordConfirm();

    return res.status(200).json({
      data: { accessToken: createAccessToken(), id: findUser.id },
      message: "로그인에 성공하였습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

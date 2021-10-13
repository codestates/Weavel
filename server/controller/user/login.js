const { user } = require("../../models");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await user.findOne({
      where: { email: email },
    });

    // 이메일이 없을 때
    if (!findUser) {
      return res.status(404).json({ message: "회원을 찾을수 없습니다." });
    }

    const dbPassword = findUser.password;
    const salt = findUser.salt;

    const hashedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, "sha512").toString("base64");

    if (hashedPassword !== dbPassword) {
      return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
    } else {
      const payload = {
        id: findUser.id,
        email: findUser.email,
        createdAt: findUser.createdAt,
        updatedAt: findUser.updatedAt,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({ data: { accessToken }, message: "로그인에 성공하였습니다." });
    }
  } catch (err) {
    console.log(err);
  }
};

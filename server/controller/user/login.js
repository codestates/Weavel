const userDB = require("../../data/user");
const userWeatherDB = require("../../data/user_weather");
const signup = require("./signup");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function checkUserPassword(user, password) {
  const dbPassword = user.password;
  const salt = user.salt;
  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, 9999, 64, "sha512")
    .toString("base64");

  return hashedPassword === dbPassword ? true : false;
}

function createAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await signup.resultUserbyEmail(email);

    if (!user) {
      return res.status(404).json({ message: "회원을 찾을수 없습니다." });
    }

    const resultCheckPassword = checkUserPassword(user, password);
    if (!resultCheckPassword) {
      return res.status(403).json({ message: "비밀번호가 틀렸습니다." });
    }

    const accessToken = createAccessToken(user);

    return res.status(200).json({
      data: { accessToken: accessToken, id: user.id },
      message: "로그인에 성공하였습니다.",
    });
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  login,
};

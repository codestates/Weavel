const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { name, email, password, weather } = req.body;
    const findUser = await user.findOne({ where: { email: email } });
    const salt = crypto.randomBytes(64).toString("hex");
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 9999, 64, "sha512")
      .toString("base64");

    if (findUser) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    } else {
      // user 생성
      const newUser = await user.create({
        name,
        email,
        salt,
        password: encryptedPassword,
      });

      // email로 생성한 유저 조회
      const userId = newUser.id;

      const createRelation = async (userId, weatherId) => {
        return await user_weather.create({ userId, weatherId });
      };

      const proWeather = weather.map((weatherCode) =>
        createRelation(userId, weatherCode + 1),
      );
      Promise.all(proWeather);

      const result = { userId, name, email, weather };

      return res
        .status(201)
        .json({ date: result, message: "회원가입이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { name, email, password, weather } = req.body;
    const overlapEmail = await user.findOne({ where: { email: email } });
    const salt = crypto.randomBytes(64).toString("hex");
    const encryptedPassword = crypto
      .pbkdf2Sync(password, salt, 9999, 64, "sha512")
      .toString("base64");

    if (overlapEmail) {
      return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
    } else {
      const createUser = await user.create({
        name,
        email,
        salt,
        password: encryptedPassword,
      });
      const createUserId = createUser.id;
      const result = { createUserId, name, email, weather };

      function createWeatherRelation() {
        async function createRelationDB(userId, weatherId) {
          return await user_weather.create({ userId, weatherId });
        }

        const afewCreateWeather = weather.map((weatherCode) =>
          createRelationDB(createUserId, weatherCode + 1),
        );
        Promise.all(afewCreateWeather);
      }

      createWeatherRelation();

      return res
        .status(201)
        .json({ date: result, message: "회원가입이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { name, email, password, weather } = req.body;

    async function emailConfirmation(email) {
      const emailSearch = await user.findOne({ where: { email: email } });
      if (emailSearch) {
        return res.status(409).json({ message: `이미 존재하는 이메일입니다.` });
      }
    }

    async function createRelationDB(userId, weatherId) {
      return await user_weather.create({ userId, weatherId });
    }

    function createWeatherRelation(createUserId) {
      const afewCreateWeather = weather.map((weatherCode) =>
        createRelationDB(createUserId, weatherCode + 1),
      );
      Promise.all(afewCreateWeather);
    }

    async function createUser(name, email, password, weather) {
      const salt = crypto.randomBytes(64).toString("hex");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, "sha512")
        .toString("base64");

      const createUserDB = await user.create({
        name,
        email,
        salt,
        password: encryptedPassword,
      });
      const createUserId = createUserDB.id;
      const result = { createUserId, name, email, weather };

      createWeatherRelation(createUserId);

      return res
        .status(201)
        .json({ date: result, message: "회원가입이 완료되었습니다" });
    }

    emailConfirmation(email);
    createUser(name, email, password, weather);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

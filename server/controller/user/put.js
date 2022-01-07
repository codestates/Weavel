const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const { email, password, weather } = req.body;
    const findUser = await user.findOne({ where: { email: email } });
    const userId = findUser.id;

    function headerError() {
      const header = req.headers;
      if (!header) {
        return res.status(403).json({ message: "잘못된 요청입니다." });
      }
    }

    async function deleteWeatherRelation() {
      return await user_weather.destroy({ where: { userId: userId } });
    }

    async function createRelationDB(userId, weatherId) {
      return await user_weather.create({ userId, weatherId });
    }

    async function putWeatherRelation() {
      deleteWeatherRelation();

      const afewCreateWeather = weather.map((weatherCode) =>
        createRelationDB(userId, weatherCode + 1),
      );
      Promise.all(afewCreateWeather);
    }

    async function putpasswordUser() {
      const salt = crypto.randomBytes(64).toString("hex");
      const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 9999, 64, "sha512")
        .toString("base64");

      await user.update(
        {
          salt: salt,
          password: encryptedPassword,
        },
        { where: { id: userId } },
      );

      return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    }

    headerError();
    putWeatherRelation();
    putpasswordUser();
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

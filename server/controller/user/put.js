const { user } = require("../../models");
const { user_weather } = require("../../models");
const crypto = require("crypto");

module.exports = async (req, res) => {
  try {
    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const { email, password, weather } = req.body;
      const findUser = await user.findOne({ where: { email: email } });
      const userId = findUser.id;

      await user_weather.destroy({ where: { userId: userId } });
      const createRelation = async (userId, weatherId) => {
        return await user_weather.create({ userId, weatherId });
      };

      const proWeather = weather.map((weatherCode) => createRelation(userId, weatherCode + 1));
      Promise.all(proWeather);

      // 비밀번호 변경
      const salt = crypto.randomBytes(64).toString("hex");
      const encryptedPassword = crypto.pbkdf2Sync(password, salt, 9999, 64, "sha512").toString("base64");

      await user.update(
        {
          salt: salt,
          password: encryptedPassword,
        },
        { where: { id: userId } },
      );

      return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
    }
  } catch (err) {
    console.log(err);
  }
};

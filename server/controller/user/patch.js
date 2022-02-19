const userDB = require("../../data/user");
const userWeatherDB = require("../../data/user_weather");
const signup = require("./signup");
const crypto = require("crypto");

async function patch(req, res) {
  try {
    const userId = req.userId;
    const { email, password, weather } = req.body;

    if (password) {
      const [salt, encryptedPassword] = signup.createCrypto(password);
      userDB.putUser(email, userId, salt, encryptedPassword);
    }

    if (email) {
      userDB.putUser(email, userId);
    }

    if (weather) {
      userWeatherDB.deleteUserWeather(userId);
      signup.createMapUserWeather(userId, weather);
    }

    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  patch,
};

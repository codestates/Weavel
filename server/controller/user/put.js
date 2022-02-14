const userDB = require("../../data/user");
const userWeatherDB = require("../../data/user_weather");
const signup = require("./signup");
const crypto = require("crypto");

async function put(req, res) {
  try {
    const { email, password, weather } = req.body;
    const findUser = await userDB.findUserByEmail(email);
    const userId = findUser.id;

    userWeatherDB.deleteUserWeather(userId);
    signup.createMapUserWeather(userId, weather);

    const [salt, encryptedPassword] = signup.createCrypto(password);
    userDB.putUser(userId, salt, encryptedPassword);

    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
}

module.exports = { put };

const userDB = require("../../data/user");
const userWeatherDB = require("../../data/user_weather");
const checkEmail = require("./checkEmail");
const crypto = require("crypto");

async function put(req, res) {
  try {
    const { email, password, weather } = req.body;
    const findUser = await checkEmail.resultUserByEmail(email);

    if (!findUser) {
      return res
        .status(409)
        .json({ message: `수정하고자 하는 유저가 존재하지않습니다.` });
    }

    const userId = findUser.id;
    userWeatherDB.deleteUserWeather(userId);
    checkEmail.createMapUserWeather(userId, weather);

    const [salt, encryptedPassword] = checkEmail.createCrypto(password);
    userDB.putUser(userId, salt, encryptedPassword);

    return res.status(200).json({ message: "정보 수정이 완료되었습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  put,
};

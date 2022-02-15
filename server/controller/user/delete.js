const userDB = require("../../data/user");
const userWeatherDB = require("../../data/user_weather");

async function deleteUser(req, res) {
  try {
    const userId = req.userId;

    userWeatherDB.deleteUserWeather(userId);
    userDB.deleteUser(userId);

    return res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  deleteUser,
};

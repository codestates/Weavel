const userWeatherDB = require("../../data/user_weather");

async function weather(req, res) {
  try {
    const weatherCountData = await userWeatherDB.likeWeatherCount();

    return res.status(200).json({ data: weatherCountData });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  weather,
};

const weatherDataDB = require("../../data/weather_data");
const weatherData = require("./weather_data");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

function countCheckWeatherData(count, nx, ny, cityId, URL) {
  if (count !== 365) {
    if (count !== 0) weatherDataDB.deleteAreaWeatherData(nx, ny);
    weatherData.downloadWeatherDataAPI(URL, cityId);
  }
}

async function checkWeatherData(nx, ny, cityId, URL) {
  let count = new Promise((resolve, reject) => {
    resolve(weatherDataDB.countAreaWeatherData(cityId, nx, ny));
  });

  count
    .then((value) => {
      console.log("countdata=>>>>>", value);
      countCheckWeatherData(value, nx, ny, cityId, URL);
    })
    .catch((error) => {
      console.log(error);
    });
}

async function recoverData(req, res) {
  try {
    const cityId = req.query.id;
    const areaArray = req.body;
    const day = moment(new Date().getTime()).add("-1", "d").format("YYYYMMDD");
    const base_time = "2300";

    await Promise.all(
      areaArray.map(async (area) => {
        const nx = area[0];
        const ny = area[1];
        const URL = weatherData.weatherDataURL(nx, ny, day, base_time);
        checkWeatherData(nx, ny, cityId, URL);
      }),
    );

    return res
      .status(201)
      .json({ message: "해당 city의 비어있는 날씨 데이터를 받아왔습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  recoverData,
};

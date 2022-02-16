const weatherDataDB = require("../../data/weather_data");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

async function areaWeather(req, res) {
  try {
    const nxCoordinate = req.query.nx;
    const nyCoordinate = req.query.ny;

    // POP 강수확률, REH 습도, TMP 1시간 기온
    const findAllTimeWeatherData = await weatherDataDB.filterTmpPopReh(
      nxCoordinate,
      nyCoordinate,
    );
    if (findAllTimeWeatherData.length === 0) {
      return res.status(404).json({ message: "조회된 데이터가 없습니다." });
    }

    const resultWeather = findAllTimeWeatherData.filter((data) => {
      const result = [];
      result.push(data.date);
      result.push(data.time);
      result.push(data.category);
      result.push(data.value);
      return result;
    });

    return res.status(200).json(resultWeather);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  areaWeather,
};

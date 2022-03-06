const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

class weatherApiController {
  constructor(weatherDB) {
    this.weather = weatherDB;
  }

  weatherData = async (req, res) => {
    const cityId = req.query.id;
    const areaArray = req.body;
    const day = moment(new Date().getTime()).add("-1", "d").format("YYYYMMDD");
    const base_time = "2300";
    this.weather.deleteCityWeatherData(cityId);

    await Promise.all(
      areaArray.map((area) => {
        const nx = area[0];
        const ny = area[1];
        let URL = weatherDataURL(nx, ny, day, base_time);
        this.weather.downloadWeatherDataAPI(URL, cityId);
      }),
    );

    return res
      .status(201)
      .json({ message: "해당 city의 모든 날씨를 받아왔습니다" });
  };

  recoverData = async (req, res) => {
    const cityId = req.query.id;
    const areaArray = req.body;
    const day = moment(new Date().getTime()).add("-1", "d").format("YYYYMMDD");
    const base_time = "2300";

    await Promise.all(
      areaArray.map(async (area) => {
        const nx = area[0];
        const ny = area[1];
        const URL = weatherDataURL(nx, ny, day, base_time);
        this.weather.checkWeatherData(nx, ny, cityId, URL);
      }),
    );

    return res
      .status(201)
      .json({ message: "해당 city의 비어있는 날씨 데이터를 받아왔습니다." });
  };
}

function weatherDataURL(x, y, day, base_time) {
  const url =
    "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
  const key = process.env.API_KEY;
  const nx = x;
  const ny = y;
  const dataType = "XML";
  const allURL =
    url +
    "?serviceKey=" +
    key +
    "&pageNo=1&numOfRows=10000" +
    "&dataType=" +
    dataType +
    "&base_date=" +
    day +
    "&base_time=" +
    base_time +
    "&nx=" +
    nx +
    "&ny=" +
    ny;
  console.log(allURL);

  return allURL;
}

module.exports = {
  weatherApiController,
};

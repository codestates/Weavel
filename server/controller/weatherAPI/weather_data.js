const weatherDataDB = require("../../data/weather_data");
const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

function sleepTime(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
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

async function saveWeatherData(
  nxFindXML,
  nyFindXML,
  cityId,
  dateFindXML,
  timeFindXML,
  categoryFindXML,
  valueFindXML,
) {
  // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
  if (
    categoryFindXML === "POP" ||
    categoryFindXML === "PTY" ||
    categoryFindXML === "REH" ||
    categoryFindXML === "SKY" ||
    categoryFindXML === "TMP"
  ) {
    weatherDataDB.createCityWeatherData(
      nxFindXML,
      nyFindXML,
      cityId,
      dateFindXML,
      timeFindXML,
      categoryFindXML,
      valueFindXML,
    );
  }
}

function downloadWeatherDataAPI(URL, cityId) {
  request(URL, async (err, res, body) => {
    $ = cheerio.load(body);
    $("item").each(function (idx) {
      const nxFindXML = $(this).find("nx").text();
      const nyFindXML = $(this).find("ny").text();
      const dateFindXML = $(this).find("fcstDate").text();
      const timeFindXML = $(this).find("fcstTime").text();
      const categoryFindXML = $(this).find("category").text();
      const valueFindXML = $(this).find("fcstValue").text();

      saveWeatherData(
        nxFindXML,
        nyFindXML,
        cityId,
        dateFindXML,
        timeFindXML,
        categoryFindXML,
        valueFindXML,
      );
    });
  });
  sleepTime(1000);
}

async function weatherData(req, res) {
  try {
    const cityId = req.query.id;
    const areaArray = req.body;
    const day = moment(new Date().getTime()).format("YYYYMMDD");
    const base_time = "2300";
    weatherDataDB.deleteCityWeatherData(cityId);

    await Promise.all(
      areaArray.map((area) => {
        const nx = area[0];
        const ny = area[1];
        let URL = weatherDataURL(nx, ny, day, base_time);
        downloadWeatherDataAPI(URL, cityId);
      }),
    );

    return res
      .status(201)
      .json({ message: "해당 city의 모든 날씨를 받아왔습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  weatherDataURL,
  downloadWeatherDataAPI,
  weatherData,
};

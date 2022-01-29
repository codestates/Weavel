const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const dotenv = require("dotenv");
const { weather_data } = require("../../models");

module.exports = async (req, res) => {
  try {
    const cityId = req.query.id;
    const areaArray = req.body;

    function sleepTime(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }

    function deleteOldWeatherData(cityId) {
      const findOldWeatherData = weather_data.findAll({
        where: { city: cityId },
      });
      if (findOldWeatherData) {
        weather_data.destroy({ where: { city: cityId } });
      }
    }

    function weatherDataURL(area) {
      const url =
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
      const key = process.env.API_KEY;
      const day = moment(new Date().getTime())
        .add("-1", "d")
        .format("YYYYMMDD");
      const base_time = "2300";
      console.log("=====>", day);
      const nx = area[0];
      const ny = area[1];
      const dataType = "XML";
      const allUrl =
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
      console.log(allUrl);

      return allUrl;
    }

    // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
    async function saveWeather_data(
      nxFindXML,
      nyFindXML,
      cityId,
      dateFindXML,
      timeFindXML,
      categoryFindXML,
      valueFindXML,
    ) {
      if (
        categoryFindXML === "POP" ||
        categoryFindXML === "PTY" ||
        categoryFindXML === "REH" ||
        categoryFindXML === "SKY" ||
        categoryFindXML === "TMP"
      ) {
        await weather_data.create({
          city: cityId,
          nx: nxFindXML,
          ny: nyFindXML,
          date: dateFindXML,
          time: timeFindXML,
          category: categoryFindXML,
          value: valueFindXML,
        });
      }
    }

    function downloadWeatherDataAPI(allUrl, cityId) {
      request(allUrl, (err, res, body) => {
        $ = cheerio.load(body);
        $("item").each(function (idx) {
          const nxFindXML = $(this).find("nx").text();
          const nyFindXML = $(this).find("ny").text();
          const dateFindXML = $(this).find("fcstDate").text();
          const timeFindXML = $(this).find("fcstTime").text();
          const categoryFindXML = $(this).find("category").text();
          const valueFindXML = $(this).find("fcstValue").text();

          saveWeather_data(
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
      sleepTime(5000);
    }

    function saveWeatherData(areaArray, cityId) {
      areaArray.map((area) => {
        let URL = weatherDataURL(area);
        downloadWeatherDataAPI(URL, cityId);
      });
    }

    deleteOldWeatherData(cityId);
    saveWeatherData(areaArray, cityId);

    return res
      .status(201)
      .json({ message: "해당 city의 모든 날씨를 받아왔습니다" });
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

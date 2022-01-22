const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { weather_data } = require("../../models");

module.exports = async (req, res) => {
  try {
    const cityId = req.query.id;
    const areaArray = req.body;

    function sleepTime(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }

    function weatherDataURL(area) {
      const url =
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
      const key = process.env.API_KEY;
      const day = moment().format("YYYYMMDD");
      const base_time = "0500"; // 호출 데이터 05시 고정
      // String(Number(moment().format("HH"))) - 1 + "00"; // 현재시간 -1
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

    function findMissingData(areaArray) {
      areaArray.map(async (area) => {
        const nx = area[0];
        const ny = area[1];
        const findWeatherData = await weather_data.findOne({
          where: { nx: nx, ny: ny },
        });
        console.log("--findWeatherData---", findWeatherData);
        if (!findWeatherData) {
          let URL = weatherDataURL(area);
          downloadWeatherDataAPI(URL, cityId);
        }
      });
    }

    findMissingData(areaArray, cityId);
    return res
      .status(201)
      .json({ message: "해당 city의 모든 날씨를 받아왔습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

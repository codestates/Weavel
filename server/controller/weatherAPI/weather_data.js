const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const dotenv = require("dotenv");
const { weather_data } = require("../../models");

module.exports = (req, res) => {
  try {
    const id = req.query.id;

    // DB 특정지역 날씨 삭제
    weather_data.destroy({ where: { city: id } });

    // DB 날씨 저장
    const arr = req.body;
    const url1 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    const key = process.env.API_KEY;

    console.log(arr);
    arr.map((el) => {
      const day = moment().format("YYYYMMDD");
      const base_time = "1700";
      const nx = el[0];
      const ny = el[1];
      const nz = el[2];
      const dataType = "XML";
      // url

      const all_url = url1 + "?serviceKey=" + key + "&pageNo=1&numOfRows=22222" + "&dataType=" + dataType + "&base_date=" + day + "&base_time=" + base_time + "&nx=" + nx + "&ny=" + ny;
      console.log(all_url);

      request(all_url, (err, res, body) => {
        $ = cheerio.load(body);
        $("item").each(function (idx) {
          const x = $(this).find("nx").text();
          const y = $(this).find("ny").text();
          const date = $(this).find("fcstDate").text();
          const time = $(this).find("fcstTime").text();
          const category = $(this).find("category").text();
          const value = $(this).find("fcstValue").text();

          // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
          if (category === "POP" || category === "PTY" || category === "REH" || category === "SKY" || category === "TMP") {
            return weather_data.create({ city: nz, nx: x, ny: y, date: date, time: time, category: category, value: value });
          }
        });
      });
    });
    return res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log(err);
  }
};

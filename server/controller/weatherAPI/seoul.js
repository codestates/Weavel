const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
const dotenv = require("dotenv");
const { seoul } = require("../../models");

module.exports = (req, res) => {
  try {
    const url1 = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
    const key = process.env.API_KEY;
    moment.tz.setDefault("Asia/Seoul");
    console.log(req.body);
    const arr = req.body;
    console.log(arr);
    arr.map((el) => {
      const date = moment().format("YYYYMMDD");
      const base_time = "0500";
      const nx = el[0];
      const ny = el[1];
      const nz = el[2];
      const dataType = "XML";
      // url

      const all_url = url1 + "?serviceKey=" + key + "&pageNo=1&numOfRows=22222" + "&dataType=" + dataType + "&base_date=" + date + "&base_time=" + base_time + "&nx=" + nx + "&ny=" + ny;
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

          if (category === "POP" || category === "PTY" || category === "REH" || category === "SKY" || category === "TMP") {
            seoul.create({ city: nz, nx: x, ny: y, date: date, time: time, category: category, value: value });
          }
        });
      });
    });
    res.status(201).json({ message: "ok" });
  } catch (err) {
    console.log(err);
  }
};

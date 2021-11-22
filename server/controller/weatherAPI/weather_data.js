const request = require("request");
const cheerio = require("cheerio");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const dotenv = require("dotenv");
const { weather_data } = require("../../models");

module.exports = async (req, res) => {
  try {
    const id = req.query.id;

    // DB 특정지역 날씨 삭제 (날씨 최신화)
    const find = await weather_data.findAll({ where: { city: id } });
    if (find) await weather_data.destroy({ where: { city: id } });

    // 지역 좌표 배열
    const arr = req.body;

    //코드 지연 타이머 함수
    function sleep(ms) {
      const wakeUpTime = Date.now() + ms;
      while (Date.now() < wakeUpTime) {}
    }

    // 기상청 데이터를 받아서 호출시켜 데이터베이스에 저장 함수
    function weatherApi(xy) {
      const url1 =
        "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";
      const key = process.env.API_KEY;

      xy.map((el) => {
        let find = true;
        const day = moment().format("YYYYMMDD");
        const base_time = "0500"; // 호출 데이터 05시 고정
        // String(Number(moment().format("HH"))) - 1 + "00"; // 현재시간 -1
        const nx = el[0];
        const ny = el[1];
        const nz = el[2];
        const dataType = "XML";

        // url
        const all_url =
          url1 +
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
            if (
              category === "POP" ||
              category === "PTY" ||
              category === "REH" ||
              category === "SKY" ||
              category === "TMP"
            ) {
              return weather_data.create({
                city: nz,
                nx: x,
                ny: y,
                date: date,
                time: time,
                category: category,
                value: value,
              });
            }
          });
        });
        sleep(5000);
      });
    }

    // 호출받지 못한 좌표 재호출 함수
    function reWeatherApi(arr) {
      const result = [];
      arr.map((el) => {
        const nx = el[0];
        const ny = el[1];
        let data = weather_data.findOne({ nx: nx, ny: ny });
        if (!data) {
          result.push(el);
        }
      });

      if (result.length !== 0) {
        weatherApi(result);
        reWeatherApi(result);
      }

      if (result.length === 0) {
        return;
      }
    }

    //데이터 받아오기
    weatherApi(arr);
    reWeatherApi(arr);

    return res
      .status(201)
      .json({ message: "해당 city의 모든 날씨를 받아왔습니다" });
  } catch (err) {
    console.log(err);
  }
};

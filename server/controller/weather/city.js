const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    const city = req.query.city;
    const day = req.query.day;
    const time = req.query.time;
    const weather = req.query.weather;
    let dayCode = "";
    let SKYvalue = "";
    let PTYvalue = "";

    // pty는 만족하나 sky는 만족 x
    // 약속된 날짜 코드 오늘(0), 내일(1), 모레(2)
    if (day === "0") {
      dayCode = moment().format("YYYYMMDD");
    }
    if (day === "1") {
      dayCode = moment().add(1, "days").format("YYYYMMDD"); //내일
    }
    if (day === "2") {
      dayCode = moment().add(2, "days").format("YYYYMMDD"); //모레
    }
    console.log("day", dayCode);

    // 약속된 날씨 코드  맑음(0 - SKY(1), PTY(0)), 구름 (1 - SKY(3, 4), PTY(0) ), 비(2 - PTY(1, 4) ), 눈(3 - PTY(2, 3)
    // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
    // 날씨별 값 부여
    if (weather === "0") {
      SKYvalue = "1";
      PTYvalue = "0";
    }
    if (weather === "1") {
      SKYvalue = ["3", "4"];
      PTYvalue = "0";
    }
    if (weather === "2") {
      PTYvalue = ["1", "4"];
    }
    if (weather === "3") {
      PTYvalue = ["2", "3"];
    }

    // category 해당 추출
    const find = await weather_data.findAll({
      where: {
        city: city,
        date: dayCode,
        time: time,

        [or]: [
          { [and]: [{ category: "SKY" }, { [or]: { value: SKYvalue } }] },
          { [and]: [{ category: "PTY" }, { [or]: { value: PTYvalue } }] },
        ],
      },
    });

    // 좌표 추출
    const result = [];
    const end = [];

    for (let i = 0; i < find.length; i++) {
      const xy = [];
      xy.push(find[i].nx);
      xy.push(find[i].ny);
      result.push(xy);
    }

    // 날씨 맑음, 흐림은 중복조건이 있음으로 체크 이중반복문
    if (weather === "1" || weather === "0") {
      for (let i = 0; i < result.length; i++) {
        for (let j = i + 1; j < result.length - 1; j++) {
          if (result[i][0] === result[j][0] && result[i][1] === result[j][1]) {
            end.push(result[i]);
            break;
          }
        }
      }
      if (end.length === 0) {
        return res.status(404).json({ message: "데이터가 없습니다." });
      }
      return res.status(200).send(end);
    }

    if (result.length === 0) {
      return res.status(404).json({ message: "데이터가 없습니다." });
    }

    return res.status(200).send(result);
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

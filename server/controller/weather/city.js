const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  const city = req.query.city;
  const day = req.query.day;
  const time = req.query.time;
  const weather = req.query.weather;
  let dayCode = "";
  let SKYvalue = "";
  let PTYvalue = "";
  // pty는 만족하나 sky는 만족 x
  //날짜 코드 오늘(0), 내일(1), 모레(2)
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

  // 날씨 코드  맑음(0 - SKY(1), PTY(0)), 구름 (1 - SKY(3, 4), PTY(0) ), 비(2 - PTY(1, 4) ), 눈(3 - PTY(2, 3)
  // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
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

  const SKY = await weather_data.findAll({
    where: {
      city: city,
      date: dayCode,
      time: time,
      category: "SKY",
      [or]: { value: SKYvalue },
    },
  });
  const PTY = await weather_data.findAll({
    where: {
      city: city,
      date: dayCode,
      time: time,
      category: "PTY",
      [or]: { value: PTYvalue },
    },
  });
  console.log("SKYvalueSKYvalueSKYvalueSKYvalue", !SKYvalue);
  console.log("PTYvaluePTYvaluePTYvaluePTYvalue", PTYvalue);
  console.log("day111111111111111111111", SKY);
  console.log("day222222222222222222222", PTY);

  // SKY PYT 둘다 데이터가 존재 해야함.
  if (SKYvalue && PTYvalue) {
    if (SKY.length === 0 || PTY.length === 0) {
      return res.status(404).json({ message: "데이터가 없습니다." });
    }
  }
  if (!SKYvalue && PTY.length === 0) {
    return res.status(404).json({ message: "데이터가 없습니다." });
  }

  // 좌표 추출
  const result = [];
  for (let i = 0; i < PTY.length; i++) {
    const xy = [];
    xy.push(PTY[i].nx);
    xy.push(PTY[i].ny);
    result.push(xy);
  }
  return res.status(200).send(result);
};

const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    // 좌표
    const nx = req.query.nx;
    const ny = req.query.ny;
    // 현재시간
    const time = Number(moment().format("HH") + "00");
    // 현재날짜
    const today = moment().format("YYYYMMDD");

    // POP 강수확률,  REH 습도,  TMP 1시간 기온
    const weather = await weather_data.findAll({
      where: {
        nx: nx,
        ny: ny,
        [or]: [{ category: "TMP" }, { category: "POP" }, { category: "REH" }],
      },
    });

    // 날씨 데이터 추출
    const result = [];
    weather.filter((e) => {
      const data = [];
      data.push(e.date);
      data.push(e.time);
      data.push(e.category);
      data.push(e.value);
      return result.push(data);
    });

    if (weather.length === 0) {
      return res.status(404).json({ message: "조회된 데이터가 없습니다." });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

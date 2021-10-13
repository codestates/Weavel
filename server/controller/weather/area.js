const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  const nx = req.query.nx;
  const ny = req.query.ny;
  const time = Number(moment().format("HH") + "00");
  const today = moment().format("YYYYMMDD");

  // 현재시간 이전 데이터 삭제
  const trash = await weather_data.destroy({
    where: {
      date: today,
      time: { [lt]: time },
    },
  });

  // POP 강수확률,  REH 습도,  TMP 1시간 기온
  const weather = await weather_data.findAll({
    where: {
      nx: nx,
      ny: ny,
      [or]: [{ category: "TMP" }, { category: "POP" }, { category: "REH" }],
    },
  });
  console.log("-----------_>", weather);
  console.log("-----------_>", trash);
  console.log("-----------_>", today);
  console.log("-----------_>", time);

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
};

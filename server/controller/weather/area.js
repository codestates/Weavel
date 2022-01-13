const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    // 좌표
    const nxCoordinate = req.query.nx;
    const nyCoordinate = req.query.ny;

    const findAllTimeWeatherData = await weather_data.findAll({
      where: {
        nx: nxCoordinate,
        ny: nyCoordinate,
        [or]: [{ category: "TMP" }, { category: "POP" }, { category: "REH" }],
        // POP 강수확률, REH 습도, TMP 1시간 기온
      },
    });

    function checkExistWeatherData(findAllTimeWeatherData) {
      if (findAllTimeWeatherData.length === 0) {
        return res.status(404).json({ message: "조회된 데이터가 없습니다." });
      }
    }

    function fillterWeatherData(findAllTimeWeatherData) {
      const resultWeather = findAllTimeWeatherData.filter((e) => {
        const result = [];
        result.push(e.date);
        result.push(e.time);
        result.push(e.category);
        result.push(e.value);
        return result;
      });

      return res.status(200).json(resultWeather);
    }

    checkExistWeatherData(findAllTimeWeatherData);
    fillterWeatherData(findAllTimeWeatherData);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

// 현재시간
//const time = Number(moment().format("HH") + "00");
// 현재날짜
//const today = moment().format("YYYYMMDD");

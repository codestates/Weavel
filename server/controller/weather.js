const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

class weatherController {
  constructor(weatherDB) {
    this.weather = weatherDB;
  }

  areaWeather = async (req, res) => {
    try {
      const nxCoordinate = req.query.nx;
      const nyCoordinate = req.query.ny;

      // POP 강수확률, REH 습도, TMP 1시간 기온
      const findAllTimeWeatherData = await this.weather.filterTmpPopReh(
        nxCoordinate,
        nyCoordinate,
      );
      if (findAllTimeWeatherData.length === 0) {
        return res.status(404).json({ message: "조회된 데이터가 없습니다." });
      }

      const resultWeather = findAllTimeWeatherData.filter((data) => {
        const result = [];
        result.push(data.date);
        result.push(data.time);
        result.push(data.category);
        result.push(data.value);
        return result;
      });

      return res.status(200).json(resultWeather);
    } catch (err) {
      console.log("err", err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };

  cityWeather = async (req, res) => {
    try {
      const cityCode = req.query.city;
      const dayCode = req.query.day;
      const timeCode4 = req.query.time;
      const weatherCode = req.query.weather;
      let dateCode8 = await changeDayCode(dayCode);
      let skyValueCode = skyValue(weatherCode);
      let ptyValueCode = ptyValue(weatherCode);

      const filterSkyPtyData = await this.weather.fillterSkyPty(
        cityCode,
        dateCode8,
        timeCode4,
        skyValueCode,
        ptyValueCode,
      );

      const coordinateAllResult = filterSkyPtyData.map((coordinate) => {
        let xy = [];
        xy.push(coordinate.nx);
        xy.push(coordinate.ny);
        return xy;
      });

      if (coordinateAllResult.length === 0) {
        return res.status(200).json({ message: "데이터가 없습니다." });
      }

      if (weatherCode === "0" || weatherCode === "1") {
        //맑음 흐림은 좌표가 중복된 데이터만 유효
        const result = filterOverlapCoordinate(coordinateAllResult);
        if (result.length === 0) {
          return res.status(200).json({ message: "데이터가 없습니다." });
        }

        return res.status(200).send(result);
      }

      return res.status(200).send(coordinateAllResult);
    } catch (err) {
      console.log("err", err);
      return res.status(501).json({ message: "서버 에러 입니다." });
    }
  };
}

async function changeDayCode(dayCode) {
  //오늘(0), 내일(1), 모레(2)
  if (dayCode === "0") {
    return moment().format("YYYYMMDD");
  }
  if (dayCode === "1") {
    return moment().add(1, "days").format("YYYYMMDD");
  }
  if (dayCode === "2") {
    return moment().add(2, "days").format("YYYYMMDD");
  }
}

function skyValue(weatherCode) {
  if (weatherCode === "0") return "1";
  if (weatherCode === "1") return ["3", "4"];
  else return "";
}

function ptyValue(weatherCode) {
  if (weatherCode === "0") return "0";
  if (weatherCode === "1") return "0";
  if (weatherCode === "2") return ["1", "4"];
  if (weatherCode === "3") return ["2", "3"];
}

function filterOverlapCoordinate(coordinateAllResult) {
  const result = [];
  for (let i = 0; i < coordinateAllResult.length; i++) {
    for (let j = i + 1; j < coordinateAllResult.length; j++) {
      if (
        coordinateAllResult[i][0] === coordinateAllResult[j][0] &&
        coordinateAllResult[i][1] === coordinateAllResult[j][1]
      ) {
        result.push(coordinateAllResult[i]);
        break;
      } else {
        break;
      }
    }
  }
  return result;
}

module.exports = {
  weatherController,
};

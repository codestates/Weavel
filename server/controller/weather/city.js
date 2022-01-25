// const { weather_data } = require("../../models");
// const moment = require("moment");
// require("moment-timezone");
// moment.tz.setDefault("Asia/Seoul");
// const { Sequelize } = require("sequelize");
// const { or, and, gt, lt } = Sequelize.Op;

// module.exports = async (req, res) => {
//   try {
//     const cityCode = req.query.city;
//     const dayCode = req.query.day;
//     const timeFourCode = req.query.time;
//     const weatherCode = req.query.weather;
//     let dateEightCode = "";
//     let skyValueCode = "";
//     let ptyValueCode = "";

//     function changeDayCode() {
//       //오늘(0), 내일(1), 모레(2)
//       if (dayCode === "0") {
//         dateEightCode = moment().format("YYYYMMDD");
//       }
//       if (dayCode === "1") {
//         dateEightCode = moment().add(1, "days").format("YYYYMMDD"); //내일
//       }
//       if (dayCode === "2") {
//         dateEightCode = moment().add(2, "days").format("YYYYMMDD"); //모레
//       }
//     }

//     function changeWeatherValue(weatherCode) {
//       // 약속된 날씨 코드  맑음(0 - SKY(1), PTY(0)), 구름 (1 - SKY(3, 4), PTY(0) ), 비(2 - PTY(1, 4) ), 눈(3 - PTY(2, 3)
//       // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
//       // 날씨별 값 부여
//       if (weatherCode === "0") {
//         skyValueCode = "1";
//         ptyValueCode = "0";
//       }
//       if (weatherCode === "1") {
//         skyValueCode = ["3", "4"];
//         ptyValueCode = "0";
//       }
//       if (weatherCode === "2") {
//         ptyValueCode = ["1", "4"];
//       }
//       if (weatherCode === "3") {
//         ptyValueCode = ["2", "3"];
//       }
//     }

//     changeDayCode(dayCode);
//     changeWeatherValue(weatherCode);

//     const extractWeatherData = await weather_data.findAll({
//       where: {
//         city: cityCode,
//         date: dateEightCode,
//         time: timeFourCode,
//         [or]: [
//           { [and]: [{ category: "SKY" }, { [or]: { value: skyValueCode } }] },
//           { [and]: [{ category: "PTY" }, { [or]: { value: ptyValueCode } }] },
//         ],
//       },
//     });

//     const coordinateAllResult = extractWeatherData.map((coordinate) => {
//       let xy = [];
//       xy.push(coordinate.nx);
//       xy.push(coordinate.ny);
//       return xy;
//     });

//     function removeRepetitionCoordinate(coordinateAllResult) {
//       const result = [];
//       for (let i = 0; i < coordinateAllResult.length; i++) {
//         for (let j = i + 1; j < coordinateAllResult.length; j++) {
//           if (
//             coordinateAllResult[i][0] === coordinateAllResult[j][0] &&
//             coordinateAllResult[i][1] === coordinateAllResult[j][1]
//           ) {
//             result.push(coordinateAllResult[i]);
//             break;
//           } else {
//             break;
//           }
//         }
//       }
//       return result;
//     }

//     function sunnyAndCloudy(coordinateAllResult) {
//       // 맑음, 흐림은 중복조건이 있음으로 중복제거필요
//       const result = removeRepetitionCoordinate(coordinateAllResult);

//       if (result.length === 0) {
//         return res.status(200).json({ message: "데이터가 없습니다." });
//       }
//       return res.status(200).send(result);
//     }

//     function rainAndSnow(coordinateAllResult) {
//       if (weatherCode === "2" || weatherCode === "3") {
//         if (coordinateAllResult.length === 0) {
//           return res.status(200).json({ message: "데이터가 없습니다." });
//         }
//         return res.status(200).send(coordinateAllResult);
//       }
//     }

//     function resultCoordinate(weatherCode, coordinateAllResult) {
//       if (weatherCode === "0" || weatherCode === "1") {
//         sunnyAndCloudy(coordinateAllResult);
//       }
//       if (weatherCode === "2" || weatherCode === "3") {
//         rainAndSnow(coordinateAllResult);
//       }
//     }

//     resultCoordinate(weatherCode, coordinateAllResult);
//   } catch (err) {
//     console.log("err", err);
//     return res.status(501).json({ message: "서버 에러 입니다." });
//   }
// };

const { weather_data } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;

module.exports = async (req, res) => {
  try {
    const cityCode = req.query.city;
    const dayCode = req.query.day;
    const timeFourCode = req.query.time;
    const weatherCode = req.query.weather;
    let dateEightCode = "";
    let skyValueCode = "";
    let ptyValueCode = "";

    function changeDayCode() {
      //오늘(0), 내일(1), 모레(2)
      if (dayCode === "0") {
        dateEightCode = moment().format("YYYYMMDD");
      }
      if (dayCode === "1") {
        dateEightCode = moment().add(1, "days").format("YYYYMMDD"); //내일
      }
      if (dayCode === "2") {
        dateEightCode = moment().add(2, "days").format("YYYYMMDD"); //모레
      }
    }

    function changeWeatherValue(weatherCode) {
      // 약속된 날씨 코드  맑음(0 - SKY(1), PTY(0)), 구름 (1 - SKY(3, 4), PTY(0) ), 비(2 - PTY(1, 4) ), 눈(3 - PTY(2, 3)
      // POP 강수확률, PTY 강수형태, REH 습도, SKY 하늘상태 TMP 1시간 기온
      // 날씨별 값 부여
      if (weatherCode === "0") {
        skyValueCode = "1";
        ptyValueCode = "0";
      }
      if (weatherCode === "1") {
        skyValueCode = ["3", "4"];
        ptyValueCode = "0";
      }
      if (weatherCode === "2") {
        ptyValueCode = ["1", "4"];
      }
      if (weatherCode === "3") {
        ptyValueCode = ["2", "3"];
      }
    }

    changeDayCode(dayCode);
    changeWeatherValue(weatherCode);

    const extractWeatherData = await weather_data.findAll({
      where: {
        city: cityCode,
        date: dateEightCode,
        time: timeFourCode,
        [or]: [
          { [and]: [{ category: "SKY" }, { [or]: { value: skyValueCode } }] },
          { [and]: [{ category: "PTY" }, { [or]: { value: ptyValueCode } }] },
        ],
      },
    });

    const coordinateAllResult = extractWeatherData.map((coordinate) => {
      let xy = [];
      xy.push(coordinate.nx);
      xy.push(coordinate.ny);
      return xy;
    });

    function removeRepetitionCoordinate(coordinateAllResult) {
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

    function sunnyAndCloudy(coordinateAllResult) {
      // 맑음, 흐림은 중복조건이 있음으로 중복제거필요
      const result = removeRepetitionCoordinate(coordinateAllResult);

      if (result.length === 0) {
        return res.status(200).json({ message: "데이터가 없습니다." });
      }
      return res.status(200).send(result);
    }

    function rainAndSnow(coordinateAllResult) {
      if (weatherCode === "2" || weatherCode === "3") {
        if (coordinateAllResult.length === 0) {
          return res.status(200).json({ message: "데이터가 없습니다." });
        }
        return res.status(200).send(coordinateAllResult);
      }
    }

    function resultCoordinate(weatherCode, coordinateAllResult) {
      if (weatherCode === "0" || weatherCode === "1") {
        sunnyAndCloudy(coordinateAllResult);
      }
      if (weatherCode === "2" || weatherCode === "3") {
        rainAndSnow(coordinateAllResult);
      }
    }

    resultCoordinate(weatherCode, coordinateAllResult);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

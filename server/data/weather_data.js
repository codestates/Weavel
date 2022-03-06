const { weather_data } = require("../models");
const { Sequelize } = require("sequelize");
const { or, and, gt, lt } = Sequelize.Op;
const request = require("request");
const cheerio = require("cheerio");

// weatherData
function sleepTime(ms) {
  const wakeUpTime = Date.now() + ms;
  while (Date.now() < wakeUpTime) {}
}

async function createCityWeatherData(
  nxFindXML,
  nyFindXML,
  cityId,
  dateFindXML,
  timeFindXML,
  categoryFindXML,
  valueFindXML,
) {
  await weather_data.create({
    city: cityId,
    nx: nxFindXML,
    ny: nyFindXML,
    date: dateFindXML,
    time: timeFindXML,
    category: categoryFindXML,
    value: valueFindXML,
  });
}

function downloadWeatherDataAPI(URL, cityId) {
  request(URL, async (err, res, body) => {
    $ = cheerio.load(body);
    $("item").each(function (idx) {
      const nxFindXML = $(this).find("nx").text();
      const nyFindXML = $(this).find("ny").text();
      const dateFindXML = $(this).find("fcstDate").text();
      const timeFindXML = $(this).find("fcstTime").text();
      const categoryFindXML = $(this).find("category").text();
      const valueFindXML = $(this).find("fcstValue").text();

      if (
        categoryFindXML === "POP" ||
        categoryFindXML === "PTY" ||
        categoryFindXML === "REH" ||
        categoryFindXML === "SKY" ||
        categoryFindXML === "TMP"
      ) {
        createCityWeatherData(
          nxFindXML,
          nyFindXML,
          cityId,
          dateFindXML,
          timeFindXML,
          categoryFindXML,
          valueFindXML,
        );
      }
    });
  });
  sleepTime(1000);
}

// recoverData
async function checkWeatherData(nx, ny, cityId, URL) {
  let count = new Promise((resolve, reject) => {
    resolve(countAreaWeatherData(cityId, nx, ny));
  });

  count
    .then((value) => {
      console.log("countdata=>>>>>", value);
      countCheckWeatherData(value, nx, ny, cityId, URL);
    })
    .catch((error) => {
      console.log(error);
    });
}

function countCheckWeatherData(count, nx, ny, cityId, URL) {
  if (count !== 365) {
    if (count !== 0) deleteAreaWeatherData(nx, ny);
    downloadWeatherDataAPI(URL, cityId);
  }
}
function countAreaWeatherData(cityId, nx, ny) {
  return weather_data.count({
    distinct: true,
    where: { city: cityId, nx: nx, ny: ny },
  });
}
// ~ recoverData

function deleteCityWeatherData(cityId) {
  weather_data.destroy({ where: { city: cityId } });
}

function deleteAreaWeatherData(nx, ny) {
  weather_data.destroy({ where: { nx: nx, ny: ny } });
}

async function filterTmpPopReh(nxCoordinate, nyCoordinate) {
  return weather_data.findAll({
    where: {
      nx: nxCoordinate,
      ny: nyCoordinate,
      [or]: [{ category: "TMP" }, { category: "POP" }, { category: "REH" }],
      // POP 강수확률, REH 습도, TMP 1시간 기온
    },
  });
}

async function fillterSkyPty(
  cityCode,
  dateCode8,
  timeCode4,
  skyValueCode,
  ptyValueCode,
) {
  //  SKY 하늘상태 PTY 강수형태
  return weather_data.findAll({
    where: {
      city: cityCode,
      date: dateCode8,
      time: timeCode4,
      [or]: [
        { [and]: [{ category: "SKY" }, { [or]: { value: skyValueCode } }] },
        { [and]: [{ category: "PTY" }, { [or]: { value: ptyValueCode } }] },
      ],
    },
  });
}

module.exports = {
  downloadWeatherDataAPI,
  checkWeatherData,
  deleteCityWeatherData,
  deleteAreaWeatherData,
  filterTmpPopReh,
  fillterSkyPty,
};

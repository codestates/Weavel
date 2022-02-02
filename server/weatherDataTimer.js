const axios = require("axios");
const schedule = require("node-schedule");

// 전국 날씨 API Get 요청 예약 (기상청 데이터 데이터 제공시간 02시, 05시, 08시, 11시, 14시, 17시, 20시, 23시)
// 해당 API는 05시 데이터만 사용
schedule.scheduleJob("0 0 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=01");
});
schedule.scheduleJob("0 3 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=02");
});
schedule.scheduleJob("0 6 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=03");
});
schedule.scheduleJob("0 9 23  * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=04");
});
schedule.scheduleJob("0 11 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=05");
});
schedule.scheduleJob("0 13 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=06");
});
schedule.scheduleJob("0 15 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=07");
});
schedule.scheduleJob("0 18 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=08");
});
schedule.scheduleJob("0 20 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=09");
});
schedule.scheduleJob("0 30 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=10");
});
schedule.scheduleJob("0 37 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=11");
});
schedule.scheduleJob("0 41 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=12");
});
schedule.scheduleJob("0 45 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=13");
});
schedule.scheduleJob("0 48 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=14");
});
schedule.scheduleJob("0 51 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=15");
});
schedule.scheduleJob("0 54 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=16");
});
schedule.scheduleJob("0 57 23 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=17");
});

//recovery API
schedule.scheduleJob("0 5 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=01");
});
schedule.scheduleJob("0 10 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=02");
});
schedule.scheduleJob("0 15 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=03");
});
schedule.scheduleJob("0 20 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=04");
});
schedule.scheduleJob("0 25 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=05");
});
schedule.scheduleJob("0 30 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=06");
});
schedule.scheduleJob("0 35 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=07");
});
schedule.scheduleJob("0 40 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=06");
});
schedule.scheduleJob("0 45 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=09");
});
schedule.scheduleJob("0 50 0/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=10");
});
schedule.scheduleJob("0 0 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=11");
});
schedule.scheduleJob("0 5 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=12");
});
schedule.scheduleJob("0 10 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=13");
});
schedule.scheduleJob("0 15 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=14");
});
schedule.scheduleJob("0 20 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=15");
});
schedule.scheduleJob("0 25 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=16");
});
schedule.scheduleJob("0 30 1/6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=17");
});

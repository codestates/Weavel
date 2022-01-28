const axios = require("axios");
const schedule = require("node-schedule");

// 전국 날씨 API Get 요청 예약 (기상청 데이터 데이터 제공시간 02시, 05시, 08시, 11시, 14시, 17시, 20시, 23시)
// 해당 API는 05시 데이터만 사용
schedule.scheduleJob("0 10 5 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=01");
});
schedule.scheduleJob("0 20 5 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=02");
});
schedule.scheduleJob("0 30 5 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=03");
});
schedule.scheduleJob("0 40 5  * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=04");
});
schedule.scheduleJob("0 50 5 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=05");
});
schedule.scheduleJob("0 0 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=06");
});
schedule.scheduleJob("0 10 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=07");
});
schedule.scheduleJob("0 20 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=08");
});
schedule.scheduleJob("0 30 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=09");
});
schedule.scheduleJob("0 40 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=10");
});
schedule.scheduleJob("0 50 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=11");
});
schedule.scheduleJob("0 0 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=12");
});
schedule.scheduleJob("0 10 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=13");
});
schedule.scheduleJob("0 20 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=14");
});
schedule.scheduleJob("0 30 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=15");
});
schedule.scheduleJob("0 40 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=16");
});
schedule.scheduleJob("0 50 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=17");
});

//recovery API
schedule.scheduleJob("0 15 5/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=01");
});
schedule.scheduleJob("0 25 5/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=02");
});
schedule.scheduleJob("0 35 5/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=03");
});
schedule.scheduleJob("0 45 5/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=04");
});
schedule.scheduleJob("0 55 5/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=05");
});
schedule.scheduleJob("0 5 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=06");
});
schedule.scheduleJob("0 15 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=07");
});
schedule.scheduleJob("0 25 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=08");
});
schedule.scheduleJob("0 35 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=09");
});
schedule.scheduleJob("0 45 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=10");
});
schedule.scheduleJob("0 55 6/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=11");
});
schedule.scheduleJob("0 5 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=12");
});
schedule.scheduleJob("0 15 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=13");
});
schedule.scheduleJob("0 25 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=14");
});
schedule.scheduleJob("0 35 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=15");
});
schedule.scheduleJob("0 45 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=16");
});
schedule.scheduleJob("0 55 7/8 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI/recovery?id=17");
});

require("dotenv").config();
const axios = require("axios");
const express = require("express");
const app = express();
const schedule = require("node-schedule");

// 전국 날씨 API Get 요청 예약 (데이터 받는 가능시간 00시 03시, 06시, 09시, 12시, 15시, 18시, 21시)
schedule.scheduleJob("0 0 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=01");
});
schedule.scheduleJob("0 5 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=02");
});
schedule.scheduleJob("0 10 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=03");
});
schedule.scheduleJob("0 15 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=04");
});
schedule.scheduleJob("0 20 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=05");
});
schedule.scheduleJob("0 25 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=016");
});
schedule.scheduleJob("0 30 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=07");
});
schedule.scheduleJob("0 35 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=08");
});
schedule.scheduleJob("0 40 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=09");
});
schedule.scheduleJob("0 45 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=10");
});
schedule.scheduleJob("0 55 6 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=11");
});
schedule.scheduleJob("0 0 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=12");
});
schedule.scheduleJob("0 5 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=13");
});
schedule.scheduleJob("0 10 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=14");
});
schedule.scheduleJob("0 15 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=15");
});
schedule.scheduleJob("0 20 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=16");
});
schedule.scheduleJob("0 25 7 * * *", () => {
  axios.get("https://server.weavel.site/weatherAPI?id=17");
});

require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const express = require("express");
const app = express();
const schedule = require("node-schedule");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  }),
);

// 전국 날씨 API Get 요청 예약 (데이터 받는 가능시간 00시 03시, 06시, 09시, 12시, 15시, 18시, 21시)
schedule.scheduleJob("0 0 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=01");
});
schedule.scheduleJob("0 3 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=02");
});
schedule.scheduleJob("0 6 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=03");
});
schedule.scheduleJob("0 9 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=04");
});
schedule.scheduleJob("0 11 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=05");
});
schedule.scheduleJob("0 12 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=06");
});
schedule.scheduleJob("0 14 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=07");
});
schedule.scheduleJob("0 16 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=08");
});
schedule.scheduleJob("0 19 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=09");
});
schedule.scheduleJob("0 20 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=10");
});
schedule.scheduleJob("0 30 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=11");
});
schedule.scheduleJob("0 35 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=12");
});
schedule.scheduleJob("0 38 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=13");
});
schedule.scheduleJob("0 41 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=14");
});
schedule.scheduleJob("0 44 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=15");
});
schedule.scheduleJob("0 50 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=16");
});
schedule.scheduleJob("0 55 6/12 * * *", () => {
  axios.get("http://localhost:4000/weatherAPI?id=17");
});

//라우터 경로
const userrouter = require("./router/user");
const photorouter = require("./router/photo");
const weatherrouter = require("./router/weather");
const weatherAPIrouter = require("./router/weatherAPI");

//특정 API를 받았을 때
app.use("/user", userrouter);
app.use("/photo", photorouter);
app.use("/weather", weatherrouter);
app.use("/weatherAPI", weatherAPIrouter);

//서버실행
const PORT = process.env.SERVER_PORT || 4000;
const HOST = process.env.SERVER_HOST;

app.listen(PORT, HOST, () => {
  console.log(`Server Listening on ${HOST}:${PORT}`);
});

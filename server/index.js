require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const express = require("express");
const app = express();
const schedule = require("node-schedule");

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "OPTIONS","DELETE"],
  }),
);

// 전국 날씨 API Get 요청 예약
schedule.scheduleJob("0 14 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=01");
});
schedule.scheduleJob("0 15 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=02");
});
schedule.scheduleJob("0 16 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=03");
});
schedule.scheduleJob("0 17 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=04");
});
schedule.scheduleJob("0 18 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=05");
});
schedule.scheduleJob("0 19 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=06");
});
schedule.scheduleJob("0 20 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=07");
});
schedule.scheduleJob("0 21 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=08");
});
schedule.scheduleJob("0 23 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=09");
});
schedule.scheduleJob("0 24 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=10");
});
schedule.scheduleJob("0 25 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=11");
});
schedule.scheduleJob("0 26 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=12");
});
schedule.scheduleJob("0 27 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=13");
});
schedule.scheduleJob("0 28 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=14");
});
schedule.scheduleJob("0 29 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=15");
});
schedule.scheduleJob("0 30 5/3 * * *", function () {
  axios.get("http://localhost:4000/weatherAPI?id=16");
});
schedule.scheduleJob("0 31 5/3 * * *", function () {
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

//https, 서버실행
//서버실행
const PORT = process.env.SERVER_PORT || 4000;
const HOST = process.env.SERVER_HOST;

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});

app.listen(PORT, HOST, () => {
  console.log(`Server Listening on ${HOST}:${PORT}`);
});


require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
//라우터 경로
const userrouter = require("./router/user");
const photorouter = require("./router/photo");
const weatherrouter = require("./router/weather");

//특정 API를 받았을 때
app.use("/user", userrouter);
app.use("/photo", photorouter);
app.use("/weather", weatherrouter);

//https, 서버실행
const HTTPS_PORT = process.env.HTTPS_PORT || 4000;
let server;
if (fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")) {
  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log("server runnning"));
} else {
  server = app.listen(HTTPS_PORT);
}

module.exports = server;

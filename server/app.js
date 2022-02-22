require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

//router
const userrouter = require("./router/user");
const { userController } = require("./controller/user.js");
const userDB = require("./data/user.js");
const userWeatherDB = require("./data/user_weather.js");

const photorouter = require("./router/photo");
const { photoController } = require("./controller/photo.js");
const photoDB = require("./data/photo.js");

const weatherrouter = require("./router/weather");
const { weatherController } = require("./controller/weather.js");
const weatherAPIrouter = require("./router/weatherAPI");
const { weatherApiController } = require("./controller/weatherAPI.js");
const weatherDB = require("./data/weather_data.js");

const corsOption = {
  Headers: { "content-type": "application/json" },
  origin: true,
  credentials: true,
  method: ["post", "get", "put", "patch", "delete", "options"],
};

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOption));
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use("/user", userrouter(new userController(userDB, userWeatherDB)));
app.use("/photo", photorouter(new photoController(photoDB)));
app.use("/weather", weatherrouter(new weatherController(weatherDB)));
app.use("/weatherAPI", weatherAPIrouter(new weatherApiController(weatherDB)));

app.get("/", (req, res) => {
  res.status(201).send("Hello World");
});

module.exports = app;

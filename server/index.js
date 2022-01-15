require("dotenv").config();
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const axios = require("axios");
const express = require("express");
const app = express("./app");
const schedule = require("node-schedule");

//서버실행
const PORT = process.env.SERVER_PORT || 80;
const HOST = process.env.SERVER_HOST;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});

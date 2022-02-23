require("dotenv").config();
const { startServer } = require("./app.js");
const weatherDataTimer = require("./weatherDataTimer.js");

const PORT = process.env.SERVER_PORT || 80;
const HOST = process.env.SERVER_HOST;

weatherDataTimer;
startServer(PORT);

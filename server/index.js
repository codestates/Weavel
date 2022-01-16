require("dotenv").config();
const app = require("./app.js");
const weatherDataTimer = require("./weatherDataTimer.js");

const PORT = process.env.SERVER_PORT || 80;
const HOST = process.env.SERVER_HOST;

weatherDataTimer.scheduleJob;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});

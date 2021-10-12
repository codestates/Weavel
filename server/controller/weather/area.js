const { seoul } = require("../../models");
const moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
module.exports = async (req, res) => {
  const city = req.query.city;
  const day = req.query.day;
  const time = moment().format("HH");
  console.log("123123123", time);
};

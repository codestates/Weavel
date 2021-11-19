var express = require("express");
var router = express.Router();
const { weatherAPIController } = require("../controller");
const { cityarea } = require("../middleware/cityarea");

router.get("/", cityarea, weatherAPIController.weather_data);

module.exports = router;

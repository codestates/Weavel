const express = require("express");
const router = express.Router();
const { weatherAPIController } = require("../controller");
const { cityarea } = require("../middleware/cityarea");

router.get("/", cityarea, weatherAPIController.weather_data);

module.exports = router;

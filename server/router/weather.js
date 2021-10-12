var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { weatherController } = require("../controller");

// city
router.get("/city", accessToken, weatherController.city);

// area
router.get("/area", accessToken, weatherController.area);

module.exports = router;

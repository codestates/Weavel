var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { weatherController } = require("../controller");

//
router.get("/city", accessToken, weatherController.city);

//
router.get("/area", accessToken, weatherController.area);

module.exports = router;

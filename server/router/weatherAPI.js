var express = require("express");
var router = express.Router();
const { weatherAPIController } = require("../controller");
const { cityarea } = require("../middleware/cityArea");

router.get("/", cityarea, weatherAPIController.seoul);

module.exports = router;

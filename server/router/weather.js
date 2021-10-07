var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { weatherController } = require("../controller");


// 좋아요 불러오기 /like/user
router.get("/city", accessToken, weatherController.city);

// 좋아요 추가 /like/plus
router.get("/area", accessToken, weatherController.area);


module.exports = router;

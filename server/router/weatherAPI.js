var express = require("express");
var router = express.Router();
const { weatherAPIController } = require("../controller");
const { cityarea } = require("../middleware/cityarea");

// 서울 (01)
router.get("/", cityarea, weatherAPIController.seoul);
// // 부산 (02)
// router.get("/busan", weatherAPIController.busan);
// // 인천 (03)
// router.get("/incheon", weatherAPIController.incheon);
// // 대구 (04)
// router.get("/daegu", weatherAPIController.daegu);
// // 대전 (05)
// router.get("/daejeon", weatherAPIController.daejeon);
// // 광주 (06)
// router.get("/gwangju", weatherAPIController.gwangju);
// // 울산 (07)
// router.get("/ulsan", weatherAPIController.ulsan);
// // 세종 (08)
// router.get("/sejong", weatherAPIController.sejong);
// // 제주 (09)
// router.get("/jeju", weatherAPIController.jeju);
// // 경기 (10)
// router.get("/gyeonggi", weatherAPIController.gyeonggi);
// // 강원 (11)
// router.get("/gangwon", weatherAPIController.gangwon);
// // 충북 (12)
// router.get("/chungbuk", weatherAPIController.chungbuk);
// // 충남 (13)
// router.get("/chungnam", weatherAPIController.chungnam);
// // 전북 (14)
// router.get("/jeonbuk", weatherAPIController.jeonbuk);
// // 전남 (15)
// router.get("/jeonnam", weatherAPIController.jeonnam);
// // 경북 (16)
// router.get("/gyeongbuk", weatherAPIController.gyeongbuk);
// // 경남 (17)
// router.get("/gyeongnam", weatherAPIController.gyeongnam);

module.exports = router;

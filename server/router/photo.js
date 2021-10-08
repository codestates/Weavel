var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { photoController } = require("../controller");

//! multer 미들웨어 시작
const multer = require("multer");

var storage = multer.diskStorage({
  // 경로 설정 함수
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 경로 설정
  },
  // 이름 설정 함수
  filename: function (req, file, cb) {
    cb(null, file.originalname + "(" + Date.now() + ")");
    //cb 콜백함수를 통해 이름 설정
  },
});
var upload = multer({ storage: storage });
//! multer 미들웨어 끝

// GET	/photo 사진 불러오기
router.get("/", express.static("uploads"), photoController.get);

// POST	/photo 사진 저장
router.post("/", upload.single("image"), photoController.post);

// PUT	/photo	사진 수정
router.put("/", accessToken, photoController.put);

// DELETE	/photo	사진 삭제
router.delete("/", accessToken, photoController.delete);

module.exports = router;

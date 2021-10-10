var express = require("express");
var router = express.Router();

const { accessToken } = require("../middleware/accessToken");
const { photoController } = require("../controller");
const { upload } = require("../middleware/multer");

// GET	/photo 사진 조회하기
router.get("/", accessToken, photoController.get);

// GET	/photo 사진정보 불러오기
router.get("/info", accessToken, photoController.info_get);

// POST	/photo 사진 저장
router.post("/", accessToken, upload.single("image"), photoController.post);

// POST	/photo/info 사진 정보 저장
router.post("/info", accessToken, photoController.info_post);

// PUT	/photo	사진 수정
router.put("/", accessToken, upload.single("image"), photoController.put);

// PUT	/photo/info 사진 정보 수정
router.put("/info", accessToken, photoController.info_put);

// DELETE	/photo	사진 삭제
router.delete("/", accessToken, photoController.delete);

module.exports = router;

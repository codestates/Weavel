var express = require("express");
var router = express.Router();
const { accessToken } = require("../middleware/accessToken");
const { photoController } = require("../controller");

// GET	/post 사진불러오기
router.get("/", accessToken, photoController.get);

// POST	/post 사진저장
router.post("/", accessToken, photoController.post);

// PUT	/post/edit	게시글 수정
router.put("/", accessToken, photoController.put);

// DELETE	/post	게시글 삭제
router.delete("/", accessToken, photoController.delete);


module.exports = router;

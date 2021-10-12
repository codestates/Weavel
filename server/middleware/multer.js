const multer = require("multer");

var storage = multer.diskStorage({
  // 경로 설정 함수
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 경로 설정
  },
  // 이름 설정 함수
  filename: function (req, file, cb) {
    cb(null, file.originalname + "(" + new Date().toLocaleString() + ")");
    //cb 콜백함수를 통해 이름 설정
  },
  limits: { fileSize: 5 * 4 * 4 },
});

const upload = multer({ storage: storage });

module.exports = {
  upload: upload,
};

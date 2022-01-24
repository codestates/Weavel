const multer = require("multer");

const storage = multer.diskStorage({
  // 경로 설정 함수
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // cb 콜백함수를 통해 경로 설정
  },
  // 이름 설정 함수
  filename: function (req, file, cb) {
    cb(null, "(" + new Date().toLocaleString() + ")" + file.originalname);
    //cb 콜백함수를 통해 이름 설정
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      return cb(new Error(".png, .jpg .jpeg 만 가능합니다. "), false);
    }
  },
  limit: { fileSize: 5 * 1024 * 1024 },
});

const upload = multer({ storage: storage });

module.exports = {
  upload: upload,
};

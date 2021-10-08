// const multer = require("multer");

// module.exports = {
//     photo: async (req, res, next) => {

//     var storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, "uploads/");
//       },
//       filename: function (req, file, cb) {
//         cb(null, file.originalname); // cb 콜백함수를 통해 전송된 파일 이름 설정
//       },
//     });
//     var upload = multer({ storage: storage });

//     upload.single("image");
//     next();
//   },
// };

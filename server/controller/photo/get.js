const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const id = req.query.id;
    // 로그인된 아이디 정보 찾기

    const image = await photo.findOne({ where: { id: id, userId: userId } });

    fs.readFile(image.image, function (err, data) {
      if (err) {
        throw err;
      }
      return res.status(200).end(data); // send로 보내면 파일자체를 보내게 됨
    });
  } catch (err) {
    console.log("err");
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

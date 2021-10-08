const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  const id = "2";

  // 로그인된 아이디 정보 찾기
  const info = await photo.findOne({
    where: { id: id },
  });
  const image = info.image;

  if (!image) {
    return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
  }

  fs.readFile(image);

  res.status(200).json({ data: image });
};

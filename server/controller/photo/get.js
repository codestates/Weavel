const photoDB = require("../../data/photo");
var fs = require("fs");

async function getPhoto(req, res) {
  try {
    const photoId = req.query.id;
    const userId = req.userId;
    const findPhoto = await photoDB.findPhoto(photoId, userId);

    if (!findPhoto) {
      return res.status(404).json({ message: "해당 사진을 찾을 수 없습니다." });
    }

    const photoPath = findPhoto.image;
    fs.readFile(photoPath, function (err, data) {
      if (err) {
        console.log("err", err);
        return res.status(404).json({ message: "사진을 읽을수가 없습니다." });
      }
      return res.status(200).end(data); // send로 보내면 파일자체를 보내게 됨
    });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  getPhoto,
};

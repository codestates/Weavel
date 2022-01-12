const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  try {
    const photoId = req.query.id;
    const userId = req.userId;
    const findImage = await photo.findOne({
      where: { id: photoId, userId: userId },
    });

    function readIamge(findImage) {
      fs.readFile(findImage.image, function (err, data) {
        if (err) {
          console.log("err", err);
          return res
            .status(404)
            .json({ message: "해당 사진을 찾을 수 없습니다." });
        }
        return res.status(200).end(data); // send로 보내면 파일자체를 보내게 됨
      });
    }

    readIamge(findImage);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

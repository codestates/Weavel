const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, weather, date, area, filename } = req.body;

    const findImagePath = await photo.findOne({
      where: {
        id: id,
        userId: userId,
        weather: weather,
        date: date,
        area: area,
        filename: filename,
      },
    });

    function checkImagePath(findImagePath) {
      if (!findImagePath) {
        return res
          .status(409)
          .json({ massage: "삭제 되었거나, 존재하지않는 정보입니다." });
      }
    }

    function deleteImageFile(findImagePath) {
      if (fs.existsSync(findImagePath.image)) {
        // 파일 삭제 = 파일이 존재한다면 true 그렇지 않은 경우 false 반환
        fs.unlinkSync(findImagePath.image); // unlinkSync 파일 삭제
      } else {
        return res
          .status(409)
          .json({ massage: "삭제 되었거나, 존재하지 않는 파일입니다." });
      }
    }

    checkImagePath(findImagePath);
    deleteImageFile(findImagePath);

    const deleteImageInfo = await photo.destroy({
      where: {
        id: id,
        userId: userId,
        weather: weather,
        date: date,
        area: area,
        filename: filename,
      },
    });

    function checkDeleteImageInfo(deleteImageInfo) {
      if (!deleteImageInfo) {
        return res.status(404).json({ massage: "이미 삭제된 정보입니다." });
      }
      return res.status(200).json({ massage: "삭제되었습니다." });
    }

    checkDeleteImageInfo(deleteImageInfo);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

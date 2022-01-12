const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    //! 기존 이미지 이름이 같아야 수정(fileName)
    // 이미지 정보를 먼저 수정하고 이미지 파일을 업데이트
    const userId = req.userId;
    const { id, weather, date, area, comment, filename } = req.body;

    const newImageInfoUpdate = await photo.update(
      {
        weather: weather,
        date: date,
        area: area,
        comment: comment,
        updatedAt: new Date(),
      },
      { where: { id: id, userId: userId, filename: filename } },
    );

    function checkNewImageInfo(newImageInfoUpdate) {
      if (!newImageInfoUpdate) {
        return res
          .status(404)
          .json({ message: "수정하려는 사진정보를 찾지 못하였습니다." });
      }
      return res.status(201).json({ message: "사진정보가 수정 되었습니다." });
    }

    checkNewImageInfo(newImageInfoUpdate);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

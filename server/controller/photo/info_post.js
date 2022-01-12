const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, weather, date, area, comment, filename } = req.body;

    // 사진이 저장된 칼럼부분을 찾아 사진정보를 저장
    const savePhotoInfo = await photo.update(
      {
        userId: userId,
        weather: weather,
        date: date,
        area: area,
        comment: comment,
      },
      { where: { id: id, filename: filename } },
    );

    function failToSavePhotoInfo(savePhotoInfo) {
      if (savePhotoInfo[0] === 0) {
        return res
          .status(404)
          .json({ message: "저장된 사진을 찾을 수 없습니다." });
      }
      successToSavePhotoInfo();
    }

    function successToSavePhotoInfo() {
      return res
        .status(200)
        .json({ message: "사진정보가 저장완료 되었습니다." });
    }

    failToSavePhotoInfo(savePhotoInfo);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

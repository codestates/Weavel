const photoDB = require("../../data/photo");

async function postPhotoInfo(req, res) {
  try {
    const userId = req.userId;
    const { id: photoId, weather, date, area, comment, filename } = req.body;

    const saveInfoByPhoto = await photoDB.createPhotoInfo(
      userId,
      weather,
      date,
      area,
      comment,
      photoId,
      filename,
    );

    if (!saveInfoByPhoto[0]) {
      return res
        .status(404)
        .json({ message: "저장된 사진을 찾을 수 없습니다." });
    }

    return res.status(200).json({ message: "사진정보가 저장완료 되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  postPhotoInfo,
};

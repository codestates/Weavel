const photoDB = require("../../data/photo");

async function putPhotoInfo(req, res) {
  try {
    //! 기존 이미지 이름이 같아야 수정(fileName)
    const userId = req.userId;
    const { id: photoId, weather, date, area, comment, filename } = req.body;

    const findPhoto = await photoDB.findPhoto(photoId, userId);
    if (!findPhoto) {
      return res.status(404).json({ message: "해당 사진을 찾을 수 없습니다." });
    }

    const newImageInfoUpdate = await photoDB.putPhotoInfo(
      weather,
      date,
      area,
      comment,
      photoId,
      userId,
      filename,
    );

    if (!newImageInfoUpdate) {
      return res
        .status(404)
        .json({ message: "수정하려는 사진정보를 찾지 못하였습니다." });
    }
    return res.status(201).json({ message: "사진정보가 수정 되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  putPhotoInfo,
};

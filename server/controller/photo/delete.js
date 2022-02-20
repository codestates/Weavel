const photoDB = require("../../data/photo");
let fs = require("fs");

async function deleteExistsPhoto(photoPath) {
  const existsPhoto = fs.existsSync(photoPath);
  if (existsPhoto) {
    fs.unlinkSync(photoPath);
    return true;
  }
  return false;
}

async function deletePhotoWithInfo(req, res) {
  try {
    const userId = req.userId;
    const { id: photoId, weather, date, area, filename } = req.body;

    const findPhoto = await photoDB.findPhoto(photoId, userId);
    if (!findPhoto) {
      return res
        .status(409)
        .json({ massage: "삭제 되었거나, 존재하지않는 이미지입니다." });
    }

    const findPhotoPath = findPhoto.image;
    const deletePhotoResult = await deleteExistsPhoto(findPhotoPath);
    const deleteImageInfo = await photoDB.deletePhotoInfo(
      photoId,
      userId,
      weather,
      date,
      area,
      filename,
    );

    if (!deletePhotoResult) {
      return res.status(404).json({
        massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
      });
    }

    if (!deleteImageInfo) {
      return res.status(404).json({ massage: "이미 삭제된 이미지정보입니다." });
    }

    return res.status(200).json({ massage: "이미지가 삭제되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  deleteExistsPhoto,
  deletePhotoWithInfo,
};

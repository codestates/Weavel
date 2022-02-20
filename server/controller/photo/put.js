const photoDB = require("../../data/photo");
const deletePhoto = require("./delete");
let fs = require("fs");

async function put(req, res) {
  try {
    // 기존 파일경로 삭제 후 새로운 파일경로 업데이트
    const userId = req.userId;
    const newImagePath = req.file.path;
    const newImageName = req.file.originalname;
    const photoId = req.query.id;

    const oldPhoto = await photoDB.findPhoto(photoId, userId);
    if (!oldPhoto) {
      return res.status(404).json({
        massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
      });
    }

    const oldPhotoPath = oldPhoto.image;
    const deletePhotoResult = await deletePhoto.deleteExistsPhoto(oldPhotoPath);
    if (!deletePhotoResult) {
      return res.status(404).json({
        massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
      });
    }

    const updateImagePath = await photoDB.putPhotoPath(
      newImagePath,
      newImageName,
      photoId,
      userId,
    );
    if (!updateImagePath) {
      return res
        .status(409)
        .json({ massage: "이미지가 새로 업데이트 되지 않았습니다." });
    }

    return res.status(201).json({ massage: "이미지가 수정되었습니다." });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  put,
};

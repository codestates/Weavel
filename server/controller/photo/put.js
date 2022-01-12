const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  try {
    // 기존 파일경로 삭제 후 새로운 파일경로 업데이트
    const userId = req.userId;
    const newImagePath = req.file.path;
    const newImageName = req.file.originalname;
    const id = req.query.id;

    const oldImagePath = await photo.findOne({
      where: { id: id, userId: userId },
    });

    function checkOldImagePath(oldImagePath) {
      if (!oldImagePath) {
        return res.status(409).json({
          massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
        });
      }
    }

    function deleteOldImage(oldImagePath) {
      if (fs.existsSync(oldImagePath.image)) {
        fs.unlinkSync(oldImagePath.image); // unlinkSync(파일 삭제)
      } else {
        return res.status(409).json({
          massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
        });
      }
    }

    checkOldImagePath(oldImagePath);
    deleteOldImage(oldImagePath);

    const updateImagePath = await photo.update(
      { image: newImagePath, filename: newImageName },
      { where: { id: id, userId: userId } },
    );

    function checkUpdateImage(updateImagePath) {
      if (!updateImagePath) {
        return res
          .status(409)
          .json({ massage: "이미지가 새로 업데이트 되지 않았습니다." });
      }
      return res.status(201).json({ massage: "이미지가 수정되었습니다." });
    }

    checkUpdateImage(updateImagePath);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

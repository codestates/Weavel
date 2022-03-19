let fs = require("fs");

class photoController {
  constructor(photoDB) {
    this.photo = photoDB;
  }

  postPhoto = async (req, res) => {
    if (!req.file) {
      return res.status(404).json({ message: "사진파일이 존재하지 않습니다." });
    }

    const photoPath = req.file.path;
    const photoFilename = req.file.originalname;
    const userId = req.userId;

    const savePhoto = await this.photo.createPhoto(
      userId,
      photoPath,
      photoFilename
    );
    const photoId = savePhoto.id;

    if (!savePhoto) {
      return res.status(500).json({ message: "사진을 저장하지 못하였습니다." });
    }

    return res.status(200).json({
      data: { id: photoId, filename: photoFilename, photoPath: photoPath },
      message: "사진이 저장 완료 되었습니다.",
    });
  };

  postPhotoInfo = async (req, res) => {
    const userId = req.userId;
    const { id: photoId, weather, date, area, comment, filename } = req.body;

    const saveInfoByPhoto = await this.photo.createPhotoInfo(
      userId,
      weather,
      date,
      area,
      comment,
      photoId,
      filename
    );

    if (!saveInfoByPhoto[0]) {
      return res
        .status(404)
        .json({ message: "저장된 사진을 찾을 수 없습니다." });
    }

    return res.status(200).json({ message: "사진정보가 저장완료 되었습니다." });
  };

  put = async (req, res) => {
    // 기존 파일경로 삭제 후 새로운 파일경로 업데이트
    const userId = req.userId;
    const newImagePath = req.file.path;
    const newImageName = req.file.originalname;
    const photoId = req.query.id;

    const oldPhoto = await this.photo.findPhoto(photoId, userId);
    if (!oldPhoto) {
      return res.status(404).json({
        massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
      });
    }

    const oldPhotoPath = oldPhoto.image;
    const deletePhotoResult = await deleteExistsPhoto(oldPhotoPath);
    if (!deletePhotoResult) {
      return res.status(404).json({
        massage: "이미 삭제 되었거나, 존재하지 않는 이미지 파일 입니다.",
      });
    }

    const updateImagePath = await this.photo.putPhotoPath(
      newImagePath,
      newImageName,
      photoId,
      userId
    );
    if (!updateImagePath) {
      return res
        .status(409)
        .json({ massage: "이미지가 새로 업데이트 되지 않았습니다." });
    }

    return res.status(201).json({
      data: { id: photoId, filename: newImageName, photoPath: newImagePath },
      massage: "이미지가 수정되었습니다.",
    });
  };

  patch_info = async (req, res) => {
    //! 기존 이미지 이름이 같아야 수정(fileName)
    const userId = req.userId;
    const { id: photoId, weather, date, area, comment, filename } = req.body;

    const findPhoto = await this.photo.findPhoto(photoId, userId);
    if (!findPhoto) {
      return res.status(404).json({ message: "해당 사진을 찾을 수 없습니다." });
    }

    const newImageInfoUpdate = await this.photo.putPhotoInfo(
      weather,
      date,
      area,
      comment,
      photoId,
      userId,
      filename
    );

    if (!newImageInfoUpdate) {
      return res
        .status(404)
        .json({ message: "수정하려는 사진정보를 찾지 못하였습니다." });
    }
    return res.status(201).json({ message: "사진정보가 수정 되었습니다." });
  };

  getPhoto = async (req, res) => {
    const photoId = req.query.id;
    const userId = req.userId;
    const findPhoto = await this.photo.findPhoto(photoId, userId);

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
  };

  getPhotoInfo = async (req, res) => {
    const userId = req.userId;
    const imageInfo = await this.photo.findAllPhotoInfo(userId);

    if (!imageInfo) {
      return res.status(404).json({
        message: "유저의 이미지정보가 존재하지 않거나 조회되지 않습니다",
      });
    }

    return res.status(200).json(imageInfo);
  };

  deletePhotoWithInfo = async (req, res) => {
    const userId = req.userId;
    const { id: photoId, weather, date, area, filename } = req.body;

    const findPhoto = await this.photo.findPhoto(photoId, userId);
    if (!findPhoto) {
      return res
        .status(409)
        .json({ massage: "삭제 되었거나, 존재하지않는 이미지입니다." });
    }

    const findPhotoPath = findPhoto.image;
    const deletePhotoResult = await deleteExistsPhoto(findPhotoPath);
    const deleteImageInfo = await this.photo.deletePhotoInfo(
      photoId,
      userId,
      weather,
      date,
      area,
      filename
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
  };
}

async function deleteExistsPhoto(photoPath) {
  const existsPhoto = fs.existsSync(photoPath);
  if (existsPhoto) {
    fs.unlinkSync(photoPath);
    return true;
  }
  return false;
}

module.exports = {
  photoController,
};

// ("폼에 정의된 필드명 : ", fieldname);
// ("사용자가 업로드한 파일 명 : ", originalname);
// ("파일의 엔코딩 타입 : ", encoding);
// ("파일의 Mime 타입 : ", mimetype);
// ("파일이 저장된 폴더 : ", destination);
// ("destinatin에 저장된 파일 명 : ", filename);
// ("업로드된 파일의 전체 경로 ", path);
// ("파일의 바이트(byte 사이즈)", size);

const photoDB = require("../../data/photo");

async function postPhoto(req, res) {
  try {
    if (!req.file) {
      return res.status(404).json({ message: "사진파일이 존재하지 않습니다." });
    }

    const photoPath = req.file.path;
    const photoFilename = req.file.originalname;
    const userId = req.userId;

    const savePhoto = await photoDB.createPhoto(
      userId,
      photoPath,
      photoFilename,
    );
    const photoId = savePhoto.id;

    if (!savePhoto) {
      return res.status(500).json({ message: "사진을 저장하지 못하였습니다." });
    }

    return res.status(200).json({
      data: { id: photoId, filename: photoFilename },
      message: "사진이 저장 완료 되었습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  postPhoto,
};

// ("폼에 정의된 필드명 : ", fieldname);
// ("사용자가 업로드한 파일 명 : ", originalname);
// ("파일의 엔코딩 타입 : ", encoding);
// ("파일의 Mime 타입 : ", mimetype);
// ("파일이 저장된 폴더 : ", destination);
// ("destinatin에 저장된 파일 명 : ", filename);
// ("업로드된 파일의 전체 경로 ", path);
// ("파일의 바이트(byte 사이즈)", size);

const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", req.file);
    const path = req.file.path;
    const filename = req.file.originalname;
    const userId = req.userId;

    // 사진저장
    const where = await photo.create({
      userId: userId,
      image: path,
      filename: filename,
    });
    const id = where.id;

    if (!where) {
      return res.status(409).json({ message: "사진을 저장하지 못하였습니다." });
    }
    return res.status(200).json({
      data: { id: id, filename: filename },
      message: "사진이 저장 완료 되었습니다.",
    });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

// ("폼에 정의된 필드명 : ", fieldname);
// ("사용자가 업로드한 파일 명 : ", originalname);
// ("파일의 엔코딩 타입 : ", encoding);
// ("파일의 Mime 타입 : ", mimetype);
// ("파일이 저장된 폴더 : ", destination);
// ("destinatin에 저장된 파일 명 : ", filename);
// ("업로드된 파일의 전체 경로 ", path);
// ("파일의 바이트(byte 사이즈)", size);

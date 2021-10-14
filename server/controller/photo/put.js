const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const newpath = req.file.path;
    const newfilename = req.file.originalname;
    const id = req.query.id;

    // 사진 id 데이터가 없을때 결과값
    if (!id) {
      return res.status(409).json({ massage: "지우려는 사진 id를 입력하세요" });
    }

    // 업데이트하려는 정보 칼럼을 조회하지 못하였을 때
    const path = await photo.findOne({ where: { id: id, userId: userId } });
    if (!path) {
      return res.status(409).json({ massage: "이미 삭제 되었거나, 존재하지않는 정보입니다." });
    }

    // 파일 삭제 = 파일이 존재한다면 true 그렇지 않은 경우 false 반환
    if (fs.existsSync(path.image)) {
      fs.unlinkSync(path.image); // unlinkSync 파일 삭제
    } else {
      return res.status(409).json({ massage: "이미 삭제 되었거나, 존재하지 않는 파일입니다." });
    }

    // 사진 변경
    const update = await photo.update({ image: newpath, filename: newfilename }, { where: { id: id, userId: userId } });
    if (!update) {
      return res.status(409).json({ massage: "사진의 데이터가 저장되지 않았습니다." });
    }

    return res.status(201).json({ massage: "사진이 수정되었습니다." });
  } catch (err) {
    console.log("err");
  }
};

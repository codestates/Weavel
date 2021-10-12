const { photo } = require("../../models");
var fs = require("fs");

module.exports = async (req, res) => {
  const userId = req.userId;
  const { id, weather, date, area, filename } = req.body;

  // 각 필요한 데이터가 없을때 결과값
  if (!id) {
    res.status(409).json({ message: "지우려는 사진 id 정보가 없습니다." });
  } else if (!weather) {
    res.status(409).json({ message: "지우려는 날씨 정보가 없습니다." });
  } else if (!date) {
    res.status(409).json({ message: "지우려는 날짜 정보가 없습니다." });
  } else if (!area) {
    res.status(409).json({ message: "지우려는 지역 정보가 없습니다." });
  } else if (!filename) {
    res.status(409).json({ message: "지우려는 사진파일 이름 정보가 없습니다." });
  }

  // DB 데이터 검색
  const path = await photo.findOne({ where: { id: id, userId: userId, weather: weather, date: date, area: area, filename: filename } });
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", path);
  if (!path) {
    res.status(409).json({ massage: "삭제 되었거나, 존재하지않는 정보입니다." });
  }

  // 파일 삭제 = 파일이 존재한다면 true 그렇지 않은 경우 false 반환
  if (fs.existsSync(path.image)) {
    fs.unlinkSync(path.image); // unlinkSync 파일 삭제
  } else {
    res.status(409).json({ massage: "삭제 되었거나, 존재하지 않는 파일입니다." });
  }

  // 파일 정보 삭제
  const info = await photo.destroy({ where: { id: id, userId: userId, weather: weather, date: date, area: area, filename: filename } });
  console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", info);
  if (!info) {
    res.status(404).json({ massage: "이미 삭제된 정보입니다." });
  }

  res.status(200).json({ massage: "삭제되었습니다." });
};

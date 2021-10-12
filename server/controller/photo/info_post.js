const { photo } = require("../../models");

module.exports = async (req, res) => {
  const userId = req.userId;
  const { id, weather, date, area, comment, filename } = req.body;
  //filename 확장자명까지저장

  // 각 필요한 데이터가 없을때 결과값
  if (!id) {
    return res.status(409).json({ message: "사진 id 정보가 없습니다." });
  } else if (!weather) {
    return res.status(409).json({ message: "날씨 정보가 없습니다." });
  } else if (!date) {
    return res.status(409).json({ message: "날짜 정보가 없습니다." });
  } else if (!area) {
    return res.status(409).json({ message: "지역 정보가 없습니다." });
  } else if (!comment) {
    return res.status(409).json({ message: "comment가 없습니다." });
  } else if (!filename) {
    return res.status(409).json({ message: "filname이 없습니다." });
  }

  // 사진이 저장된 칼럼부분을 찾아 사진정보를 저장
  const info = await photo.update({ userId: userId, weather: weather, date: date, area: area, comment: comment }, { where: { id: id, filename: filename } });
  console.log("---------------------", info);
  if (info) {
    return res.status(404).json({ message: "저장된 사진을 찾을 수 없습니다." });
  }
  return res.status(200).json({ message: "사진정보가 저장완료 되었습니다." });
};

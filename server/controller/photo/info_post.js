const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, weather, date, area, filename } = req.body;
    //filename 확장자명까지저장

    // 각 필요한 데이터가 없을때 결과값
    if (!id) {
      res.status(409).json({ message: "사진 id 정보가 없습니다." });
    } else if (!weather) {
      res.status(409).json({ message: "날씨 정보가 없습니다." });
    } else if (!date) {
      res.status(409).json({ message: "날짜 정보가 없습니다." });
    } else if (!area) {
      res.status(409).json({ message: "지역 정보가 없습니다." });
    } else if (!filename) {
      res.status(409).json({ message: "사진파일 이름 정보가 없습니다." });
    }

    // 사진이 저장된 칼럼부분을 찾아 사진정보를 저장
    await photo.update({ userId: userId, weather: weather, date: date, area: area }, { where: { id: id, filename: filename } });

    return res.status(200).json({ message: "사진정보 저장완료 되었습니다." });
  } catch (err) {
    console.log("err");
  }
};

const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const { id, weather, date, area, comment, filename } = req.body;

    // 각 필요한 데이터가 없을때 결과값
    if (!id) {
      res.status(409).json({ message: "사진 id 정보가 없습니다." });
    } else if (!weather) {
      return res.status(409).json({ message: "날씨 정보가 없습니다." });
    } else if (!date) {
      return res.status(409).json({ message: "날짜 정보가 없습니다." });
    } else if (!area) {
      return res.status(409).json({ message: "지역 정보가 없습니다." });
    } else if (!comment) {
      return res.status(409).json({ message: "comment가 없습니다." });
    } else if (!filename) {
      return res
        .status(409)
        .json({ message: "사진파일 이름 정보가 없습니다." });
    }

    //!파일네임이 같아야 수정될 수 있도록 해야함
    const edit = await photo.update(
      {
        weather: weather,
        date: date,
        area: area,
        comment: comment,
        updatedAt: new Date(),
      },
      { where: { id: id, userId: userId, filename: filename } },
    );

    // 업데이트하려는 정보 칼럼을 조회하지 못하였을 때
    if (!edit) {
      return res
        .status(404)
        .json({ message: "수정하려는 사진정보를 찾지 못하였습니다." });
    }
    return res.status(201).json({ message: "사진정보가 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

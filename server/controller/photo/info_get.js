const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;

    // 로그인된 아이디 정보 찾기
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", userId);
    const info = await photo.findAll({ where: { userId: userId } });
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", info);

    // 유저사진정보 조회가 되지 않을시
    if (!info) {
      return res.status(409).json({ message: "유저의 이미지 정보가 조회되지 않습니다" });
    }
    // 유저사진정보 조회성공
    else {
      return res.status(200).json(info);
    }
  } catch (err) {
    console.log("err");
  }
};

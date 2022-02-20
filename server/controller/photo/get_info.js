const photoDB = require("../../data/photo");

async function getPhotoInfo(req, res) {
  try {
    const userId = req.userId;
    const imageInfo = await photoDB.findAllPhotoInfo(userId);

    if (!imageInfo) {
      return res.status(404).json({
        message: "유저의 이미지정보가 존재하지 않거나 조회되지 않습니다",
      });
    }

    return res.status(200).json(imageInfo);
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러 입니다." });
  }
}

module.exports = {
  getPhotoInfo,
};

const { photo } = require("../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.userId;
    const imageInfo = await photo.findAll({ where: { userId: userId } });

    function provideImageInfo(imageInfo) {
      if (!imageInfo) {
        return res
          .status(409)
          .json({
            message: "유저의 이미지정보가 존재하지 않거나 조회되지 않습니다",
          });
      } else {
        return res.status(200).json(imageInfo);
      }
    }

    provideImageInfo(imageInfo);
  } catch (err) {
    console.log("err", err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

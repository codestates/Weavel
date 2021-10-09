const { user } = require("../../models");
const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  try {
    const header = req.headers;
    if (!header) {
      res.status(400).json({ message: "잘못된 요청입니다." });
    } else {
      const id = req.userId;
      await user_weather.destroy({ where: { userId: id } });
      await user.destroy({ where: { id: id } });
      res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(501).json({ message: "잘못된 요청입니다." });
  }
};

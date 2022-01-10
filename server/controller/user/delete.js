const { user } = require("../../models");
const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  try {
    function headerErorr() {
      const header = req.headers;
      if (!header) {
        return res.status(403).json({ message: "잘못된 요청입니다." });
      }
    }

    async function deleteUser() {
      const userId = req.userId;
      await user_weather.destroy({ where: { userId: userId } });
      await user.destroy({ where: { id: userId } });
      return res.status(200).json({ message: "회원탈퇴가 완료 되었습니다." });
    }

    headerErorr();
    deleteUser();
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

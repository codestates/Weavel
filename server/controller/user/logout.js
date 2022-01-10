const { user } = require("../../models");

module.exports = async (req, res) => {
  try {
    function clearToken() {
      return res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "로그아웃 되었습니다." });
    }
    clearToken();
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

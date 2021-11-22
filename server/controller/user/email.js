const { user } = require("../../models");

module.exports = async (req, res) => {
  try {
    const email = req.query.email;

    // 로그인된 아이디 정보 찾기
    const result = await user.findOne({ where: { email: email } });

    // email 중복코드
    if (result) {
      return res.status(200).json({ message: `이메일이 중복됩니다.` });
    }
    return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

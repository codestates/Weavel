const { user } = require("../../models");

module.exports = async (req, res) => {
  const email = req.query.email;
  // 로그인된 아이디 정보 찾기
  const result = await user.findOne({ where: { email: email } });
  console.log("------------------------------", email);

  // 닉네임, 이메일 각각 중복되었을 때 출력 코드
  if (result) {
    return res.status(200).json({ message: `이메일이 중복됩니다.` });
  }

  res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
};

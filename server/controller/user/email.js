const { user } = require("../../models");

module.exports = async (req, res) => {
  try {
    const email = req.query.email;

    async function emailConfirmation(email) {
      const result = await user.findOne({ where: { email: email } });
      if (result) {
        return res.status(200).json({ message: `이메일이 중복됩니다.` });
      }

      return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
    }

    emailConfirmation(email);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

const userDB = require("../../data/user");

async function resultUserByEmail(email) {
  const searchEmail = await userDB.findUserByEmail(email);
  return searchEmail ? searchEmail : false;
}

async function checkEmail(req, res) {
  try {
    const email = req.query.email;
    const useEmail = await resultUserByEmail(email);

    if (useEmail) {
      return res.status(200).json({ message: `이메일이 중복됩니다.` });
    }

    return res.status(200).json({ message: `이메일이 중복되지 않습니다.` });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  resultUserByEmail,
  checkEmail,
};

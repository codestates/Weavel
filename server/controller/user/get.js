const userDB = require("../../data/user");

async function resultUserById(id) {
  const searchUserId = await userDB.findUserById(id);
  return searchUserId ? searchUserId : false;
}

async function get(req, res) {
  try {
    const userId = req.userId;
    const findUser = resultUserById(userId);

    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    }

    const findUserInfo = await userDB.findUserInfo(userId);
    const { id, email, name, user_weathers } = findUserInfo[0].dataValues;
    const weatherDB = user_weathers.map((el) => {
      return el.dataValues.weatherId - 1;
    });

    const result = { id, email, name, weatherDB };

    return res.status(200).json({ data: result });
  } catch (err) {
    console.log("err", err);
    return res.status(500).json({ message: "서버 에러입니다." });
  }
}

module.exports = {
  resultUserById,
  get,
};

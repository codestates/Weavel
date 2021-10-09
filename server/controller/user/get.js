const { user } = require("../../models");
const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  // dataValue를 볼 수 있는 코드
  // const result = userInfo.get({ plain: true });
  try {
    const id = req.userId;
    const findUser = await user.findOne({
      where: { id: id },
    });

    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    } else {
      const userInfo = await user.findAll({
        where: { id: id },
        attributes: ["id", "email", "name"],
        include: [
          {
            model: user_weather,
            required: false,
            attributes: ["weatherId"],
          },
        ],
      });

      res.status(200).json({ data: userInfo[0] });
    }
  } catch (err) {
    console.log("err");
  }
};

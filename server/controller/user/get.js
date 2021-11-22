const { user } = require("../../models");
const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  try {
    const findUser = await user.findOne({
      where: { id: req.userId },
    });

    if (!findUser) {
      return res.status(404).json({ message: "해당 유저를 찾을 수 없습니다." });
    } else {
      const userInfo = await user.findAll({
        where: { id: req.userId },
        attributes: ["id", "email", "name"],
        include: [
          {
            model: user_weather,
            required: false,
            attributes: ["weatherId"],
          },
        ],
      });
      const { id, email, name, user_weathers } = userInfo[0].dataValues;

      const weather = [];
      user_weathers.map((el) => weather.push(el.dataValues.weatherId - 1));
      const data = { id, email, name, weather };
      res.status(200).json({ data: data });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

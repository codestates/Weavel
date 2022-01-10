const { user } = require("../../models");
const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  try {
    async function userConfirmation() {
      const userId = req.userId;
      const findUser = await user.findOne({
        where: { id: userId },
      });
      if (!findUser) {
        return res
          .status(404)
          .json({ message: "해당 유저를 찾을 수 없습니다." });
      }
    }

    const findUserInfo = await user.findAll({
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
    const { id, email, name, user_weathers } = findUserInfo[0].dataValues;

    function changeWeatherCode(id, email, name, user_weathers) {
      const weather = [];
      user_weathers.map((el) => weather.push(el.dataValues.weatherId - 1));

      const result = { id, email, name, weather };
      return res.status(200).json({ data: result });
    }

    userConfirmation();
    changeWeatherCode(id, email, name, user_weathers);
  } catch (err) {
    console.log("err", err);
    return res.status(400).json({ message: "서버 에러입니다." });
  }
};

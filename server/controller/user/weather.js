const { user_weather } = require("../../models");

module.exports = async (req, res) => {
  try {
    const header = req.headers;
    if (!header) {
      return res.status(403).json({ message: "잘못된 요청입니다." });
    } else {
      const a = await user_weather.count({
        where: { weatherId: 1 },
      });
      const b = await user_weather.count({
        where: { weatherId: 2 },
      });
      const c = await user_weather.count({
        where: { weatherId: 3 },
      });
      const d = await user_weather.count({
        where: { weatherId: 4 },
      });

      const data = { 0: a, 1: b, 2: c, 3: d };

      return res.status(200).json({ data: data });
    }
  } catch (err) {
    console.log(err);
    return res.status(501).json({ message: "서버 에러 입니다." });
  }
};

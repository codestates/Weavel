const { user } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  accessToken: async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("token===============", req.headers);
    if (!authHeader) {
      res.status(400).json({ data: null, message: "access token이 유효하지 않습니다." });
    } else {
      const token = authHeader.split(" ")[1];
      const data = jwt.verify(token, process.env.ACCESS_SECRET);

      const userInfo = await user.findOne({
        where: { id: data.id },
      });
      console.log("userInfo===============", userInfo);
      if (!userInfo) {
        res.status(401).json({ data: null, message: "access token 일치하는 유저가 없습니다." });
      } else {
        //console.log(userInfo.dataValues);
        // delete userInfo.dataValues.password;
        // res.status(200).json({ data: { userInfo: userInfo.dataValues }, message: "ok" });
        req.userId = userInfo.dataValues.id; // req.customData
        next();
      }
    }
  },
};

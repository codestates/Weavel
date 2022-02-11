const { user } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  accessToken: async (req, res, next) => {
    class errorMessage {
      constructor(phrase) {
        this.phrase = phrase;
      }
      respond() {
        return res.status(401).json({
          data: null,
          message: `access token ${this.phrase} 않습니다.`,
        });
      }
    }

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return new errorMessage("존재하지").respond();
    }

    const AccessToken = authHeader.split(" ")[1];
    jwt.verify(AccessToken, process.env.ACCESS_SECRET, async (err, decode) => {
      if (err) {
        return new errorMessage("유효하지").respond();
      }
      const findUser = await user.findOne({
        where: { id: decode.id },
      });
      if (!findUser) {
        return new errorMessage("일치하는 유저가 존재하지").respond();
      }
      req.userId = findUser.id;
      next();
    });
  },
};

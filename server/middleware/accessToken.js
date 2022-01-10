const { user } = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  accessToken: async (req, res, next) => {
    const authHeader = req.headers.authorization;

    class errorMessage {
      constructor(phrase) {
        this.phrase = phrase;
      }
      respond() {
        return res.status(400).json({
          data: null,
          message: `access token ${this.phrase} 않습니다.`,
        });
      }
    }

    function checkAccessToken(authHeader) {
      if (!authHeader) {
        new errorMessage("존재하지").respond();
      }
    }

    function tokenConfim(authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_SECRET, async (err, decode) => {
        if (err) {
          new errorMessage("유효하지").respond();
        }
        const Info = await user.findOne({
          where: { id: decode.id },
        });
        if (!Info) {
          new errorMessage("일치하는 유저가 존재하지").respond();
        }
        req.cookies.id = Info.id;
        next();
      });
    }

    checkAccessToken(authHeader);
    tokenConfim(authHeader);
  },
};

const userDB = require("../data/user");
const jwt = require("jsonwebtoken");

async function accessToken(req, res, next) {
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
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return new errorMessage("존재하지").respond();
  }

  const AccessToken = authHeader.split(" ")[1];
  jwt.verify(AccessToken, process.env.ACCESS_SECRET, async (err, decode) => {
    if (err) {
      return new errorMessage("유효하지").respond();
    }
    const user = await userDB.findUserById(decode.id);
    if (!user) {
      return new errorMessage("일치하는 유저가 존재하지").respond();
    }
    req.userId = user.id;
    next();
  });
}
module.exports = {
  accessToken,
};

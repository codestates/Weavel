const jwt = require("jsonwebtoken");

function createAccessToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
  const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: "1d",
  });

  return accessToken;
}

module.exports = {
  createAccessToken,
};

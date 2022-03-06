const crypto = require("crypto");

function checkUserPassword(user, password) {
  const dbPassword = user.password;
  const salt = user.salt;
  const hashedPassword = (
    crypto.pbkdf2Sync(password, salt, 9999, 64, "sha512") || ""
  ).toString("base64");

  return hashedPassword === dbPassword ? true : false;
}

function createCrypto(password) {
  const salt = (crypto.randomBytes(64) || "").toString("hex");
  const encryptedPassword = (
    crypto.pbkdf2Sync(password, salt, 9999, 64, "sha512") || ""
  ).toString("base64");

  return [salt, encryptedPassword];
}

module.exports = {
  checkUserPassword,
  createCrypto,
};

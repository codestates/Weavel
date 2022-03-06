const { user } = require("../models");
const { user_weather } = require("../models");

async function findUserById(id) {
  return user.findOne({
    where: { id: id },
  });
}

async function findUserByEmail(email) {
  return user.findOne({ where: { email: email } });
}

async function resultUserByEmail(email) {
  const searchEmail = await user.findOne({ where: { email: email } });
  return searchEmail ? searchEmail : false;
}

async function resultUserById(id) {
  const searchUserId = await user.findOne({
    where: { id: id },
  });
  return searchUserId ? searchUserId : false;
}

async function createUser(name, email, salt, password) {
  return user.create({
    name,
    email,
    salt,
    password,
  });
}

async function putUser(email, userId, salt, password) {
  return user.update(
    {
      email: email,
      salt: salt,
      password: password,
    },
    { where: { id: userId } },
  );
}

async function deleteUser(userId) {
  return user.destroy({ where: { id: userId } });
}

async function findUserInfo(userId) {
  return user.findAll({
    where: { id: userId },
    attributes: ["id", "email", "name"],
    include: [
      {
        model: user_weather,
        required: false,
        attributes: ["weatherId"],
      },
    ],
  });
}

module.exports = {
  findUserByEmail,
  findUserById,
  resultUserByEmail,
  resultUserById,
  createUser,
  putUser,
  deleteUser,
  findUserInfo,
};

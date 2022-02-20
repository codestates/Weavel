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

async function createUser(name, email, salt, password) {
  return user.create({
    name,
    email,
    salt,
    password,
  });
}

async function putUser(userId, salt, password) {
  return user.update(
    {
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
  createUser,
  putUser,
  deleteUser,
  findUserInfo,
};

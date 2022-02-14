const { user } = require("../models");

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

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  putUser,
};

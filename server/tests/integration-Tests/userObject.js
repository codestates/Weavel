const faker = require("faker");

async function createNewUserLogin(request) {
  const userDetails = makeValidUserDetails();
  await request.post("/user/signup", userDetails);

  const prepareUserResponse = await request.post("/user/login", {
    email: userDetails.email,
    password: userDetails.password,
  });

  return {
    ...userDetails,
    accessToken: prepareUserResponse.data.data.accessToken,
    id: prepareUserResponse.data.data.id,
  };
}

async function createNewUser(request) {
  const userDetails = makeValidUserDetails();
  await request.post("/user/signup", userDetails);
  return {
    ...userDetails,
  };
}

function makeValidUserDetails() {
  const fakeUser = faker.helpers.userCard();
  return {
    name: fakeUser.name,
    email: fakeUser.email,
    password: faker.internet.password(8, true),
    weather: [0, 1],
  };
}

module.exports = {
  createNewUserLogin,
  createNewUser,
  makeValidUserDetails,
};

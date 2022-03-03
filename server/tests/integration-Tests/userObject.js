const faker = require("faker");

async function createNewUserAccount(request) {
  const userDetails = makeValidUserDetails();
  const prepareUserResponse = await request.post("/user/signup", userDetails);
  return {
    ...userDetails,
    // accessToken: prepareUserResponse.data.accessToken,
    // id: prepareUserResponse.data.id,
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
  createNewUserAccount,
  makeValidUserDetails,
};

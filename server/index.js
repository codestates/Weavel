require("dotenv").config();
const app = require("./app.js");

const PORT = process.env.SERVER_PORT || 80;
const HOST = process.env.SERVER_HOST;

app.listen(PORT, () => {
  console.log(`Server Listening on ${PORT}`);
});

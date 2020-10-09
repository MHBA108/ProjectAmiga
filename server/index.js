require('dotenv').config()

const app = require("./app");

const apiPort = 8080;

const server = app.listen(apiPort, () =>
  console.log("Server running on port %s", apiPort)
);

module.exports = server;

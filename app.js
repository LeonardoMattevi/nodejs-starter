const config = require("config");
const port = process.env.PORT || 3000;

const debug = require("debug")("app:general"); // set DEBUG=app:* || set DEBUG=app:startup,app:db
//const dbDebugger = require('debug')('app:db');

const helmet = require("helmet");
// const Joi = require("joi");
const users = require("./routes/users");
const home = require("./routes/home");
const morgan = require("morgan");
const express = require("express");
const logger = require("./logger");
const authProvider = require("./authProvider");
const app = express();

console.log("process.env: " + JSON.stringify(process.env) + " :process.env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());
app.use("/api/users", users);
app.use("/", home);

app.use(logger);
app.use(authProvider);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  debug("Morgan enabled...");
}

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

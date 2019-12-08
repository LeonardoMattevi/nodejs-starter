const config = require("config");
const port = process.env.PORT || 3000;

const helmet = require("helmet");
require("express-async-errors");
const { errorLogger } = require('./middleware/logger');
const usersRoute = require("./routes/users");
const homeRoute = require("./routes/home");
const morgan = require("morgan");
const express = require("express");
const authProvider = require("./authProvider");
const app = express();

// console.log("process.env: " + JSON.stringify(process.env) + " :process.env");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(helmet());

app.use(authProvider);
app.use("/api/users", usersRoute);
app.use("/", homeRoute);

app.use(errorLogger);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

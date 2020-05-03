const config = require("config");
const port = process.env.PORT || 3000;

const helmet = require("helmet");
require("express-async-errors");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(express.static("public"));

require("./routes/index")(app);

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

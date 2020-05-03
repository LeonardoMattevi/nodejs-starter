const usersRoute = require("../routes/users");
const homeRoute = require("../routes/home");
const { errorMidLogger } = require('../middleware/midErrors');

module.exports = function (app) {
    app.use("/api/users", usersRoute);
    app.use("/", homeRoute);

    app.use(errorMidLogger);
}
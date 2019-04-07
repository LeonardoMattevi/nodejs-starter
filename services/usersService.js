
const dbContext = require("../store/dbContext");
mongoose = dbContext.getConnection();

function UsersService() {
  this.getUsers = async function () {
    return await dbContext.User.find()
      // .find({ price: { $gte: 10 } })
      // .find({ price: { $in: [10, 15, 20] } })
      // .or([ { price: { $in: [10, 15, 20] } }, { price: null } ])
      // .and([ { price: { $in: [10, 15, 20] } }, { price: null } ])
      // .find()
      .limit(10)
      .sort({ name: 1 })
      .select({ name: 1, tags: 1 });
  };
  this.getUser = async function (id) {
    return await dbContext.User.findOne({ _id: id });
  };
  this.createUser = async function (user) {
    let _user = new dbContext.User(user);
    return await _user.save();
  };
  this.updateUser = async function (id, user) {
    return await dbContext.User.updateOne({ _id: id }, user);
  };
  this.deleteUser = async function (id) {
    return await dbContext.User.deleteOne({ _id: id });
  };
}
module.exports = new UsersService();

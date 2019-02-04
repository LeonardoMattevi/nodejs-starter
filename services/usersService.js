// const mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/users')
//     .then(() => console.log('Connected to MongoDB'))
//     .catch((err) => console.error('Could not connect to MongoDB...', err));

const dbContext = require("../store/dbContext");
mongoose = dbContext.getConnection();

function UsersService() {
  this.GetUsers = async function () {
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
  this.GetUser = async function (id) {
    return await dbContext.User.findOne({ _id: id });
  };
  this.CreateUser = async function (user) {
    let _user = new dbContext.User(user);
    return await _user.save();
  };
  this.UpdateUser = async function (id, user) {
    return await dbContext.User.updateOne({ _id: id }, user);
  };
  this.DeleteUser = async function (id) {
    return await dbContext.User.deleteOne({ _id: id });
  };
  this.validateUser = function (user) {
    const userSchema = new dbContext.User({});

    userSchema.name = Joi.string().min(3).required();

    return Joi.validate(user, schema);
  }

}
module.exports = new UsersService();

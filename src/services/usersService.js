
const dbContext = require('../store/dbContext');

class UsersService {
  constructor() { }
  async getUsers() {
    return await dbContext.User.find()
      // .find({ price: { $gte: 10 } })
      // .find({ price: { $in: [10, 15, 20] } })
      // .or([ { price: { $in: [10, 15, 20] } }, { price: null } ])
      // .and([ { price: { $in: [10, 15, 20] } }, { price: null } ])
      // .find()
      // .sort({ name: 1 })
      // .select({ name: 1, tags: 1 })
      .limit(10);
  }
  async getUser(id) {
    return await dbContext.User.findOne({ _id: id });
  }
  async createUser(user) {
    user.creationDate = Date.now();
    const _user = new dbContext.User(user);

    return await _user.save();
  }
  async updateUser(id, user) {
    user.modificationDate = Date.now();
    return await dbContext.User.updateOne({ _id: id }, user);
  }
  async deleteUser(id) {
    return await dbContext.User.deleteOne({ _id: id });
  }
}
module.exports = new UsersService();

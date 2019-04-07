const mongoose = require("mongoose");
const connectionString = "mongodb://localhost/AuthProvider";

// schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
  creationDate: { type: Date, default: Date.now }
});
// model
exports.User = mongoose.model("User", userSchema);

exports.getConnection = function () {
  if (mongoose.connection.readyState) return mongoose;

  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB");
      return mongoose;
    })
    .catch(err => {
      console.error("Could not connect to MongoDB...", err);
      throw new Error("Could not connect to MongoDB...", err);
    });
};

exports.close = function () {
  mongoose.connection.close();
};

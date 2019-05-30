const mongoose = require("mongoose");
const connectionString = "mongodb://localhost/AuthProvider";
mongoose.connect(connectionString, {useNewUrlParser: true})
        .then(() => {
          console.log("Connected to MongoDB");
        })
        .catch(err => {
          console.error("Could not connect to MongoDB...", err);
          throw new Error("Could not connect to MongoDB...", err);
        });
// schema
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
  modificationDate: { type: Date, default: null },
  creationDate: { type: Date }
});
const _User = mongoose.model("User", userSchema);  
// model
exports.User = _User;
const mongoose = require("mongoose");
const config = require("config");

const connectionString = config.mongodbConnectionString || "mongodb://localhost/";
console.log(connectionString);
const dbName = 'AuthProvider';

// mongoose.connection.readyState:
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
db = mongoose.connection;
db.on('connecting', function() {
  console.log('connecting to MongoDB...');
});
db.on('error', function(error) {
  console.log('Error in MongoDb connection: ' + error);
});
db.on('connected', function() {
  console.log('MongoDB connected!');
});
db.once('open', function() {
  console.log('MongoDB connection opened!');
});
db.on('reconnected', function () {
  console.log('MongoDB reconnected!');
});
db.on('disconnected', function() {
  console.log('MongoDB disconnected!');
});

mongoose.connect(connectionString + dbName, {
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 5000, // Reconnect every 5000ms
  useNewUrlParser: true
});

// schemas
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  isActive: Boolean,
  modificationDate: { type: Date, default: null },
  creationDate: { type: Date }
});
const User = mongoose.model("User", userSchema, "users"); 
// model
module.exports = {
  User
};
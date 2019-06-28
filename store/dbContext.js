const mongoose = require("mongoose");
const dbName = 'AuthProvider';
const connectionString = "mongodb://localhost/";
let _User = null;
let db = null;

// mongoose.connection.readyState:
// 0: disconnected
// 1: connected
// 2: connecting
// 3: disconnecting
async function connect() {
  try {    
    if(mongoose.connection.readyState === 1)
        await mongoose.connection.close();

    await mongoose.connect(connectionString + dbName, {useNewUrlParser: true});
    console.log("Connected to Mongoose");
    
    createSchemas();
  } catch(err) {
    console.error("Could not connect to Mongoose...", err);
  };
}
function createSchemas() {
  // schema
  if(_User)
    return;

  db = mongoose.connection;
  db.on('connecting', function() {
    console.log('connecting to MongoDB...');
  });
  db.on('error', function(error) {
    console.error('Error in MongoDb connection: ' + error);
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

  const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    isActive: Boolean,
    modificationDate: { type: Date, default: null },
    creationDate: { type: Date }
  });
  _User = mongoose.model("User", userSchema); 
}
connect();
let canTryToReconnect = true;
module.exports = {
  get User() {
    if (_User && mongoose.connection.readyState === 1)
      return _User;
      

    // if the DB connection is down, it can try to reconnect 1 time only every 2 seconds
    if (canTryToReconnect) {
      canTryToReconnect = false;
      setTimeout(function() {
        connect();
        canTryToReconnect = true;
      }, 2000);
    }
    throw "the DB connection is closed.";
  }  
};

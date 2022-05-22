const mongoose = require("mongoose");
var crypto = require("crypto");

const userSchema = mongoose.Schema({
  //one type form

  // title:String,
  // description:String,
  // date:Date.now

  //Another type form
  userId: {
    type: Number,
    default: Date.now().toFixed(),
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: Number,
    required: true,
  },
  aadhaar: {
    type: Number,
    require: true,
  },
  hash: String,
  salt: String,
  role: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Method to set salt and hash the password for a user
userSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations,

  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check the entered password is correct or not
userSchema.methods.validPassword = function (password) {
  var hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

module.exports = mongoose.model("userInfo", userSchema);

const mongoose = require("mongoose");

const User = mongoose.connect("User", {
  email: String,
  token: String,
  salt: String,
  hash: String,
  account: {
    username: String
  }
});

module.exports = User;

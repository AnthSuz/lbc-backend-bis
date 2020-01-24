const mongoose = require("mongoose");

const User = mongoose.model("User", {
  token: String,
  salt: String,
  hash: String,
  account: {
    username: String,
    email: String
  }
});

module.exports = User;

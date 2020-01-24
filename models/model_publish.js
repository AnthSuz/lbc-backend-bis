const mongoose = require("mongoose");

const Publish = mongoose.model("Publish", {
  title: String,
  description: String,
  price: Number,
  created: { type: Date, default: Date.now },
  pictures: [],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "model_user"
  }
});

module.exports = Publish;

const express = require("express");
const mongoose = require("mongoose");
const formidableMiddleware = require("express-formidable");

mongoose.connect("mongodb://localhost/lbc-backend-bis", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.use(formidableMiddleware());

require("./models/model_user");

const signup = require("./roads/road_signup");
app.use(signup);

app.listen(4000, () => {
  console.log("Server is listening");
});

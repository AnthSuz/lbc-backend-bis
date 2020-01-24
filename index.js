const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const formidableMiddleware = require("express-formidable");

mongoose.connect("mongodb://localhost/lbc-backend-bis", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

cloudinary.config({
  cloud_name: "drprhgcfr",
  api_key: "918727367336567",
  api_secret: "LOM5gKyc_Zg2WUOQ2DOv5p8QX68"
});

const app = express();

app.use(formidableMiddleware());

require("./models/model_user");
require("./models/model_publish");

const signup = require("./roads/road_signup");
app.use(signup);

const login = require("./roads/road_login");
app.use(login);

const publish = require("./roads/road_publish");
app.use(publish);

app.listen(8000, () => {
  console.log("Server is listening");
});

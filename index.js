const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/lbc-backend-bis", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.get("/", (req, res) => {
  res.send("API is waiting for requests");
});

app.listen(8000, () => {
  console.log("Server is listening");
});

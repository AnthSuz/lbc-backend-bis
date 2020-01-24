const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const UserCreated = require("../models/model_user");
const publishCreated = require("../models/model_publish");

router.post("/user/login", async (req, res) => {
  try {
    const user = await UserCreated.findOne({ email: req.fields.email });
    if (user) {
      if (
        SHA256(req.fields.password + user.salt).toString(encBase64) ===
        user.hash
      ) {
        return res.json({
          _id: user._id,
          token: user.token,
          account: user.account
        });
      } else {
        res.json({
          message: "Mot de passe incorrect"
        });
      }
    } else {
      res.json({
        message: "Utilisateur inexistant"
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

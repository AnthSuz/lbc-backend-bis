const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const UserCreated = require("../models/model_user");
const publishCreated = require("../models/model_publish");

router.post("/user/sign_up", async (req, res) => {
  const token = uid2(64);
  const salt = uid2(64);
  const hash = SHA256(req.fields.password + salt).toString(encBase64);

  try {
    const userExist = await UserCreated.findOne({ email: req.fields.email });
    if (userExist) {
      res.json({
        message: "Email already used"
      });
    } else {
      const User = new UserCreated({
        email: req.fields.email,
        token: token,
        salt: salt,
        hash: hash,
        account: {
          username: req.fields.username
        }
      });
      await User.save();

      res.json({
        _id: User._id,
        token: User.token,
        account: User.account
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

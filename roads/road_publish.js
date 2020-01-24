const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;

const UserCreated = require("../models/model_user");
const publishCreated = require("../models/model_publish");

router.post("/offer/publish", async (req, res) => {
  console.log(req.files);
  console.log(req.files.pictures.path);

  const keys = Object.keys(req.files);
  console.log(keys);
  console.log(req.files.pictures.path);

  cloudinary.uploader.upload(req.files.pictures.path, async function(
    error,
    result
  ) {
    if (!error) {
      const newPicture = new Picture({
        url: result.secure_url
      });
      await newPicture.save();
      res.json(newPicture);
    } else {
      res.json({ message: "An error occured" });
    }
  });
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({
        error: "Missing Authorization Header"
      });
      return;
    }
    // on extrait le token et on vérifie que c'est bien un Bearer
    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      res.status(401).json({
        error: "Invalid Authorization Header"
      });
      return;
    }
    const token = parts[1];
    // on cherche l'utilisateur associé a ce token
    const user = await UserCreated.findOne({ token });
    if (!user) {
      res.status(401).json({
        error: "Invalid Token"
      });
      return;
    }

    const newPublish = new publishCreated({
      title: req.fields.title,
      description: req.fields.description,
      price: req.fields.price
    });

    await newPublish.save();
    res.json({
      _id: newPublish._id,
      title: newPublish.title,
      description: newPublish.description,
      price: newPublish.price,
      created: new Date(),
      creator: {
        user
      }
    });
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;

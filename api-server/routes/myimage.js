var express = require("express");
var router = express.Router();
var path = require("path");

router.get("/:imageSrc", function (req, res, next) {
  try {
    const imageSrc = req.params.imageSrc;
    console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname, "images", imageSrc));
  } catch (err) {
    next(err);
  }
});

var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  try {
    res.send("respond with a resource");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

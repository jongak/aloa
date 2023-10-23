var express = require("express");
var router = express.Router({ mergeParams: true });

const userRouter = require("./users");
router.use("/user", userRouter);

const characterRouter = require("./character");
router.use("/character", characterRouter);

module.exports = router;

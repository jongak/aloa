var express = require("express");
var router = express.Router({ mergeParams: true });

const userRouter = require("./users");
router.use("/user", userRouter);

module.exports = router;

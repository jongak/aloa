var express = require("express");
var router = express.Router({ mergeParams: true });

const authRouter = require("./users");
router.use("/auth", authRouter);

module.exports = router;

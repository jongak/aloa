var express = require("express");
var router = express.Router({ mergeParams: true });

const userRouter = require("./users");
router.use("/user", userRouter);

const characterRouter = require("./character");
router.use("/character", characterRouter);

const myImageRouter = require("./myimage");
router.use("/myimage", myImageRouter);

const imageRouter = require("./images");
router.use("/images", imageRouter);

const DBRouter = require("./db");
router.use("/db", DBRouter);

const loginRouter = require("./login");
router.use("/login", loginRouter);

module.exports = router;

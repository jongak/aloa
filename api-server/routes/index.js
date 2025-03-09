var express = require("express");
var router = express.Router({ mergeParams: true });

// const fileRouter = require("./file");
// router.use("/file", fileRouter);

// const characterRouter = require("./character");
// router.use("/character", characterRouter);

// const myImageRouter = require("./myimage");
// router.use("/myimage", myImageRouter);

// const imageRouter = require("./images");
// router.use("/images", imageRouter);

// const DBRouter = require("./db");
// router.use("/db", DBRouter);

// const noticeRouter = require("./notice");
// router.use("/notice", noticeRouter);

// 시즌3
const cardRouter = require("./card");
router.use("/card", cardRouter);

const loginRouter = require("./login");
router.use("/login", loginRouter);

module.exports = router;

const express = require("express");
const router = express.Router();
const proxy = require("html2canvas-proxy");
const request = require("request");

router.use("/", proxy(), (req, res, next) => {
  switch (req.query.responseType) {
    case "blob":
      req.pipe(request(req.query.url).on("error", next)).pipe(res);
      break;
    case "text":
    default:
      request(
        { url: req.query.url, encoding: "binary" },
        (error, response, body) => {
          if (error) return next(error);
          res.send(`
            data:${response.headers["content-type"]}; base64,
            ${Buffer.from(body, "binary").toString("base64")}`);
        }
      );
      break;
  }
});

module.exports = router;

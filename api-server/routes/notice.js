var express = require("express");
var router = express.Router();

const NoticeService = require("../services/notice.service");

router.get("/:no?", async (req, res, next) => {
  const no = req.params.no ? req.params.no : 0;

  try {
    const result = await NoticeService.getNotice(Number(no));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

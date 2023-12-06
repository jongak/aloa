var express = require("express");
var router = express.Router();

const NoticeService = require("../services/notice.service");
const noticeModel = require("../models/notice.model");

router.get("/notice/:no?", async (req, res, next) => {
  const no = req.params.no ? req.params.no : 1;

  try {
    const result = await NoticeService.getNotice(Number(no));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/total", async (req, res, next) => {
  try {
    const result = await noticeModel.getCount();
    res.json(result[0].count);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

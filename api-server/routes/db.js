var express = require("express");
const DbService = require("../oldServices/db.table.service");
var router = express.Router();

// 인증번호받기
router.get("/mkTable", async (req, res, next) => {
  try {
    const result = await DbService.mkTable(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

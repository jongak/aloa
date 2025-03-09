var express = require("express");
var router = express.Router();

const UserService = require("../service/login.service");

// 로그인 시도
router.post("/", async (req, res, next) => {
  // req.body = {login_id,password}
  try {
    const result = await UserService.signIn(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// 회원가입
router.post("/up", async (req, res, next) => {
  // req.body = {login_id,password,name}
  try {
    const result = await UserService.signUp(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// slt
router.get("/getslt", async (req, res, next) => {
  try {
    const result = await UserService.getSlt();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

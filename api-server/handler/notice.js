var express = require("express");
var router = express.Router();

const NoticeService = require("../oldServices/notice.service");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

router.get("/list/:no?", async (req, res, next) => {
  const no = req.params.no ? req.params.no : 1;

  try {
    const result = await NoticeService.getNotice(Number(no), 3);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

router.get("/img/:id", async (req, res, next) => {
  const id = req.params.id;

  var bucketParams = {
    Bucket: "aloa-bucket",
    Key: "aloa-notice/" + id,
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // Front 이미지를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent(id)}`
    );
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정
    inputStream.pipe(res);
  } catch (err) {
    next(err);
  }
});
//공지 등록
router.post("/", async (req, res, next) => {
  try {
    const result = await NoticeService.postNotice(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
//공지 수정
router.put("/:index", async (req, res, next) => {
  try {
    const index = Number(req.params.index);
    const article = req.body;
    const result = await NoticeService.putNotice(index, article);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
//공지 수정
router.delete("/:index", async (req, res, next) => {
  try {
    const index = Number(req.params.index);
    const article = req.body;
    const result = await NoticeService.deleteNotice(index, article);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
module.exports = router;

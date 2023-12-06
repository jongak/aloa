var express = require("express");
var router = express.Router();

const NoticeService = require("../services/notice.service");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

router.get("/:no?", async (req, res, next) => {
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

module.exports = router;

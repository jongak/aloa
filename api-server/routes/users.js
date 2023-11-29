const { GetObjectCommand, S3Client } = require("@aws-sdk/client-s3");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  try {
    res.send("respond with a resource");
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

router.get("/file/:id", async (req, res, next) => {
  const id = req.params.id;
  var bucketParams = {
    Bucket: "aloa-bucket",
  };
  if (id == 1) {
    bucketParams["Key"] = "6cde1952be6d1c20.pdf";
  } else if (id == 2) {
    bucketParams["Key"] = "2c40027e88855869.pdf";
  }

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // PDF 파일을 클라이언트로 스트리밍하고 브라우저에서 열도록 Content-Disposition 설정
    res.setHeader("Content-Disposition", `inline; filename="ALOA.pdf"`);
    res.setHeader("Content-Type", "application/pdf"); // PDF 파일의 Content-Type
    inputStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

router.get("/img", async (req, res, next) => {
  const bucketParams = {
    Bucket: "aloa-bucket",
    Key: "server_status.png",
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // Front 이미지를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename='server_status.png'}`
    );
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정
    inputStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

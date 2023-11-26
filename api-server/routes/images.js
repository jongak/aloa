var express = require("express");
var router = express.Router();
var path = require("path");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { S3 } = require("@aws-sdk/client-s3");
const {
  DynamoDBClient,
  ListTablesCommand,
} = require("@aws-sdk/client-dynamodb");
const fs = require("fs");
const {
  GetObjectCommand,
  S3Client,
  ListBucketsCommand,
  ListObjectsV2Command,
} = require("@aws-sdk/client-s3");
// router.get("/:imageSrc", function (req, res, next) {
//   try {
//     const imageSrc = req.params.imageSrc;
//     console.log(path.join(__dirname));
//     res.sendFile(path.join(__dirname, "images", imageSrc));
//   } catch (err) {
//     next(err);
//   }
// });

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const awsUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "aloa-bucket",
    acl: "public-read",
    key: function (req, file, cb) {
      const uniqueId =
        file.originalname.split(".")[0] +
        // "_" +
        // Math.floor(Math.random() * 1000).toString() +
        // Date.now() +
        "." +
        file.originalname.split(".").pop();
      // file.originalname.split(".").pop();
      cb(null, uniqueId);
    },
  }),
});

router.post("/", awsUpload.array("image", 2), (req, res) => {
  // 업로드된 파일 목록은 req.files에서 사용 가능
  const uploadedFiles = req.files;

  // 각 파일의 S3 URL을 추출하여 배열에 저장
  const fileUrls = uploadedFiles.map((file) => file.location);

  // 이제 fileUrls 또는 다른 정보를 클라이언트로 전송
  res.json({ ok: true, data: { fileUrls } });
});

const s3Client = new S3Client({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
router.get("/cards/:id", async (req, res, next) => {
  const bucketParams = {
    Bucket: "aloa-bucket",
    Key: "test",
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // S3로부터 받은 데이터를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent("example.png")}`
    );
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정

    inputStream.pipe(res);

    inputStream.on("end", () => {
      console.log(`Streamed the file successfully`);
    });

    // 에러 핸들링
    inputStream.on("error", (err) => {
      console.error("Error streaming the file:", err);
      res.status(500).send("Internal Server Error");
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;

var express = require("express");
var router = express.Router();
var path = require("path");
const multerS3 = require("multer-s3");
const multer = require("multer");
const { S3 } = require("@aws-sdk/client-s3");
const imageUploader = require("./imageUploader");

router.get("/:imageSrc", function (req, res, next) {
  try {
    const imageSrc = req.params.imageSrc;
    console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname, "images", imageSrc));
  } catch (err) {
    next(err);
  }
});

const s3 = new S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

// multer 에 대한 설정값
const awsUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "bevelog-bucket", // 객체를 업로드할 버킷 이름
    acl: "public-read", // Access control for the file
    key: function (req, file, cb) {
      // 객체의 키로 고유한 식별자 이기 때문에 겹치면 안됨
      cb(
        null,
        Math.floor(Math.random() * 1000).toString() +
          Date.now() +
          "." +
          file.originalname.split(".").pop()
      );
    },
  }),
});

// router.post("/", awsUpload.single("image"), (req, res) => {
//   res.send("hi");
// });

router.put("/upload", imageUploader.single("file"), async (req, res) => {
  try {
    // 이미지가 성공적으로 업로드되면 이곳에서 파일 URL을 얻을 수 있습니다.
    const fileUrl = req.file.location; // "location"은 S3에 업로드된 파일의 URL을 가리킵니다.

    // 업로드된 파일의 URL을 클라이언트에 응답합니다.
    res.json({ fileUrl });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

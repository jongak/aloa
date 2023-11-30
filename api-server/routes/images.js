var express = require("express");
var router = express.Router();
const multerS3 = require("multer-s3");
const multer = require("multer");
const { S3 } = require("@aws-sdk/client-s3");
const {
  GetObjectCommand,
  S3Client,
  ListObjectsV2Command,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
var fs = require("fs");

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

router.get("/front/:id", async (req, res, next) => {
  const id = req.params.id;

  var bucketParams = {
    Bucket: "aloa-bucket",
  };
  if (id == "abcd123456789") {
    bucketParams["Key"] = "server_status.png";
  } else {
    bucketParams["Key"] = encodeURIComponent(id) + "_front.png";
  }

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // Front 이미지를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent("front.png")}`
    );
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정
    inputStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

router.get("/back/:id", async (req, res, next) => {
  const id = req.params.id;

  const bucketParams = {
    Bucket: "aloa-bucket",
    Key: encodeURIComponent(id) + "_back.png",
  };

  try {
    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    const inputStream = data.Body;

    // Front 이미지를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent("back.png")}`
    );
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정
    inputStream.pipe(res);
  } catch (err) {
    next(err);
  }
});

router.get("/cardlist", async (req, res, next) => {
  const command = new ListObjectsV2Command({
    Bucket: "aloa-bucket",
    MaxKeys: 100, // 예시로 100개씩 가져오도록 설정
  });

  try {
    let isTruncated = true;
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3Client.send(command);

      const contentsList = Contents.map((c) => {
        if (
          c["Key"].indexOf("_front.png") == -1 &&
          c["Key"].indexOf("_back.png") == -1
        ) {
          if (
            c["Key"] != "6cde1952be6d1c20.pdf" &&
            c["Key"] != "2c40027e88855869.pdf" &&
            c["Key"] != "server_status.png"
          ) {
            return c["Key"];
          }
        }
        return false;
      })
        .filter(Boolean)
        .join("\n");
      if (contentsList) {
        contents += contentsList + "\n";
      }

      isTruncated = IsTruncated;
      if (isTruncated) {
        command.input.ContinuationToken = NextContinuationToken;
      }
    }
    fs.appendFile("fileList.txt", contents, function (err) {
      res.send("ok");
    });
  } catch (err) {
    next(err);
  }
});

// // 해당아이디 파일 삭제
// router.delete("/:id", async (req, res, next) => {
//   const id = req.params.id;

//   const bucketParams = {
//     Bucket: "aloa-bucket",
//     Key: encodeURIComponent(id),
//   };

//   try {
//     const data = await s3Client.send(new DeleteObjectCommand(bucketParams));
//     res.send(data);
//   } catch (err) {
//     next(err);
//   }
// });

// // fileList.txt에 있는것들삭제
// router.delete("/", async (req, res, next) => {
//   fs.readFile("fileList.txt", "utf8", async (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return next(err);
//     }

//     var tmp = data.split("\n");

//     try {
//       tmp.forEach(async (id) => {
//         const bucketParams = {
//           Bucket: "aloa-bucket",
//           Key: id,
//         };
//         await s3Client.send(new DeleteObjectCommand(bucketParams));
//       });
//       res.send("ok");
//     } catch (err) {
//       next(err);
//     }
//   });
// });

module.exports = router;

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
const SaveCardModel = require("../oldModels/save.card.model");
const SaveCardService = require("../oldServices/save.card.service");
const timeout = require("connect-timeout");

const Mytimeout = timeout("10s");

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
        Math.floor(Math.random() * 10000).toString() +
        Date.now() +
        "." +
        file.originalname.split(".").pop();
      // file.originalname.split(".").pop();

      // 여기서 파일 이름을 req 객체에 저장
      if (file.originalname.split(".")[0] == "loaf") {
        req.frontKey = uniqueId;
      }
      if (file.originalname.split(".")[0] == "loab") {
        req.backKey = uniqueId;
      }

      cb(null, uniqueId);
    },
  }),
});

// 조건을 확인하고 파일 업로드를 실행하는 미들웨어
router.get("/isMkOk/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // SaveCardModel.isMkOk 함수가 Promise를 반환한다고 가정
    // const result = true;
    const result = await SaveCardModel.isMkOk(id);
    res.json(result);
    // 조건이 충족되면 다음 미들웨어로 이동
  } catch (err) {
    next(err);
  }
});

router.post("/", awsUpload.array("image", 2), (req, res) => {
  // 업로드된 파일 목록은 req.files에서 사용 가능
  const uploadedFiles = req.files;

  // SaveCardModel.saveCard로 들어가기 전에
  // req.frontKey와 req.backKey를 사용하여 front_KEY와 back_KEY를 설정
  SaveCardModel.saveCard({
    game: req.body.game,
    character_id: req.body.character_id,
    front_KEY: req.frontKey,
    back_KEY: req.backKey,
    card_effect: req.body.card_effect,
  });

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
router.get("/numlist/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await SaveCardService.getNumList(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id/:no?", async (req, res, next) => {
  const id = req.params.id;
  const no = req.params.no ? req.params.no : 0;

  try {
    const result = await SaveCardService.deleteCards(id, no);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/character/:id", async (req, res, next) => {
  const id = req.params.id;

  try {
    const result = await SaveCardService.getCharacter(id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/effect/:id/:no?", async (req, res, next) => {
  const id = req.params.id;
  const no = req.params.no ? req.params.no : 0;

  try {
    const result = await SaveCardService.getEffect(id, no);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/front/:id/:no?", Mytimeout, async (req, res, next) => {
  const id = req.params.id;
  const no = req.params.no ? req.params.no : 0;

  var bucketParams = {
    Bucket: "aloa-bucket",
  };

  try {
    if (id == "abcd123456789") {
      bucketParams["Key"] = "server_status.png";
    } else {
      const cards = await SaveCardService.getCards(id, "front");
      if (!cards.length) {
        cardurl = "loafsample.png";
      } else {
        var cardurl = cards[0].front_KEY;
        if (no < cards.length) {
          cardurl = cards[no].front_KEY;
        }
      }
      bucketParams["Key"] = cardurl;
    }

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

router.get("/back/:id/:no?", Mytimeout, async (req, res, next) => {
  const id = req.params.id;
  const no = req.params.no ? req.params.no : 0;

  // console.log(1);
  const cards = await SaveCardService.getCards(id, "back");

  const bucketParams = {
    Bucket: "aloa-bucket",
  };

  try {
    // console.log(2);
    if (!cards.length) {
      cardurl = "loabsample.png";
    } else {
      var cardurl = cards[0].back_KEY;
      if (no < cards.length) {
        cardurl = cards[no].back_KEY;
      }
    }
    bucketParams["Key"] = cardurl;

    const data = await s3Client.send(new GetObjectCommand(bucketParams));
    // console.log(3);
    const inputStream = data.Body;

    // Front 이미지를 클라이언트로 스트리밍합니다.
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${encodeURIComponent("back.png")}`
    );
    // console.log(4);
    res.setHeader("Content-Type", "image/png"); // 파일 타입에 따라 수정
    inputStream.pipe(res);
    // console.log(5);
  } catch (err) {
    next(err);
  }
});

router.get("/list/:no?", async (req, res, next) => {
  const no = req.params.no ? req.params.no : 0;

  try {
    const result = await SaveCardService.getList(Number(no));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.patch("/name", async (req, res, next) => {
  // req.body = {cur_id,new_id,no}
  try {
    const result = await SaveCardService.changeName(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

const isCardImg = function (key) {
  if (key.indexOf("_front.png") != -1 || key.indexOf("_back.png") != -1) {
    if (
      key != "6cde1952be6d1c20.pdf" &&
      key != "2c40027e88855869.pdf" &&
      key != "server_status.png"
    ) {
      return true;
    }
  }
  return false;
};
const isnewCardImg = function (key) {
  if (key.startsWith("loaf") || key.startsWith("loab")) {
    return true;
  }
  return false;
};

// 직전 데이터
// router.get("/cardlist", async (req, res, next) => {
//   const command = new ListObjectsV2Command({
//     Bucket: "aloa-bucket",
//     MaxKeys: 100, // 예시로 100개씩 가져오도록 설정
//   });

//   try {
//     let isTruncated = true;
//     let contents = "";

//     while (isTruncated) {
//       const { Contents, IsTruncated, NextContinuationToken } =
//         await s3Client.send(command);

//       const contentsList = Contents.map((c) => {
//         if (isCardImg(c["Key"])) {
//           return c["Key"];
//         }
//         return false;
//       })
//         .filter(Boolean)
//         .join("\n");
//       if (contentsList) {
//         contents += contentsList + "\n";
//       }

//       isTruncated = IsTruncated;
//       if (isTruncated) {
//         command.input.ContinuationToken = NextContinuationToken;
//       }
//     }
//     fs.appendFile("fileList.txt", contents, function (err) {
//       res.send("ok");
//     });
//   } catch (err) {
//     next(err);
//   }
// });

// 복구
router.get("/cardlist", async (req, res, next) => {
  const command = new ListObjectsV2Command({
    Bucket: "aloa-bucket",
    MaxKeys: 100, // 예시로 100개씩 가져오도록 설정
  });

  try {
    let isTruncated = true;
    const contentsDic = {};
    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await s3Client.send(command);

      Contents.map((c) => {
        if (isnewCardImg(c["Key"])) {
          const targetDate = new Date(c["LastModified"]);
          const conditionMet =
            targetDate < new Date("2023-12-20T10:00:00.000Z");
          const ss = String(c["LastModified"]).split(".")[0];
          if (conditionMet) {
            if (contentsDic[ss]) {
              contentsDic[ss].push(c["Key"]);
            } else {
              contentsDic[ss] = [c["Key"]];
            }
          }
        }
        return false;
      });

      isTruncated = IsTruncated;
      if (isTruncated) {
        command.input.ContinuationToken = NextContinuationToken;
      }
    }
    const dataToAppend = JSON.stringify(contentsDic, null, 2);
    fs.appendFile("fileList.txt", dataToAppend + "\n", function (err) {
      if (err) throw err;
      console.log("Data has been appended to fileList.txt");
    });
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

//  해당아이디 파일 삭제
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

// fileList.txt에 있는것들삭제
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

//  fileList.txt에 있는것 db에 저장
// router.get("/", async (req, res, next) => {
//   fs.readFile("fileList.txt", "utf8", async (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return next(err);
//     }
//     var tmp = data.split("\n");

//     try {
//       for (const id of tmp) {
//         if (id && id.split("_")[1].split(".")[0] == "front") {
//           CardInputModel.input(
//             decodeURIComponent(id.split("_")[0]),
//             id.split("_")[0],
//             id
//           );
//         }
//       }
//       res.send("ok");
//     } catch (err) {
//       next(err);
//     }
//   });
// });

//복구
// router.get("/", async (req, res, next) => {
//   fs.readFile("fileList.txt", "utf8", async (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return next(err);
//     }
//     const contentsDic = JSON.parse(data);
//     var ss = 0;
//     var bb = 0;
//     try {
//       for (var key in contentsDic) {
//         if (contentsDic[key].length == 2) {
//           if (contentsDic[key][0].startsWith("loaf")) {
//             CardInputModel.newInput(
//               "inf" + String(ss),
//               contentsDic[key][0],
//               contentsDic[key][1],
//               key
//             );
//           } else {
//             CardInputModel.newInput(
//               "inf" + String(ss),
//               contentsDic[key][1],
//               contentsDic[key][0],
//               key
//             );
//           }
//           ss += 1;
//         } else {
//           contentsDic[key].forEach((e) => {
//             if (e.startsWith("loaf")) {
//               CardInputModel.newInput("ins" + String(bb), e, "", key);
//             } else {
//               CardInputModel.newInput("ins" + String(bb), "", e, key);
//             }
//             bb += 1;
//           });
//         }
//       }
//       res.send("ok");
//     } catch (err) {
//       next(err);
//     }
//   });
// });
module.exports = router;

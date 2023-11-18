// AWS S3 사용
const { S3 } = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");

const s3 = new S3({
  region: "ap-northeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const allowedExtensions = [".png", ".jpg", "jpeg", ".bmp"];

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "aloa-bucket",
    key: async (req, file) => {
      return new Promise((resolve, reject) => {
        const uploadDirectory = req.query.directory ?? "";
        const extension = path.extname(file.originalname);

        if (!allowedExtensions.includes(extension)) {
          reject(new Error("wrong extension"));
        }

        const key = `${uploadDirectory}/${Date.now()}_${file.originalname}`;
        resolve(key);
      });
    },
    acl: "public-read-write", // ???모르겠다
  }),
});

module.exports = imageUploader;

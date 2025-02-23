const dotenv = require("dotenv");

// 기본 .env 파일 로딩
dotenv.config({ path: ".env" });
// 환경별 .env 파일 로딩
console.log("NODE_ENV", process.env.NODE_ENV);
if (process.env.NODE_ENV) {
  dotenv.config({ override: true, path: `.env.${process.env.NODE_ENV}` });
}

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./handler/index");

var app = express();

app.use(
  logger("dev", {
    skip: function (req, res) {
      return !req.originalUrl.startsWith("/api");
    },
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 교차출처 처리
// 서버가 다르면 추가
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "..", "app-server", "build")));

app.use("/api", indexRouter);

var proxy = require("html2canvas-proxy");
const request = require("request");

// URL 체크 미들웨어를 먼저 실행
// app.use("/api", (req, res, next) => {
//   if (!req.query?.url) {
//     console.log("Proxy Error: No URL specified");
//     return res.status(400).json({
//       error: { message: "URL parameter is required for proxy request" },
//     });
//   }
//   next(); // URL이 있으면 다음 미들웨어로
// });

app.use("/api", proxy(), (req, res, next) => {
  // 프록시 서버 미들웨어
  switch (req.query.responseType) {
    case "blob":
      req.pipe(request(req.query.url).on("error", next)).pipe(res);
      break;
    case "text":
    default:
      request(
        { url: req.query.url, encoding: "binary" },
        (error, response, body) => {
          if (error) {
            return next(error);
          }
          res.send(
            `
            data:${response.headers["content-type"]}; base64,
            ${Buffer.from(body, "binary").toString("base64")}`
          );
        }
      );
      break;
  }
});

// React용 fallback 추가
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "app-server", "build", "index.html"));
});

// 404 에러 처리
app.use("/api", (req, res, next) => {
  console.error(404, req.url);
  res.json({ error: { message: "404::존재하지 않는 API입니다." } });
});

// React용 fallback 추가
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "app-server", "build", "index.html"));
});

// 언젠가 500에러가 안뜨게 해놨었는데 그걸 못찾아서 그냥 500에러뜨면 pm2 restart를 해줌
// const pm2 = require("pm2");
// function restartPM2() {
//   pm2.connect(function (err) {
//     if (err) {
//       console.error(err);
//       process.exit(2);
//     }

//     pm2.restart("aloa", function (err, proc) {
//       pm2.disconnect();
//       if (err) throw err;
//     });
//   });
// }

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.cause);
  // restartPM2();

  res.json({
    error: {
      message: `500::${err.cause}`,
    },
  });
});

module.exports = app;

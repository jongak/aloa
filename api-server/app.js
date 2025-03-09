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
var myLogger = require("./utils/logger");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");

var app = express();

// 개발 환경에서만 API 문서 제공
if (process.env.ENV_NAME === "development") {
  app.use(express.static(path.join(__dirname, "..", "app-server", "build")));
}

// 로그 파일 로테이션
myLogger.rotateLogFile();

// 로그 스트림 생성
const accessLogStream = myLogger.createLogStream();

// 파일에는 'combined' 포맷으로 저장
app.use(
  logger("combined", {
    skip: function (req, res) {
      return !req.originalUrl.startsWith("/api/");
    },
    stream: accessLogStream,
  })
);

// 콘솔에는 'dev' 또는 'dev' 포맷으로 출력
app.use(
  logger(process.env.NODE_ENV === "production" ? "dev" : "dev", {
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

// 200 응답 핸들러 추가
app.get("/api", (req, res) => {
  res.status(200).json({
    status: "success",
    message: process.env.REACT_APP_VERSION + " " + process.env.ENV_NAME + ":OK",
  });
});

app.use("/api", indexRouter);

const proxyRouter = require("./routes/proxy");
const sitemapRouter = require("./routes/sitemap");

//프록시
app.use("/api/proxy", proxyRouter);
//sitemap
app.use("/api/sitemap.xml", sitemapRouter);

// 404 에러 처리
app.use("/api", (req, res, next) => {
  return res.status(404).json({
    error: { message: "404::존재하지 않는 API입니다." },
  });
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack); // 스택 트레이스를 로그에 출력
  res.status(500).json({
    error: { message: `500::${err.message}` },
  });
});
module.exports = app;

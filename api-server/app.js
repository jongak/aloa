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

// 개발 환경에서만 API 문서 제공
if (process.env.ENV_NAME === "development") {
  app.use(express.static(path.join(__dirname, "..", "app-server", "build")));
}

const fs = require("fs");

// logs 디렉토리가 없으면 생성
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// 기존 access.log 파일이 있으면 이름 변경
const accessLogPath = path.join(__dirname, "logs", "access.log");
if (fs.existsSync(accessLogPath)) {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
  const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS 형식
  const version = process.env.REACT_APP_VERSION || "unknown"; // 버전 정보
  const newLogPath = path.join(
    __dirname,
    "logs",
    `access_${version}_${date}_${time}.log`
  );
  fs.renameSync(accessLogPath, newLogPath);
}

// 로그 파일 스트림 생성
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "logs", "access.log"),
  { flags: "a" } // 'a' flag는 append 모드
);

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

app.use("/api/proxy", proxy(), (req, res, next) => {
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

// sitemap.xml 라우트 추가 (cors와 api 라우트 설정 사이에 추가)
app.get("/api/sitemap.xml", (req, res) => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://wwww.aloa.kr</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>https://wwww.aloa.kr/capture</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>https://wwww.aloa.kr/notice</loc>
        <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>
    </urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(sitemap);
});

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

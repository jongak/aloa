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

var indexRouter = require("./routes/index");

var app = express();

// healthcheck
app.get("/helath-check", (req, res) => {
  res.send("Health Success");
});
// redirect
// 로드 밸런싱 사용 시 Header 에 X-Forwarded-Proto 포함되어 요청됨
if (dotenv.APP_ENV === "production") {
  app.use(function (req, res, next) {
    if (!req.secure && req.get("X-Forwarded-Proto") !== "https") {
      res.redirect("https://" + req.get("Host") + req.url);
    } else next();
  });
}

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

// 교차출처 처리
// 서버가 다르면 추가
app.use(cors());
app.use("/api", indexRouter);

var proxy = require("html2canvas-proxy");
const request = require("request");

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

// 404 에러 처리
app.use("/api", (req, res, next) => {
  console.error(404, req.url);
  res.json({ error: { message: "404::존재하지 않는 API입니다." } });
});

app.use(express.static(path.join(__dirname, "..", "app-server", "build")));
// React용 fallback 추가
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "app-server", "build", "index.html"));
});

// 500 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.error(err.cause);
  res.json({
    error: {
      message: "500::요청을 처리할 수 없습니다. 잠시 후 다시 요청해 주세요.",
    },
  });
});

module.exports = app;

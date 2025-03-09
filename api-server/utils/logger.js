const fs = require("fs");
const path = require("path");

class Logger {
  constructor() {
    this.logsDir = path.join(__dirname, "..", "logs");
    this.accessLogPath = path.join(this.logsDir, "access.log");
    this.initializeLogDirectory();
  }

  initializeLogDirectory() {
    // logs 디렉토리가 없으면 생성
    if (!fs.existsSync(this.logsDir)) {
      fs.mkdirSync(this.logsDir);
    }
  }

  rotateLogFile() {
    // 기존 access.log 파일이 있으면 이름 변경
    if (fs.existsSync(this.accessLogPath)) {
      const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식
      const time = new Date().toTimeString().split(" ")[0].replace(/:/g, "-"); // HH-MM-SS 형식
      const version = process.env.REACT_APP_VERSION || "unknown"; // 버전 정보

      const newLogPath = path.join(
        this.logsDir,
        `access_${version}_${date}_${time}.log`
      );

      fs.renameSync(this.accessLogPath, newLogPath);
    }
  }

  createLogStream() {
    // 로그 파일 스트림 생성
    return fs.createWriteStream(this.accessLogPath, {
      flags: "a", // 'a' flag는 append 모드
    });
  }
}

module.exports = new Logger();

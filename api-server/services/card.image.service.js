const CharacterModel = require("../models/character.model");
const pool = require("../models/pool");
const axios = require("axios");
const fs = require("fs").promises;

const CardImageService = {
  async getCardData(req, res, next) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const imageUrl =
        "https://aloa-bucket.s3.ap-northeast-2.amazonaws.com/%EC%9A%B0%EB%A0%88_front_8251700533817756.png";

      // 이미지 다운로드 없이 원격 서버에서 받은 이미지를 클라이언트에게 그대로 전송
      const imageResponse = await axios.get(encodeURI(imageUrl), {
        responseType: "stream",
      });

      // 이미지의 content-type을 응답 헤더에 설정
      res.setHeader("Content-Type", imageResponse.headers["content-type"]);

      // 이미지를 클라이언트에게 전송
      imageResponse.data.pipe(res);

      // DB에 작업 반영
      await conn.commit();
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      next(err); // 에러를 다음 미들웨어로 전달
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
};
module.exports = CardImageService;

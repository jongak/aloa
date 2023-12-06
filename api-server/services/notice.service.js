const pool = require("../models/pool");
const noticeModel = require("../models/notice.model");

const NoticeService = {
  async getNotice(no) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await noticeModel.getNotice(no);
      // const count = await noticeModel.getCount();
      // DB에 작업 반영
      await conn.commit();
      // return { data: data, count: count };
      return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
};

module.exports = NoticeService;

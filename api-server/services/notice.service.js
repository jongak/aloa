const pool = require("../models/pool");
const noticeModel = require("../models/notice.model");

const NoticeService = {
  async getNotice(no, max_num) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await noticeModel.getNotice(no, max_num, conn);
      const count = await noticeModel.getCount(conn);
      // DB에 작업 반영
      await conn.commit();
      return { data: data, count: count };
      // return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async newNotice(article) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const notice = {
        title: article.title,
        content: article.content,
        image: article.image,
        date: article.date,
        time: article.time,
      };
      const data = await noticeModel.newNotice(notice, conn);
      // DB에 작업 반영
      await conn.commit();
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
  async updateNotice(index, article, no, max_num) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      await noticeModel.updateNotice(index, article, conn);
      const result = await NoticeService.getNotice(no, max_num);
      // DB에 작업 반영
      await conn.commit();
      console.log(result);
      return result;
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

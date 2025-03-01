const pool = require("../oldModels/pool");
const noticeModel = require("../oldModels/notice.model");

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
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async postNotice(article) {
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
      const data = await noticeModel.postNotice(notice, conn);
      // DB에 작업 반영
      await conn.commit();
      return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async putNotice(index, article) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const data = await noticeModel.putNotice(index, article, conn);
      // DB에 작업 반영
      await conn.commit();
      return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async deleteNotice(index) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const data = await noticeModel.deleteNotice(index, conn);
      // DB에 작업 반영
      await conn.commit();
      return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
};

module.exports = NoticeService;

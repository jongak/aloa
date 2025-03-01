const pool = require("./pool");

const noticeModel = {
  // 공지사항 가져오기
  async getNotice(no, max_num, conn = pool) {
    try {
      const sql = `select * from notice WHERE title IS NOT NULL ORDER BY no DESC`;
      const [data] = await conn.query(sql);
      const result = data.slice((no - 1) * max_num, no * max_num);
      return result;
    } catch (err) {
      throw err;
    }
  },
  //totalpage 구하기용
  async getCount(conn = pool) {
    try {
      const sql = `select COUNT(no) as count from notice`;
      const [data] = await conn.query(sql);
      return data[0]["count"];
    } catch (err) {
      throw err;
    }
  },
  //notice 추가하기
  async postNotice(article, conn = pool) {
    try {
      const sql = `insert into notice set ?`;
      const [data] = await conn.query(sql, article);
      return data.insertId;
    } catch (err) {
      throw err;
    }
  },
  //notice 수정하기
  async putNotice(no, article, conn = pool) {
    try {
      const sql = `update notice set ? where no = ?`;
      const [result] = await conn.query(sql, [article, no]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
  //notice 수정하기
  async deleteNotice(no, conn = pool) {
    try {
      const sql = `delete from notice where no = ?`;
      const [result] = await conn.query(sql, [no]);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = noticeModel;

const pool = require("./pool");

const noticeModel = {
  // 공지사항 가져오기
  async getNotice(no, conn = pool) {
    try {
      const sql = `select * from notice ORDER BY no desc`;
      const [data] = await conn.query(sql);
      const result = data.slice((no - 1) * 3, no * 3);
      return [...result];
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
  //totalpage 구하기용
  async getCount(conn = pool) {
    try {
      const sql = `select COUNT(no) as count from notice`;
      const [data] = await conn.query(sql);
      return data;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
};

module.exports = noticeModel;

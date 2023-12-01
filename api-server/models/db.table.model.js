const pool = require("./pool");

const TableModel = {
  // 닉네임중복검사
  async TableModel(article, conn = pool) {
    try {
      // article = {login_id,password}
      const sql = `
      CREATE TABLE IF NOT EXISTS ${process.env.DB_DATABASE}.notice;
      `;
      const [result] = await conn.query(sql);
      return result.length;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
};

module.exports = TableModel;

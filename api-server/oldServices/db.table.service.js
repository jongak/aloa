const TableModel = require("../oldModels/db.table.model");
const pool = require("../oldModels/pool");
require("date-utils");

const DbService = {
  async mkTable(article) {
    //article = {login_id,phone_number}
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      // userDB에 중복아이디가 1개라도 있으면
      await TableModel.mkTable(conn);

      await conn.commit();
      // return { ...data, ok: true };
      return { ok: true };
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

module.exports = DbService;

const { sql } = require("../config/server");

const LoginModel = {
  async getSlt(transaction) {
    try {
      const request = new sql.Request(transaction);
      const result = await request.query(`
        SELECT TOP 1 a 
        FROM slt
      `);

      // MSSQL은 recordset으로 결과를 반환
      return result.recordset[0]?.a;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = LoginModel;

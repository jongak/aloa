const pool = require("./pool");

const LoginModel = {
  // 닉네임중복검사
  async getSamePid(article, conn = pool) {
    try {
      // article = {login_id}
      const sql = `
      select
        id
      from users
      where
        login_id = ?
      `;
      const [result] = await conn.query(sql, [article.login_id]);
      return result.length;
    } catch (err) {
      throw err;
    }
  },

  // 닉네임/비밀번호비교
  async signIn(article, conn = pool) {
    try {
      // article = {login_id,password}
      const sql = `
      select
        role,
        name
      from users
      where
        login_id = ? and
        password = ?
      `;
      const [result] = await conn.query(sql, [
        article.login_id,
        article.password,
      ]);
      return result[0];
    } catch (err) {
      throw err;
    }
  },

  // id정보 등록
  async signUp(article, conn = pool) {
    try {
      // article = {login_id,password,name}
      const sql = `insert into users set ?`;
      const [result] = await conn.query(sql, [article]);
      return result.insertId;
    } catch (err) {
      throw err;
    }
  },

  // slt 가져오기
  async getSlt(conn = pool) {
    try {
      const sql = `
      select
        a
      from slt
      `;
      const [result] = await conn.query(sql);
      return result[0].a;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = LoginModel;

const LoginModel = require("../oldModels/user.LoginModel");
const pool = require("../oldModels/pool");
require("date-utils");

const UserService = {
  async signIn(article) {
    // article = {login_id,password}
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      if (!article.login_id) {
        await conn.commit();
        return { ok: false, message: "아이디 없음" };
      }
      const data = await LoginModel.signIn(article, conn);

      await conn.commit();
      if (data) {
        return { ok: true, message: "로그인완료", ...data };
      }
      return { ok: false, message: "아이디/비밀번호 불일치" };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },

  async signUp(article) {
    // article = {login_id,password,name}
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      if (!article.login_id) {
        await conn.commit();
        return { ok: false, message: "아이디 없음" };
      }

      const pids = await LoginModel.getSamePid(article, conn);
      console.log(pids);
      if (pids) {
        await conn.commit();
        return { ok: false, message: "중복아이디" };
      }

      await LoginModel.signUp(article, conn);
      await conn.commit();
      return { ok: true, message: "회원가입완료" };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw err;
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },

  async getSlt() {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await LoginModel.getSlt(conn);
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

module.exports = UserService;

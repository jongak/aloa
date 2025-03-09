const LoginModel = require("../repo/login");
const { connPool, getTransaction } = require("../config/server");
require("date-utils");

const UserService = {
  async signIn(article) {
    // article = {login_id,password}
    const conn = await connPool.connect();
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
      connPool.releaseConnection(conn);
    }
  },

  async signUp(article) {
    // article = {login_id,password,name}
    const conn = await connPool.connect();
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
      connPool.releaseConnection(conn);
    }
  },

  async getSlt() {
    let transaction;
    try {
      transaction = await getTransaction();

      const data = await LoginModel.getSlt(transaction);

      await transaction.commit();
      return data;
    } catch (err) {
      if (transaction) await transaction.rollback();
      throw err;
    } finally {
      if (transaction) {
        await transaction.release();
      }
    }
  },
};

module.exports = UserService;

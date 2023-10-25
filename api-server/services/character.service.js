const pool = require("../models/pool");
const CharacterModel = require("../models/character.model");

const CharacterService = {
  async getCharacter(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await CharacterModel.getCharacter(characterName);
      // DB에 작업 반영
      await conn.commit();
      // return { ...data, ok: true };
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async capture(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await CharacterModel.getCharacter(characterName);
      // DB에 작업 반영
      await conn.commit();
      // return { ...data, ok: true };
      return { ok: true, data: data };
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

module.exports = CharacterService;

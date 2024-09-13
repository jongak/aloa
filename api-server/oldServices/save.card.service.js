const pool = require("../oldModels/pool");
const SaveCardModel = require("../oldModels/save.card.model");
const TableModel = require("../oldModels/db.table.model");
require("date-utils");

const SaveCardService = {
  async saveDB(article) {
    //article = {game, character_id, front_KEY, back_KEY,card_effect}
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      // userDB에 중복아이디가 1개라도 있으면
      await SaveCardModel.saveCard(article, conn);

      await conn.commit();
      // return { ...data, ok: true };
      return { ok: true };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async getNumList(character_id) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const cards = await SaveCardModel.getNumList(character_id, conn);

      await conn.commit();
      // return { ...data, ok: true };
      return cards;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async getCharacter(character_id) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      var data = await SaveCardModel.getCharacter(character_id);
      await conn.commit();
      if (data > 0) {
        return { ok: true };
      } else {
        return { ok: false };
      }
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },

  async getEffect(character_id, no) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      var cards = await SaveCardModel.getEffects(character_id, conn);
      if (!cards.length) {
        cards = await SaveCardModel.getEffects("송도나봉선", conn);
      } else {
        var cardurl = cards[0].card_effect;
        if (no < cards.length) {
          cardurl = cards[no].card_effect;
        }
      }

      await conn.commit();
      // return { ...data, ok: true };
      return cardurl;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async deleteCards(character_id, no) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const pids = await SaveCardModel.getCardPids(character_id, conn);
      var element = pids[0];
      if (no < pids.length) {
        element = pids[no];
      }
      if (element["front_KEY"]) {
        await TableModel.deleteImg(element["front_KEY"]);
      }
      if (element["back_KEY"]) {
        await TableModel.deleteImg(element["back_KEY"]);
      }
      if (element["id"]) {
        await TableModel.deleteSQL(element["id"], conn);
      }

      await conn.commit();
      // return { ...data, ok: true };
      return pids;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async changeName(article) {
    // article = {cur_id,new_id,no}
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const pids = await SaveCardModel.getCardPids(article["cur_id"], conn);
      var element = pids[0];
      if (article.no < pids.length) {
        element = pids[article.no];
      }

      if (element["id"]) {
        await TableModel.changeName(element["id"], article["new_id"], conn);
      }

      await conn.commit();
      // return { ...data, ok: true };
      return true;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async getCards(character_id, card) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const data = await SaveCardModel.getCards(character_id, card, conn);

      await conn.commit();
      // return { ...data, ok: true };
      return data;
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async getList(no) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();

      const data = await SaveCardModel.getList(no, conn);
      const maxNo = await SaveCardModel.getMaxList(conn);

      await conn.commit();
      // return { ...data, ok: true };
      return { data: data, maxNo: maxNo };
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

module.exports = SaveCardService;

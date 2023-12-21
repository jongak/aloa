const pool = require("./pool");
const SaveCardModel = {
  // 카드정보저장
  async saveCard(article, conn = pool) {
    try {
      //article = {game, character_id, front_KEY, back_KEY,card_effect}
      const sql = `insert into cards set ?`;
      await conn.query(sql, [article]);
      return true;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
  //24시간 제한
  async isMkOk(character_id, conn = pool) {
    try {
      const sql = `select updated_at from cards where character_id = ? ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql, [character_id]);

      if (!data[0]) return true;
      const currentTime = new Date();
      const targetDate = new Date(data[0]["updated_at"]);
      const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
      // const oneDayInMilliseconds = 60 * 60 * 1000;
      const timeDifference = targetDate - currentTime;
      const isWithin24Hours = Math.abs(timeDifference) > oneDayInMilliseconds;

      return isWithin24Hours;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },

  //카드url 리스트 확보
  async getCards(character_id, card, conn = pool) {
    try {
      const sql = `select ${card}_KEY from cards where character_id = ? ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql, [character_id]);
      return data;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
  //카드pid 리스트 확보
  async getCardPids(character_id, conn = pool) {
    try {
      const sql = `select id,front_KEY,back_KEY from cards where character_id = ? ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql, [character_id]);
      return data;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },

  //카드 이펙트 리스트 확보
  async getEffects(character_id, conn = pool) {
    try {
      const sql = `select card_effect from cards where character_id = ? ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql, [character_id]);
      return data;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
  //카드 리스트 확보
  async getList(no, conn = pool) {
    try {
      const sql = `select character_id from cards ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql);
      const set = new Set(data.map((item) => item.character_id));
      const uniqueData = [...set];
      const sliceData = uniqueData.slice(no * 6, (no + 1) * 6);
      return sliceData;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },

  //카드 리스트 확보
  async getMaxList(conn = pool) {
    try {
      const sql = `select character_id from cards ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql);
      const set = new Set(data.map((item) => item.character_id));
      const uniqueData = [...set];
      return Math.floor((uniqueData.length - 1) / 6);
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
  //카드 이펙트 리스트 확보
  async getNumList(character_id, conn = pool) {
    try {
      const sql = `select updated_at from cards where character_id = ? ORDER BY updated_at DESC`;
      const [data] = await conn.query(sql, [character_id]);
      const newData = data.map((time) => {
        const originalDate = new Date(time["updated_at"]);
        const newDate = new Date(originalDate.getTime() + 9 * 60 * 60 * 1000);
        return newDate;
      });
      return newData;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
};

module.exports = SaveCardModel;

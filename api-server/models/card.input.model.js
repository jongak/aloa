const pool = require("./pool");

const CardInputModel = {
  // 닉네임중복검사
  async input(id, aly, key, conn = pool) {
    try {
      const sql3 = `
            insert INTO cards set ?
          `;

      await conn.query(sql3, [
        {
          game: "loa",
          character_id: id,
          front_Key: key,
          back_Key: aly + "_back.png",
          card_effect: JSON.stringify({
            rarityPreset: "holographic",
          }),
        },
      ]);

      // const [result] = await conn.query(sql);
      // return result.length;
    } catch (err) {
      throw new Error("DB Error", { cause: err });
    }
  },
};

module.exports = CardInputModel;

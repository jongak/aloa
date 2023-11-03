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
  async getCharacters(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const res = await CharacterModel.getCharacters(characterName);
      const data = {
        server: "",
        Lupeon: [],
        Kadan: [],
        Karmian: [],
        Silian: [],
        Aman: [],
        Kazeros: [],
        Avrelsud: [],
        Ninave: [],
      };

      const ServerName = {
        루페온: "Lupeon",
        카단: "Kadan",
        카마인: "Karmian",
        실리안: "Silian",
        아만: "Aman",
        카제로스: "Kazeros",
        아브렐슈드: "Avrelsud",
        니나브: "Ninave",
      };
      res.forEach((element) => {
        if (element["CharacterName"] == characterName) {
          data["server"] = ServerName[element["ServerName"]];
        }
        data[ServerName[element["ServerName"]]].push(element);
      });

      Object.keys(data).forEach((server) => {
        if (server == "server") return;

        data[server].sort((a, b) => {
          if (a["ItemMaxLevel"] < b["ItemMaxLevel"]) return 1;
          if (a["ItemMaxLevel"] > b["ItemMaxLevel"]) return -1;
          if (a["CharacterName"] > b["CharacterName"]) return 1;
          return -1;
        });
      });

      var my;
      data[data["server"]].forEach((element, i) => {
        if (element["CharacterName"] == characterName) {
          my = element;
          data[data["server"]].splice(i, 1);
        }
      });

      data[data["server"]].unshift(my);
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
  async getCardData(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const res = await CharacterModel.getCharacter(characterName);

      // const data = {
      //   ...res["AromoryProfile"],
      //   ...res["ArmoryEquipment"],
      //   ...res["ArmoryAvatars"],
      //   ...res["ArmorySkills"],
      //   ...res["ArmoryEngraving"],
      //   ...res["ArmoryCard"],
      //   ...res["ArmoryGem"],
      //   ...res["ColosseumInfo"],
      //   ...res["Collectibles"],
      // };

      // DB에 작업 반영
      await conn.commit();
      // return { ...data, ok: true };
      return { ok: true, data: res };
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

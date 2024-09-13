const pool = require("../repo/pool");
const getExpedition = require("../repo/character.getExpedition");
const CharacterGetExpeditionModel = require("../model/character.getExpedition");

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

const CharacterService = {
  async getExpedition(characterName) {
    try {
      const res = await getExpedition(characterName);
      if (!res || !res.length) {
        throw new Error("원정대에 캐릭터가 없습니다.");
      }
      const data = new CharacterGetExpeditionModel();

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
      return data;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
  },
};
module.exports = CharacterService;

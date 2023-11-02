const pool = require("./pool");
const axios = require("axios");
const lostArk = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com/",
});
const CharacterModel = {
  async getCharacter(characterName) {
    const url = "armories/characters/" + characterName + "/profiles";
    const headers = {
      accept: "application/json",
      authorization: "bearer " + process.env.REACT_APP_LOSTARK_API_KEY,
    };

    const res = await lostArk.get(url, { headers: headers });

    return res.data;
  },
  async getCharacters(characterName) {
    const url = "characters/" + characterName + "/siblings";
    const headers = {
      accept: "application/json",
      authorization: "bearer " + process.env.REACT_APP_LOSTARK_API_KEY,
    };

    const res = await lostArk.get(url, { headers: headers });
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
    res.data.forEach((element) => {
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
  },
};

module.exports = CharacterModel;

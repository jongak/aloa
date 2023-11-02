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
      서버: "",
      루페온: [],
      카단: [],
      카마인: [],
      실리안: [],
      아만: [],
      카제로스: [],
      아브렐슈드: [],
      니나브: [],
    };
    res.data.forEach((element) => {
      if (element["CharacterName"] == characterName) {
        data["서버"] = element["ServerName"];
      }
      data[element["ServerName"]].push(element);
    });
    return data;
  },
};

module.exports = CharacterModel;

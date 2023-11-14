// const pool = require("./pool");
const axios = require("axios");
const lostArk = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com/",
});
const CharacterModel = {
  async getCharacter(characterName) {
    const url =
      "armories/characters/" +
      characterName +
      "?filters=profiles%2B" +
      "equipment%2B" +
      // "avatars%2B" +
      // "combat-skills%2B" +
      "engravings%2B" +
      "cards%2B" +
      "gems%2B";
    // "colosseums%2B" +
    // "collectibles";
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

    return res.data;
  },
};

module.exports = CharacterModel;

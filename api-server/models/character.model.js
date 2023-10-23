const pool = require("./pool");
const axios = require("axios");
const lostArk = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com/",
});
const AuthModel = {
  async getCharacter(characterName) {
    const url = "armories/characters/" + characterName + "/profiles";
    const headers = {
      accept: "application/json",
      authorization: "bearer " + process.env.REACT_APP_LOSTARK_API_KEY,
    };

    const res = await lostArk.get(url, { headers: headers });

    return res.data;
  },
};

module.exports = AuthModel;

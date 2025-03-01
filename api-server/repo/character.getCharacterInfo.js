const axios = require("axios");
const lostArk = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com/",
});

async function getCharacterInfo(characterName) {
  const url =
    "armories/characters/" +
    characterName +
    "?filters=profiles%2B" +
    "equipment%2B" +
    // "avatars%2B" +
    // "combat-skills%2B" +
    "engravings%2B" +
    "cards%2B" +
    "gems%2B" +
    // "colosseums%2B" +
    "collectibles%2B" +
    "arkpassive";
  const headers = {
    accept: "application/json",
    authorization: `bearer ${process.env.REACT_APP_LOSTARK_API_KEY}`,
  };

  try {
    const res = await lostArk.get(url, { headers: headers });
    return res.data;
  } catch (err) {
    throw err;
  }
}

module.exports = getCharacterInfo;

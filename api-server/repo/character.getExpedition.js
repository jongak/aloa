const axios = require("axios");
const lostArk = axios.create({
  baseURL: "https://developer-lostark.game.onstove.com/",
});
async function getExpedition(characterName) {
  const url = "characters/" + characterName + "/siblings";
  const headers = {
    accept: "application/json",
    authorization: `bearer ${process.env.REACT_APP_LOSTARK_API_KEY}`,
  };
  try {
    const res = await lostArk.get(url, { headers: headers });
    return res.data;
  } catch (err) {
    throw new Error("Model Error", { cause: err });
  }
}
module.exports = getExpedition;

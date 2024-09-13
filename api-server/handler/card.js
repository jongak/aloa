var express = require("express");
var router = express.Router();

const CharacterService2 = require("../oldServices/character.service");
// const CharacterCardService = require("../services/character.card.service");

const CharacterService = require("../service/character");

// 캐릭터명으로 원정대 검색
// api/card/expedition/:name
router.get("/expedition/:name", hCardExpedition);

// router.get("/carddata/:name", async (req, res, next) => {
//   const characterName = req.params.name;
//   try {
//     const result = await CharacterService2.getCardData(characterName);
//     res.json(result);
//   } catch (err) {
//     next(err);
//   }
// });

//=====================핸들러======================
//=================================================

// 캐릭터명으로 원정대 검색
// api/card/expedition/:name
async function hCardExpedition(req, res, next) {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getExpedition(characterName);
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = router;

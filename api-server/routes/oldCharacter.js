var express = require("express");
var router = express.Router();

const CharacterService = require("../oldServices/character.service");
const CharacterCardService = require("../oldServices/character.card.service");

router.get("/:name", async (req, res, next) => {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getCharacter(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/characters/:name", async (req, res, next) => {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getCharacters(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get("/carddata/:name", async (req, res, next) => {
  const characterName = req.params.name;
  try {
    const result = await CharacterCardService.getCardData(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

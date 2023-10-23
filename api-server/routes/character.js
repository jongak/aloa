var express = require("express");
var router = express.Router();

const CharacterService = require("../services/character.service");

router.get("/:name", async (req, res, next) => {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getCharacter(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

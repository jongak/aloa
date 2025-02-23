var express = require("express");
var router = express.Router();

const CharacterService = require("../service/character");

// 캐릭터명으로 원정대 검색
// api/card/expedition/:name
router.get("/expedition/:name", hCardExpedition);

// DEBUG:::캐릭터명으로 원정대 검색
// api/card/expeditionRaw/:name
router.get("/expeditionRaw/:name", hCardExpeditionRaw);

// 캐릭터명으로 장비 검색
// api/card/characterInfo/:name
router.get("/characterInfo/:name", hCardCharacterInfo);

// DEBUG:::캐릭터명으로 장비 검색 스마게
// api/card/characterInfoRaw/:name
router.get("/characterInfoRaw/:name", hCardCharacterInfoRaw);

// 캐릭터명으로 아크패시브 여부 검색
// api/card/isArkPassive/:name
router.get("/isArkPassive/:name", hCardIsArkPassive);

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

// DEBUG:::캐릭터명으로 원정대 검색
// api/card/expeditionRaw/:name
async function hCardExpeditionRaw(req, res, next) {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getExpeditionRaw(characterName);
    res.json(result);
  } catch (err) {
    console.log(err);
    next(err);
  }
}

// 캐릭터명으로 장비 검색
// api/card/characterInfo/:name
async function hCardCharacterInfo(req, res, next) {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getCharacterInfo(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// DEBUG:::캐릭터명으로 장비 검색 스마게 API
// api/card/characterInfoRaw/:name
async function hCardCharacterInfoRaw(req, res, next) {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.getCharacterInfoRaw(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

// 캐릭터명으로 아크패시브 여부 검색
// api/card/isArkPassive/:name
async function hCardIsArkPassive(req, res, next) {
  const characterName = req.params.name;
  try {
    const result = await CharacterService.isArkPassive(characterName);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = router;

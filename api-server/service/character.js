const pool = require("../repo/pool");
const getExpedition = require("../repo/character.getExpedition");
const CharacterGetExpeditionModel = require("../model/character.getExpedition");
const getCharacterInfo = require("../repo/character.getCharacterInfo");
const CharacterGetCharacterInfoModel = require("../model/character.getCharacterInfo");
// TODO: getExpedition 이때 아크패시브 유무도 받아와야할듯
// TODO: ArmoryEquipment
// TODO: ArmoryGem
// TODO: Collectibles
// TODO: 기타

const CharacterService = {
  async getExpedition(characterName) {
    try {
      const res = await getExpedition(characterName);
      if (!res || !res.length) {
        throw new Error("캐릭터 닉네임을 찾을 수 없습니다.");
      }

      const data = new CharacterGetExpeditionModel(_processData(res));
      return data;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
    function _sortData(arr) {
      return arr.sort((a, b) => {
        if (a["ItemMaxLevel"] < b["ItemMaxLevel"]) return 1;
        if (a["ItemMaxLevel"] > b["ItemMaxLevel"]) return -1;
        if (a["CharacterName"] > b["CharacterName"]) return 1;
        return -1;
      });
    }

    function _processData(arr) {
      if (!Array.isArray(arr) || arr.length === 0) return;

      let topItem = null;
      const serverData = {
        루페온: [],
        카단: [],
        카마인: [],
        실리안: [],
        아만: [],
        카제로스: [],
        아브렐슈드: [],
        니나브: [],
      };

      arr.forEach((item) => {
        const serverName = item.ServerName;
        const itemMaxLevel = parseFloat(item.ItemMaxLevel.replace(/,/g, ""));

        if (
          !topItem ||
          itemMaxLevel > parseFloat(topItem.ItemMaxLevel.replace(/,/g, ""))
        ) {
          topItem = item;
        }

        if (serverData[serverName]) {
          serverData[serverName].push(item);
        }
      });

      return {
        server: topItem.ServerName,
        루페온: _sortData(serverData.루페온),
        카단: _sortData(serverData.카단),
        카마인: _sortData(serverData.카마인),
        실리안: _sortData(serverData.실리안),
        아만: _sortData(serverData.아만),
        카제로스: _sortData(serverData.카제로스),
        아브렐슈드: _sortData(serverData.아브렐슈드),
        니나브: _sortData(serverData.니나브),
      };
    }
  },

  async getExpeditionRaw(characterName) {
    try {
      const res = await getExpedition(characterName);
      if (!res || !res.length) {
        throw new Error("캐릭터 닉네임을 찾을 수 없습니다.");
      }

      return res;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
  },

  async getCharacterInfo(characterName) {
    try {
      const res = await getCharacterInfo(characterName);
      if (!res) {
        throw new Error("캐릭터 정보를 가져올 수 없습니다.");
      }

      res.parseArmoryCard = _parseArmoryCard(res.ArmoryCard);

      const data = new CharacterGetCharacterInfoModel(res);

      return data;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }

    function _parseArmoryCard(row) {
      var AwakeCount = 0;
      var AwakeName = "";
      const Cards = [];

      row.Cards.forEach((element) => {
        const { Slot, Tooltip, ...filtered } = element;
        Cards.push(filtered);
        AwakeCount += element["AwakeCount"];
      });
      row.Effects.forEach((element) => {
        if (!element["Items"][2]) {
          1;
        } else if (element["Items"][2]["Name"].includes("하는 빛 6세트")) {
          AwakeName += "세구빛";
        } else if (element["Items"][2]["Name"].includes("군단장 6세트")) {
          AwakeName += "암구빛";
        } else if (element["Items"][2]["Name"].includes("절벽 6세트")) {
          AwakeName += "남바절";
        } else if (element["Items"][2]["Name"].includes("달인 6세트")) {
          AwakeName += "창의달인";
        } else if (element["Items"][2]["Name"].includes("오리라 3세트")) {
          if (AwakeName == "라제") {
            AwakeName = "세우라제";
          } else {
            AwakeName += "세우";
          }
        } else if (element["Items"][2]["Name"].includes("플라티나")) {
          if (AwakeName == "부르") {
            AwakeName = "플라부르";
          } else {
            AwakeName += "플라";
          }
        } else if (element["Items"][2]["Name"].includes("운명 2세트")) {
          AwakeName += "라제";
        } else if (element["Items"][2]["Name"].includes("있도다 3세트")) {
          AwakeName += "부르";
        } else if (element["Items"][2]["Name"].includes("운명의 별 5세트")) {
          AwakeName += "운명";
        } else if (element["Items"][2]["Name"].includes("있구나 6세트")) {
          AwakeName += "너계획";
        } else if (element["Items"][2]["Name"].includes("보면 6세트")) {
          AwakeName += "알고보면";
        }
      });
      if (AwakeName == "남바절") {
        if (AwakeCount < 12) {
          AwakeCount = 0;
        } else if (AwakeCount < 18) {
          AwakeCount = 12;
        } else if (AwakeCount < 30) {
          AwakeCount = 18;
        }
      } else {
        if (AwakeCount < 12) {
          AwakeCount = 0;
        } else if (AwakeCount < 18) {
          AwakeCount = 12;
        } else if (AwakeCount < 25) {
          AwakeCount = 18;
        } else if (AwakeCount < 30) {
          AwakeCount = 25;
        }
      }

      return { Cards, AwakeCount, AwakeName };
    }
  },

  async getCharacterInfoRaw(characterName) {
    try {
      const res = await getCharacterInfo(characterName);
      if (!res) {
        throw new Error("캐릭터 정보를 가져올 수 없습니다.");
      }

      return res;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
  },
};
module.exports = CharacterService;

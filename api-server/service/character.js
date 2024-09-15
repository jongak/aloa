const pool = require("../repo/pool");
const getExpedition = require("../repo/character.getExpedition");
const CharacterGetExpeditionModel = require("../model/character.getExpedition");
const getCharacterInfo = require("../repo/character.getCharacterInfo");
const CharacterGetCharacterInfoModel = require("../model/character.getCharacterInfo");
const getArkPassive = require("../repo/character.getArkPassive");
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

      const data = new CharacterGetExpeditionModel(await _processData(res));
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

    async function _processData(arr) {
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

      for (const item of arr) {
        const serverName = item.ServerName;
        const itemMaxLevel = parseFloat(item.ItemMaxLevel.replace(/,/g, ""));

        if (
          !topItem ||
          itemMaxLevel > parseFloat(topItem.ItemMaxLevel.replace(/,/g, ""))
        ) {
          topItem = item;
        }

        const isArkPassive = await CharacterService.isArkPassive(
          item.CharacterName
        );

        if (serverData[serverName]) {
          serverData[serverName].push({
            ...item,
            isArkPassive: isArkPassive,
          });
        }
      }

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

      res.parseArmoryEquipment = _parseArmoryEquipment(res.ArmoryEquipment);
      res.parseArmoryEngraving = _parseArmoryEngraving(res.ArmoryEngraving);
      res.parseArmoryGem = _parseArmoryGem(res.ArmoryGem);
      res.parseArmoryCard = _parseArmoryCard(res.ArmoryCard);
      res.parseArkPassive = _pasreArkPassive(res.ArkPassive);

      const data = new CharacterGetCharacterInfoModel(res);

      return data;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }

    function _parseArmoryEquipment(row) {
      let 전체_초월_등급 = 0;
      let 전체_초월_레벨 = 0;

      let 엘릭서_효과;
      let 엘릭서_레벨 = 0;

      let 방어구_품질 = 0;
      let 악세_품질 = 0;

      const 악세 = {
        목걸이: [
          { Name: "", Icon: "", Grade: "", qualityValue: "", 연마_효과: [] },
        ],
        귀걸이: [
          { Name: "", Icon: "", Grade: "", qualityValue: "", 연마_효과: [] },
          { Name: "", Icon: "", Grade: "", qualityValue: "", 연마_효과: [] },
        ],
        반지: [
          { Name: "", Icon: "", Grade: "", qualityValue: "", 연마_효과: [] },
          { Name: "", Icon: "", Grade: "", qualityValue: "", 연마_효과: [] },
        ],
      };
      const 장비 = {
        무기: {},
        투구: {},
        상의: {},
        하의: {},
        장갑: {},
        어깨: {},
      };

      row.forEach((element, i) => {
        const Type = element.Type;
        const Name = element.Name;
        const Icon = element.Icon;
        const Grade = element.Grade;
        let qualityValue;
        let 상급_재련;
        let 초월_등급;
        let 초월_레벨;
        const Elixir00 = {
          효과: "",
          레벨: "",
        };
        const Elixir01 = {
          효과: "",
          레벨: "",
        };
        let 아이템_레벨;

        const dat = JSON.parse(element.Tooltip);

        Object.keys(dat).forEach((dat_idx) => {
          const element_value = dat[dat_idx].value;
          if (!element_value) {
            return;
          }
          if (typeof element_value == "string") {
            if (element_value.indexOf("상급 재련") != -1) {
              상급_재련 = Number(
                element_value.match(
                  /\[상급 재련\]<\/FONT> <FONT COLOR='#FFD200'>(\d+)<\/FONT>단계<\/FONT>/
                )?.[1] || 0
              );
            }
            return;
          }
          if (["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
            if (
              "Element_000" in element_value &&
              typeof element_value.Element_000 == "object"
            ) {
              const Tooltip = element_value.Element_000.topStr;
              if (Tooltip) {
                if (Tooltip.indexOf("[초월]") != -1) {
                  const match = Tooltip.match(
                    /\[초월\]<\/FONT> <FONT COLOR='#FFD200'>(\d+)<\/FONT>단계.*?<\/img>(\d+)/
                  );

                  초월_등급 = Number(match?.[1] || 0);
                  초월_레벨 = Number(match?.[2] || 0);

                  전체_초월_등급 += 초월_등급;
                  전체_초월_레벨 += 초월_레벨;
                } else if (Tooltip.indexOf("[엘릭서]") != -1) {
                  var ElixirTooltip = element_value.Element_000.contentStr;
                  if (!ElixirTooltip) {
                    return;
                  }
                  if (ElixirTooltip.Element_000) {
                    const Elixir00Tooltip =
                      ElixirTooltip.Element_000.contentStr;

                    const match = Elixir00Tooltip.match(
                      /<\/FONT>\s*([가-힣\s()]+)\s<FONT color='#FFD200'>Lv\.(\d+)<\/FONT>/
                    );

                    Elixir00.효과 = match?.[1] || "";
                    Elixir00.레벨 = Number(match?.[2] || 0);
                    엘릭서_레벨 += Elixir00.레벨;
                  }

                  if (ElixirTooltip.Element_001) {
                    const Elixir01Tooltip =
                      ElixirTooltip.Element_001.contentStr;
                    const match = Elixir01Tooltip.match(
                      /<\/FONT>\s*([가-힣\s()]+)\s<FONT color='#FFD200'>Lv\.(\d+)<\/FONT>/
                    );
                    Elixir01.효과 = match?.[1] || "";
                    Elixir01.레벨 = Number(match?.[2] || 0);
                    엘릭서_레벨 += Elixir01.레벨;
                  }
                } else if (Tooltip.indexOf("연성 추가 효과") != -1) {
                  엘릭서_효과 = Tooltip.match(
                    /<FONT SIZE='12' color='#91FE02'>([가-힣\s]+?) \((\d)단계\)<\/FONT>/
                  )[1];
                }
              }
            } else if ("leftStr2" in element_value) {
              const Tooltip = element_value.leftStr2;

              아이템_레벨 = Number(
                Tooltip.match(
                  /<FONT SIZE='14'>아이템 레벨 (\d+) \(티어 4\)<\/FONT>/
                )?.[1] || 0
              );
            }
          }
          if (["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
            if ("qualityValue" in element_value) {
              qualityValue = element_value.qualityValue;
              if (Type != "무기") {
                방어구_품질 += element_value.qualityValue;
              }
            }
          } else if (
            ["목걸이", "귀걸이", "반지"].includes(Type) &&
            "qualityValue" in element_value
          ) {
            var isExisted = 0;
            if (악세[Type][isExisted].Name) {
              isExisted = 1;
            }

            악세[Type][isExisted]["Name"] = element["Name"];
            악세[Type][isExisted]["Icon"] = element["Icon"];
            악세[Type][isExisted]["Grade"] = element["Grade"];
            악세[Type][isExisted]["qualityValue"] =
              element_value["qualityValue"];
            악세_품질 += element_value["qualityValue"];

            const Tooltip = dat["Element_005"]["value"]["Element_001"];
            const matches = [
              ...Tooltip.matchAll(/>([^>]+ \+)([\d.]+)([^\s<]*)/g),
            ];

            matches.forEach((match) => {
              const name = match[1].trim(); // 효과 이름과 + 기호 추출
              const value = match[2].trim(); // 숫자 추출
              const unit = match[3].trim(); // 단위 추출 ('%' 또는 빈 문자열 등)

              악세[Type][isExisted].연마_효과.push({
                Name: name,
                Value: `${value}${unit}`,
              });
            });

            악세[Type][isExisted].연마_효과;
          }
        });
        if (["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
          장비[Type] = {
            Type,
            Name,
            Icon,
            Grade,
            qualityValue,
            상급_재련,
            초월_등급,
            초월_레벨,
            Elixir00,
            Elixir01,
            아이템_레벨,
          };
        }
      });
      return {
        전체_초월_등급,
        전체_초월_레벨,
        엘릭서_효과,
        엘릭서_레벨,
        방어구_품질,
        악세_품질,
        악세,
        장비,
      };
    }
    function _parseArmoryEngraving(row) {
      const downEngraving = {
        유물: "전설",
        전설: "영웅",
      };

      const ret = row.ArkPassiveEffects.map((element) => ({
        ...element,
        Grade:
          element.Level == 0 ? downEngraving[element.Grade] : element.Grade,
        Level: element.Level == 0 ? 4 : element.Level,
      }));
      return ret;
    }

    function _parseArmoryGem(row) {
      if (!row || !row.Gems?.length) {
        return {};
      }

      const ret = {
        option: {
          TenGup: 0,
          TenJak: 0,
          GupLevel: 0,
          GupNum: 0,
          JakLevel: 0,
          JakNum: 0,
          level: 0,
          num: 0,
        },
        Gems: [],
      };
      row.Gems.forEach((element) => {
        const dat = JSON.parse(element["Tooltip"]);
        let name = element["Name"].substring(
          element["Name"].indexOf("<FONT CO") + 22,
          element["Name"].indexOf("</FONT>")
        );
        let isGup = name.includes("겁화");
        let isMeul = name.includes("멸화");
        let isJak = name.includes("작열");
        let isHong = name.includes("홍염");
        let level = isMeul || isHong ? element["Level"] - 2 : element["Level"];

        if (level == 10) {
          if (isGup) {
            ret["option"]["TenGup"] += 1;
          } else if (isJak) {
            ret["option"]["TenJak"] += 1;
          }
        }
        ret["Gems"].push({ name, isGup, isMeul, isJak, isHong, level });
        if (isGup || isMeul) {
          ret["option"]["GupLevel"] += level;
          ret["option"]["GupNum"] += 1;
        } else {
          ret["option"]["JakLevel"] += level;
          ret["option"]["JakNum"] += 1;
        }
      });

      ret.option.level = ret.option.GupLevel + ret.option.JakLevel;
      ret.option.num = ret.option.GupNum + ret.option.JakNum;
      ret.option.GupLevel = ret.option.GupNum
        ? (ret.option.GupLevel / ret.option.GupNum).toFixed(2)
        : "0";

      ret.option.JakLevel = ret.option.JakNum
        ? (ret.option.JakLevel / ret.option.JakNum).toFixed(2)
        : "0";

      ret.option.level = ret.option.num
        ? (ret.option.level / ret.option.num).toFixed(2)
        : "0";

      return ret;
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

    function _pasreArkPassive(row) {
      let 진화;
      let 깨달음;
      let 도약;
      row.Points.forEach((element) => {
        if (element.Name == "진화") {
          진화 = element.Value;
        }
        if (element.Name == "깨달음") {
          깨달음 = element.Value;
        }
        if (element.Name == "도약") {
          도약 = element.Value;
        }
      });

      return { 진화, 깨달음, 도약 };
    }
  },

  async getCharacterInfoRaw(characterName) {
    try {
      const res = await getCharacterInfo(characterName);
      if (!res) {
        throw new Error("캐릭터 정보를 가져올 수 없습니다.");
      }

      // return res.ArmoryEquipment.filter((e) =>
      // ["목걸이", "귀걸이", "반지"].includes(e.Type)
      // ).map((e) => JSON.parse(e.Tooltip));
      return res;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
  },

  async isArkPassive(characterName) {
    try {
      const res = await getArkPassive(characterName);
      if (!res || !res.ArkPassive) {
        return false;
      }

      return res.ArkPassive.IsArkPassive;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }
  },
};
module.exports = CharacterService;

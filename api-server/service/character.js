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

        if (serverData[serverName]) {
          serverData[serverName].push(item);
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

      //250127 클래스 만으로 판단하고 있지만, 다른방법을 추가해야할지도?
      //딜세팅 서폿이라든가..
      const _딜러_여부 = !["도화가", "바드", "홀리나이트"].includes(
        res.ArmoryProfile.CharacterClassName
      );
      res.parseArmoryEquipment = _parseArmoryEquipment(
        res.ArmoryEquipment,
        _딜러_여부
      );
      res.parseArmoryEngraving = _parseArmoryEngraving(res.ArmoryEngraving);
      res.parseArmoryGem = _parseArmoryGem(res.ArmoryGem);
      res.parseArmoryCard = _parseArmoryCard(res.ArmoryCard);
      res.parseArkPassive = _pasreArkPassive(res.ArkPassive);

      const data = new CharacterGetCharacterInfoModel(res);

      return data;
    } catch (err) {
      throw new Error("Service Error", { cause: err });
    }

    function _parseArmoryEquipment(row, _딜러_여부 = true) {
      let 전체_초월_등급 = 0;
      let 전체_초월_레벨 = 0;

      let 엘릭서_효과;
      let 엘릭서_레벨 = 0;

      let 방어구_품질 = 0;
      let 악세_품질 = 0;
      let 악세_스탯_품질 = 0;

      const 악세 = {
        목걸이: [
          {
            Name: "",
            Icon: "",
            Grade: "",
            qualityValue: 0,
            statQuality: 0,
            연마_효과: [],
          },
        ],
        귀걸이: [
          {
            Name: "",
            Icon: "",
            Grade: "",
            qualityValue: 0,
            statQuality: 0,
            연마_효과: [],
          },
          {
            Name: "",
            Icon: "",
            Grade: "",
            qualityValue: 0,
            statQuality: 0,
            연마_효과: [],
          },
        ],
        반지: [
          {
            Name: "",
            Icon: "",
            Grade: "",
            qualityValue: 0,
            statQuality: 0,
            연마_효과: [],
          },
          {
            Name: "",
            Icon: "",
            Grade: "",
            qualityValue: 0,
            statQuality: 0,
            연마_효과: [],
          },
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
      const 어빌리티_스톤 = {
        Name: "",
        Icon: "",
        Grade: "",
        engravings00: { name: "", level: "" },
        engravings01: { name: "", level: "" },
        engravings02: { name: "", level: "" },
        levelBonus: 0,
      };
      const 팔찌 = {
        Name: "",
        Icon: "",
        Grade: "",
        effects: "",
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
        let 아이템_등급;

        const dat = JSON.parse(element.Tooltip);

        Object.keys(dat).forEach((dat_idx) => {
          const element_value = dat[dat_idx].value;
          if (!element_value) {
            return;
          }
          if (typeof element_value == "string") {
            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type) &&
              dat_idx == "Element_000"
            ) {
              아이템_등급 = Number(element_value.match(/\+(\d+)/)[1]);
            }
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
            var isExisted = 0; //귀걸이 목걸이 처럼 2개 끼는 애들을 위해서
            if (악세[Type][isExisted].Name) {
              isExisted = 1;
            }

            악세[Type][isExisted]["Name"] = element["Name"];
            악세[Type][isExisted]["Icon"] = element["Icon"];
            악세[Type][isExisted]["Grade"] = element["Grade"];
            악세[Type][isExisted]["qualityValue"] =
              element_value["qualityValue"];
            악세_품질 += element_value["qualityValue"];
            // 연마효과
            const Tooltip = dat["Element_005"]["value"]["Element_001"];
            const matches = [
              ...Tooltip.matchAll(/>([^>]+ \+)([\d.]+)([^\s<]*)/g),
            ];
            matches.forEach((match) => {
              const name = match[1].trim(); // 효과 이름과 + 기호 추출
              const value = match[2].trim(); // 숫자 추출
              const unit = match[3].trim(); // 단위 추출 ('%' 또는 빈 문자열 등)
              const grade = _4T_악세_등급(name, value, unit, _딜러_여부);

              악세[Type][isExisted].연마_효과.push({
                Name: name,
                Value: `${value}${unit}`,
                Grade: grade,
              });
            });

            //힘민지 품질계산

            const _연마_횟수 = 악세[Type][isExisted].연마_효과.length;
            const Tooltip2 = dat["Element_004"]["value"]["Element_001"];
            const matches2 = Tooltip2.match(/힘 \+(\d+)<BR>/);
            악세[Type][isExisted]["statQuality"] = _4T_악세_품질_계산(
              Type,
              Number(matches2[1]),
              _연마_횟수
            );
            악세_스탯_품질 += 악세[Type][isExisted]["statQuality"];
          } else if (Type == "어빌리티 스톤" && dat_idx == "Element_006") {
            어빌리티_스톤["Name"] = element["Name"];
            어빌리티_스톤["Icon"] = element["Icon"];
            어빌리티_스톤["Grade"] = element["Grade"];

            var myEngravingList;
            if (dat["Element_006"]["value"]["Element_000"]) {
              myEngravingList =
                dat["Element_006"]["value"]["Element_000"]["contentStr"];
            }

            [0, 1, 2].forEach((j) => {
              if (!myEngravingList || !myEngravingList[`Element_00${j}`]) {
                return;
              }
              const engravingText =
                myEngravingList[`Element_00${j}`]["contentStr"];

              // 각인 이름과 레벨 추출을 위한 정규식
              const matches = engravingText.match(
                /\[<FONT COLOR='#[A-F0-9]+'>([^<]+)<\/FONT>\].*?Lv\.(\d+)/
              );

              if (matches) {
                어빌리티_스톤[`engravings0${j}`] = {
                  name: matches[1], // 각인 이름
                  level: Number(matches[2]), // 각인 레벨
                };
              }
            });

            // 레벨 보너스 파싱
            if (myEngravingList && myEngravingList["Element_003"]) {
              const bonusText = myEngravingList["Element_003"]["contentStr"];
              const bonusMatch = bonusText.match(
                /레벨 보너스.*?기본 공격력 \+(\d+\.\d+)%/
              );
              if (bonusMatch) {
                어빌리티_스톤["levelBonus"] = Number(bonusMatch[1]);
              }
            }
          } else if (Type == "팔찌" && dat_idx == "Element_004") {
            팔찌["Name"] = element["Name"];
            팔찌["Icon"] = element["Icon"];
            팔찌["Grade"] = element["Grade"];

            const effectText = dat["Element_004"]["value"]["Element_001"];

            팔찌["effects"] = effectText;
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
            아이템_등급,
          };
        }
      });
      방어구_품질 = 방어구_품질 / 5;
      악세_품질 = 악세_품질 / 5;
      악세_스탯_품질 = 악세_스탯_품질 / 5;
      return {
        전체_초월_등급,
        전체_초월_레벨,
        엘릭서_효과,
        엘릭서_레벨,
        방어구_품질,
        악세_품질,
        악세_스탯_품질,
        악세,
        장비,
        어빌리티_스톤,
        팔찌,
      };
    }

    function _4T_악세_등급(name, value, unit, _딜러_여부 = true) {
      const _4T_딜러_특옵 = {
        // 목걸이
        "추가 피해 +": ["0.70", "1.60", "2.60"],
        "적에게 주는 피해 +": ["0.55", "1.20", "2.00"],

        //귀걸이
        "공격력 +": ["0.40", "0.95", "1.55"],
        "무기 공격력 +": ["0.80", "1.80", "3.00"],

        //반지
        "치명타 적중률 +": ["0.40", "0.95", "1.55"],
        "치명타 피해 +": ["1.10", "2.40", "4.00"],
      };

      const _4T_딜러_공용 = {
        "공격력 +": ["80", "195", "390"],
        "무기 공격력 +": ["195", "480", "960"],
      };

      const _4T_서폿_특옵 = {
        // 목걸이
        "세레나데, 신앙, 조화 게이지 획득량 +": ["1.60", "3.60", "6.00"],
        "낙인력 +": ["2.15", "4.80", "8.00"],

        //귀걸이
        // 250117 일기준으로 서폿특옵은 유효가 없다고함.
        "무기 공격력 +": ["0.80", "1.80", "3.00"],

        //반지
        "아군 공격력 강화 효과 +": ["1.35", "3.00", "5.00"],
        "아군 피해량 강화 효과 +": ["2.00", "4.50", "7.50"],
      };

      const _4T_서폿_공용 = {
        "무기 공격력 +": ["195", "480", "960"],
        "최대 생명력 +": ["1300", "3250", "6500"],
      };

      var index = -1;
      if (_딜러_여부) {
        if (_4T_딜러_특옵[name]) {
          index = _4T_딜러_특옵[name].findIndex((e) => e == value);
          if (index != -1) {
            return _악세_등급_계산(index, false);
          }
        }
        if (_4T_딜러_공용[name]) {
          index = _4T_딜러_공용[name].findIndex((e) => e == value);
          return _악세_등급_계산(index, true);
        }
      } else {
        if (_4T_서폿_특옵[name]) {
          index = _4T_서폿_특옵[name].findIndex((e) => e == value);
          if (index != -1) {
            return _악세_등급_계산(index, false);
          }
        }
        if (_4T_서폿_공용[name]) {
          index = _4T_서폿_공용[name].findIndex((e) => e == value);
          return _악세_등급_계산(index, true);
        }
      }

      return "";
    }

    function _악세_등급_계산(index, _공용_여부 = false) {
      if (index == -1) {
        return "";
      }

      switch (index) {
        case 0:
          return _공용_여부 ? "공용 하" : "하";
        case 1:
          return _공용_여부 ? "공용 중" : "중";
        case 2:
          return _공용_여부 ? "공용 상" : "상";
        default:
          return "";
      }
    }

    function _4T_악세_품질_계산(Type, stats, _연마_횟수) {
      const _품질_최대 = {
        목걸이: [15357, 15714, 16428, 17857],
        귀걸이: [11944, 12222, 12778, 13889],
        반지: [11091, 11349, 11865, 12897],
      };
      const _품질_최소 = {
        목걸이: [12678, 13035, 13749, 15178],
        귀걸이: [9861, 10139, 10695, 11806],
        반지: [9156, 9414, 9930, 10962],
      };

      if (isNaN(stats)) {
        return 0;
      }

      return (
        // 소수점 이하 버림 처리를 위해 Math.floor 사용
        Math.floor(
          100 -
            ((_품질_최대[Type][_연마_횟수] - stats) /
              (_품질_최대[Type][_연마_횟수] - _품질_최소[Type][_연마_횟수])) *
              100
        )
      );
    }

    function _parseArmoryEngraving(row) {
      const downEngraving = {
        유물: "전설",
        전설: "영웅",
      };

      let EngravingSum = 0;

      const ret = row.ArkPassiveEffects.map((element) => {
        const retElement = {
          ...element,
          Grade:
            element.Level == 0 ? downEngraving[element.Grade] : element.Grade,
          Level: element.Level == 0 ? 4 : element.Level,
        };

        if (retElement.Grade == "유물") {
          EngravingSum += retElement.Level * 5;
        }

        return retElement;
      });

      ret["EngravingSum"] = EngravingSum;
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
          return;
        } else if (
          element["Items"][2]["Name"].includes("세상을 구하는 빛 6세트")
        ) {
          AwakeName += "세구빛";
        } else if (element["Items"][2]["Name"].includes("알고 보면 6세트")) {
          AwakeName += "알고보면";
        } else if (
          element["Items"][2]["Name"].includes("너는 계획이 다 있구나 6세트")
        ) {
          AwakeName += "너계획";
        } else if (
          element["Items"][2]["Name"].includes("남겨진 바람의 절벽 6세트")
        ) {
          AwakeName += "남바절";
        } else if (element["Items"][2]["Name"].includes("창의 달인 6세트")) {
          AwakeName += "창의달인";
        } else if (
          element["Items"][2]["Name"].includes("카제로스의 군단장 6세트")
        ) {
          AwakeName += "암구빛";
        } else if (
          element["Items"][2]["Name"].includes("힘찬 화염의 숨결 6세트")
        ) {
          AwakeName += "화구빛";
        } else if (
          element["Items"][2]["Name"].includes("거센 파도의 숨결 6세트")
        ) {
          AwakeName += "수구빛";
        } else if (
          element["Items"][2]["Name"].includes("날랜 뇌전의 숨결 6세트")
        ) {
          AwakeName += "뇌구빛";
        } else if (
          element["Items"][2]["Name"].includes("피어나는 화염의 가호 6세트")
        ) {
          AwakeName += "화바절";
        } else if (
          element["Items"][2]["Name"].includes("노래하는 파도의 가호 6세트")
        ) {
          AwakeName += "수바절";
        } else if (
          element["Items"][2]["Name"].includes("몰아치는 뇌전의 가호 6세트")
        ) {
          AwakeName += "뇌바절";
        } else if (
          element["Items"][2]["Name"].includes("굳센 대지의 숨결 6세트")
        ) {
          AwakeName += "토구빛";
        } else if (
          element["Items"][2]["Name"].includes("잠재우는 대지의 가호 6세트")
        ) {
          AwakeName += "토바절";
        } else if (
          element["Items"][2]["Name"].includes("세 우마르가 오리라 3세트")
        ) {
          if (AwakeName == "라제니스의 운명 2세트") {
            AwakeName = "세우라제";
          } else {
            AwakeName += "세우";
          }
        } else if (
          element["Items"][2]["Name"].includes("플라티나의 주민들 3세트")
        ) {
          if (AwakeName == "부르는 소리 있도다 3세트") {
            AwakeName = "플라부르";
          } else {
            AwakeName += "플라";
          }
        } else if (
          element["Items"][2]["Name"].includes("라제니스의 운명 2세트")
        ) {
          AwakeName += "라제";
        } else if (
          element["Items"][2]["Name"].includes("부르는 소리 있도다 3세트")
        ) {
          AwakeName += "부르";
        } else if (element["Items"][2]["Name"].includes("운명의 별 5세트")) {
          AwakeName += "운명";
        }
      });

      if (AwakeCount < 12) {
        AwakeCount = 0;
      } else if (AwakeCount < 18) {
        AwakeCount = 12;
      } else if (AwakeCount < 24) {
        AwakeCount = 18;
      } else if (AwakeCount < 30) {
        AwakeCount = 24;
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

// const pool = require("../models/pool");
const CharacterModel = require("../models/character.model");

const isJob = function (value) {
  const il = [
    "각성",
    "강령술",
    "강화 방패",
    "결투의 대가",
    "공격력 감소",
    "공격속도 감소",
    "구슬동자",
    "굳은 의지",
    "급소 타격",
    "기습의 대가",
    "긴급구조",
    "달인의 저력",
    "돌격대장",
    "마나 효율 증가",
    "마나의 흐름",
    "바리게이트",
    "방어력 감소",
    "번개의 분노",
    "부러진 뼈",
    "분쇄의 주먹",
    "불굴",
    "선수필승",
    "속전속결",
    "슈퍼 차지",
    "승부사",
    "시선 집중",
    "쉴드 관통",
    "아드레날린",
    "안정된 상태",
    "약자 무시",
    "에테르 포식자",
    "여신의 가호",
    "예리한 둔기",
    "원한",
    "위기 모면",
    "이동속도 감소",
    "저주받은 인형",
    "전문의",
    "정기 흡수",
    "정밀 단도",
    "중갑 착용",
    "질량 증가",
    "최대 마나 증가",
    "추진력",
    "타격의 대가",
    "탈출의 명수",
    "폭발물 전문가",
  ];

  if (il.includes(value)) return false;
  return true;
};

const NumberRegex = /[^0-9]/g;
const CharacterCardService = {
  async getCardData(characterName) {
    // const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      // await conn.beginTransaction();
      const res = await CharacterModel.getCharacter(characterName);
      var elixirLevel = 0;
      var transLevel = 0;
      var transGrade = 0;
      const data = {
        ArmoryProfile: {
          CharacterImage: "",
          ExpeditionLevel: "",
          PvpGradeName: "",
          TownLevel: "",
          TownName: "",
          Title: "",
          GuildMemberGrade: "",
          GuildName: "",
          UsingSkillPoint: "",
          TotalSkillPoint: "",
          Stats: {
            치명: "",
            특화: "",
            제압: "",
            신속: "",
            인내: "",
            숙련: "",
            "최대 생명력": "",
            공격력: "",
          },
          Tendencies: { 지성: "", 담력: "", 매력: "", 친절: "" },
          ServerName: "",
          CharacterName: "",
          CharacterLevel: "",
          CharacterClassName: "",
          ItemAvgLevel: "",
          ItemMaxLevel: "",
        },
        ArmoryEquipment: {
          무기: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            SetName: "",
            SetLevel: "",
          },
          투구: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir00: { name: "", level: "" },
            Elixir01: { name: "", level: "" },
            SetName: "",
            SetLevel: "",
          },
          상의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir00: { name: "", level: "" },
            Elixir01: { name: "", level: "" },
            SetName: "",
            SetLevel: "",
          },
          하의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir00: { name: "", level: "" },
            Elixir01: { name: "", level: "" },
            SetName: "",
            SetLevel: "",
          },
          장갑: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir00: { name: "", level: "" },
            Elixir01: { name: "", level: "" },
            SetName: "",
            SetLevel: "",
          },
          어깨: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir00: { name: "", level: "" },
            Elixir01: { name: "", level: "" },
            SetName: "",
            SetLevel: "",
          },
          목걸이: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            qualityValue: "", //품질
            Stats: {},
            engravings00: { name: "", level: "" },
            engravings01: { name: "", level: "" },
            engravings02: { name: "", level: "" },
          },
          귀걸이: [
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings00: { name: "", level: "" },
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
            },
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings00: { name: "", level: "" },
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
            },
          ],
          반지: [
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings00: { name: "", level: "" },
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
            },
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings00: { name: "", level: "" },
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
            },
          ],
          "어빌리티 스톤": {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            engravings00: { name: "", level: "" },
            engravings01: { name: "", level: "" },
            engravings02: { name: "", level: "" },
          },
          팔찌: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            Stats: {},
            OptionName1: { name: "", effect: "" },
            OptionName2: { name: "", effect: "" },
            OptionName3: { name: "", effect: "" },
            OptionName4: { name: "", effect: "" },
          },
          나침반: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
          부적: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
          문장: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
          option: {
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            ElixirName: "",
            ElixirLevel: "",
            SetNames: {},
            SetOption: "",
            SetLevel: "지원안함",
            ArmourAvg: 0,
            AccAvg: 0,
          },
        },
        ArmoryEngraving: {
          fullEffects: [],
          Level: "",
          JobEffects: [],
          Effects: [],
        },
        ArmoryGem: {
          option: {
            MeulLevel: 0,
            MeulNum: 0,
            HongLevel: 0,
            HongNum: 0,
            Level: 0,
            Num: 0,
            TenMeul: 0,
            TenHong: 0,
          },
          Gems: [],
        },
        ArmoryCard: {},
        MainStat: {
          statName: "",
          statValue: 0,
        },
      };

      // Object.keys(res).forEach((sub) => {
      //   console.log(sub);
      // });
      var isEsdo = false;

      Object.keys(data).forEach((sub) => {
        if (sub == "ArmoryProfile") {
          Object.keys(data[sub]).forEach((key) => {
            if (typeof data[sub][key] == "object") {
              res[sub][key].forEach((element) => {
                data[sub][key][element["Type"]] = element["Value"]
                  ? element["Value"]
                  : element["Point"];
              });
            } else {
              data[sub][key] = res[sub][key];
            }
          });
        } else if (sub == "ArmoryEquipment") {
          Object.keys(res[sub]).forEach((element, i) => {
            const Type = res[sub][element]["Type"];

            data[sub][Type]["Name"] = res[sub][element]["Name"];
            data[sub][Type]["Icon"] = res[sub][element]["Icon"];
            data[sub][Type]["Grade"] = res[sub][element]["Grade"];
            const dat = JSON.parse(res[sub][i]["Tooltip"]);

            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)
            ) {
              data[sub][Type]["ItemGrade"] = parseInt(
                res[sub][element]["Name"].replace(NumberRegex, "")
              );
            }

            if (["투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
              var isTrans = true;
              var isElixir = true;
              var whereElixir = 9;
              if (data[sub][Type]["ItemGrade"] == 25) {
                whereElixir -= 1;
              }
              var TransTooltip =
                dat[`Element_00${whereElixir - 1}`]["value"]["Element_000"];
              var ElixirTooltip =
                dat[`Element_00${whereElixir}`]["value"]["Element_000"];

              if (
                isTrans &&
                (!TransTooltip["topStr"] ||
                  (TransTooltip["topStr"] &&
                    TransTooltip["topStr"].indexOf("초월") == -1))
              ) {
                isTrans = false;
                whereElixir -= 1;
                ElixirTooltip = TransTooltip;
                TransTooltip = undefined;
              }

              if (
                isElixir &&
                (!ElixirTooltip["topStr"] ||
                  (ElixirTooltip["topStr"] &&
                    ElixirTooltip["topStr"].indexOf("엘릭서") == -1))
              ) {
                isElixir = false;
                whereElixir -= 1;
                ElixirTooltip = undefined;
              }
              if (isTrans) TransTooltip = TransTooltip["topStr"];

              if (isTrans) {
                data[sub][Type]["TransGrade"] = Number(
                  TransTooltip.substr(
                    TransTooltip.indexOf("<FONT COLOR='#FFD200'>") + 22,
                    1
                  )
                );
                data[sub][Type]["TransLevel"] = Number(
                  TransTooltip.substr(TransTooltip.indexOf("</img>") + 6)
                );
                transGrade += data[sub][Type]["TransGrade"];
                transLevel += data[sub][Type]["TransLevel"];
              }
              if (isElixir && ElixirTooltip["contentStr"]["Element_000"]) {
                const Elixir00Tooltip =
                  ElixirTooltip["contentStr"]["Element_000"][
                    "contentStr"
                  ].substring(4);

                data[sub][Type]["Elixir00"]["name"] = Elixir00Tooltip.substring(
                  Elixir00Tooltip.indexOf("</FONT>") + 8,
                  Elixir00Tooltip.indexOf(" <FONT color='#FFD200'>")
                );
                data[sub][Type]["Elixir00"]["level"] = Number(
                  Elixir00Tooltip.substr(
                    Elixir00Tooltip.indexOf("<FONT color='#FFD200'>Lv.") + 25,
                    1
                  )
                );
                elixirLevel += data[sub][Type]["Elixir00"]["level"];
              }
              if (isElixir && ElixirTooltip["contentStr"]["Element_001"]) {
                const Elixir01Tooltip =
                  ElixirTooltip["contentStr"]["Element_001"][
                    "contentStr"
                  ].substring(4);
                data[sub][Type]["Elixir01"]["name"] = Elixir01Tooltip.substring(
                  Elixir01Tooltip.indexOf("</FONT>") + 8,
                  Elixir01Tooltip.indexOf(" <FONT color='#FFD200'>")
                );
                data[sub][Type]["Elixir01"]["level"] = Number(
                  Elixir01Tooltip.substr(
                    Elixir01Tooltip.indexOf("<FONT color='#FFD200'>Lv.") + 25,
                    1
                  )
                );
                elixirLevel += data[sub][Type]["Elixir01"]["level"];
              }
            }

            if (Type == "투구" && isElixir) {
              var myElixir = "";

              myElixir =
                dat[
                  `Element_0${whereElixir + 1 > 9 ? "" : "0"}${whereElixir + 1}`
                ]["value"]["Element_000"]["topStr"];

              if (myElixir) {
                data[sub]["option"]["ElixirName"] = myElixir.substring(
                  myElixir.indexOf("><FONT SIZE='12'") + 33,
                  myElixir.indexOf(")</FONT>") - 5
                );
              }
            }

            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)
            ) {
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
              if (Type != "무기") {
                data[sub]["option"]["ArmourAvg"] +=
                  dat["Element_001"]["value"]["qualityValue"];
              }

              var whereSet = 8;
              if (data[sub][Type]["ItemGrade"] == 25) {
                whereSet -= 1;
              }
              if (Type != "무기") {
                if (isElixir) {
                  whereSet += 1;
                }
                if (isTrans) {
                  whereSet += 1;
                }
              }
              if (
                ["투구", "장갑"].includes(Type) &&
                dat[`Element_0${whereSet > 9 ? "" : "0"}${whereSet}`]["type"] ==
                  "IndentStringGroup"
              ) {
                whereSet += 1;
              }

              var mySetOption =
                dat[`Element_0${whereSet > 9 ? "" : "0"}${whereSet}`]["value"][
                  "Element_001"
                ];
              if (Type == "무기" && mySetOption.indexOf("장갑") != -1) {
                //에스더면
                isEsdo = true;
              } else {
                data[sub][Type]["SetName"] = mySetOption.split(
                  " <FONT COLOR='#FFD200'>Lv."
                )[0];
                data[sub][Type]["SetLevel"] = Number(
                  mySetOption.split(" <FONT COLOR='#FFD200'>Lv.")[1][0]
                );
                if (
                  data[sub]["option"]["SetNames"][data[sub][Type]["SetName"]]
                ) {
                  data[sub]["option"]["SetNames"][
                    data[sub][Type]["SetName"]
                  ] += 1;
                } else {
                  data[sub]["option"]["SetNames"][
                    data[sub][Type]["SetName"]
                  ] = 1;
                }
              }
            } else if (Type == "목걸이") {
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
              data[sub]["option"]["AccAvg"] +=
                dat["Element_001"]["value"]["qualityValue"];
            }

            if (Type == "목걸이") {
              const myStats =
                dat["Element_005"]["value"]["Element_001"].split("<BR>");

              myStats.forEach((element) => {
                data[sub][Type]["Stats"][
                  element.substring(0, element.indexOf("+") - 1)
                ] = Number(element.substr(element.indexOf("+")));
              });
            }

            if (["귀걸이", "반지"].includes(Type)) {
              var isExisted = 0;
              if (data[sub][Type][isExisted]["Name"]) {
                isExisted = 1;
              }

              data[sub][Type][isExisted]["Name"] = res[sub][element]["Name"];
              data[sub][Type][isExisted]["Icon"] = res[sub][element]["Icon"];
              data[sub][Type][isExisted]["Grade"] = res[sub][element]["Grade"];
              data[sub][Type][isExisted]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
              data[sub]["option"]["AccAvg"] +=
                dat["Element_001"]["value"]["qualityValue"];

              const ringTooltip = dat["Element_005"]["value"]["Element_001"];
              data[sub][Type][isExisted]["Stats"][
                dat["Element_005"]["value"]["Element_001"].substring(
                  0,
                  ringTooltip.indexOf("+") - 1
                )
              ] = Number(ringTooltip.substr(ringTooltip.indexOf("+")));

              [0, 1, 2].forEach((j) => {
                const myEngraving =
                  dat["Element_006"]["value"]["Element_000"]["contentStr"][
                    `Element_00${j}`
                  ]["contentStr"];
                data[sub][Type][isExisted][`engravings0${j}`]["name"] =
                  myEngraving.substring(
                    myEngraving.indexOf("<FONT COLOR") + 22,
                    myEngraving.indexOf("</FONT>")
                  );
                data[sub][Type][isExisted][`engravings0${j}`]["level"] = Number(
                  myEngraving.substr(myEngraving.indexOf("활성도 +") + 5, 1)
                );
              });
            }
            if (["목걸이", "어빌리티 스톤"].includes(Type)) {
              var myEngravingList;
              if (dat["Element_006"]["value"]["Element_000"]) {
                myEngravingList =
                  dat["Element_006"]["value"]["Element_000"]["contentStr"];
              } else {
                myEngravingList =
                  dat["Element_005"]["value"]["Element_000"]["contentStr"];
              }
              [0, 1, 2].forEach((j) => {
                const myEngraving =
                  myEngravingList[`Element_00${j}`]["contentStr"];
                data[sub][Type][`engravings0${j}`]["name"] =
                  myEngraving.substring(
                    myEngraving.indexOf("<FONT COLOR") + 22,
                    myEngraving.indexOf("</FONT>")
                  );
                data[sub][Type][`engravings0${j}`]["level"] = Number(
                  myEngraving.substr(myEngraving.indexOf("활성도 +") + 5, 2) ==
                    "10"
                    ? myEngraving.substr(myEngraving.indexOf("활성도 +") + 5, 2)
                    : myEngraving.substr(myEngraving.indexOf("활성도 +") + 5, 1)
                );
                // console.log(myEngraving);
              });
            }
            // if (Type == "팔찌") {
            //   data[sub][Type]["ss"] =
            //     dat["Element_004"]["value"]["Element_001"];
            // }
          });
        } else if (sub == "ArmoryEngraving") {
          res[sub]["Effects"].forEach((element) => {
            const tmp = {};
            tmp["Icon"] = element["Icon"];
            const nameSplice = element["Name"].split(" Lv. ");
            tmp["Name"] = nameSplice[0];
            tmp["Level"] = Number(nameSplice[1]);
            if (isJob(tmp["Name"])) {
              data[sub]["JobEffects"].push(tmp);
            } else if (tmp["Level"] == 3) {
              data[sub]["fullEffects"].push(tmp);
            } else {
              data[sub]["Effects"].push(tmp);
            }
          });
        } else if (sub == "ArmoryGem" && res[sub]) {
          res[sub]["Gems"].forEach((element) => {
            const dat = JSON.parse(element["Tooltip"]);
            const tmp = {};
            tmp["Level"] = element["Level"];
            tmp["Name"] = element["Name"].substring(
              element["Name"].indexOf("<FONT CO") + 22,
              element["Name"].indexOf("</FONT>")
            );
            tmp["isMeul"] = tmp["Name"].includes("멸화");
            if (tmp["Level"] == 10) {
              if (tmp["Name"].includes("멸화")) {
                data[sub]["option"]["TenMeul"] += 1;
              } else {
                data[sub]["option"]["TenHong"] += 1;
              }
            }
            if (
              dat["Element_004"]["value"]["Element_001"].includes(
                data["ArmoryProfile"]["CharacterClassName"]
              )
            ) {
              data[sub]["Gems"].push(tmp);
              if (tmp["isMeul"]) {
                data[sub]["option"]["MeulLevel"] += tmp["Level"];
                data[sub]["option"]["MeulNum"] += 1;
              } else {
                data[sub]["option"]["HongLevel"] += tmp["Level"];
                data[sub]["option"]["HongNum"] += 1;
              }
            }
          });
        } else if (sub == "ArmoryCard") {
          var AwakeCount = 0;
          var AwakeName = "지원안함";

          res[sub]["Cards"].forEach((element) => {
            AwakeCount += element["AwakeCount"];
          });

          if (res[sub]["Effects"][0]["Items"][2]["Name"].includes("빛 6세트")) {
            AwakeName = "세구빛";
          } else if (
            res[sub]["Effects"][0]["Items"][2]["Name"].includes("장 6세트")
          ) {
            AwakeName = "암구빛";
          } else if (
            res[sub]["Effects"][0]["Items"][2]["Name"].includes("벽 6세트")
          ) {
            AwakeName = "남바절";
          } else if (
            res[sub]["Effects"][0]["Items"][2]["Name"].includes("인 6세트")
          ) {
            AwakeName = "창달";
          }
          if (AwakeName == "남바절") {
            if (AwakeCount < 12) {
              AwakeCount = 0;
            } else if (AwakeCount < 18) {
              AwakeCount = 12;
            } else if (AwakeCount < 30) {
              AwakeCount = 18;
            }
          } else {
            if (AwakeCount < 18) {
              AwakeCount = 0;
            } else if (AwakeCount < 30) {
              AwakeCount = 18;
            }
          }

          data[sub] = { ...res[sub], AwakeCount, AwakeName };
        }
      });
      Object.keys(data["ArmoryProfile"]["Stats"]).forEach((key) => {
        if (key != "공격력" && key != "최대 생명력") {
          if (
            data["MainStat"]["statValue"] <
            Number(data["ArmoryProfile"]["Stats"][key])
          ) {
            data["MainStat"]["statValue"] = Number(
              data["ArmoryProfile"]["Stats"][key]
            );
            data["MainStat"]["statName"] = key;
          }
        }
      });

      data["ArmoryEquipment"]["option"]["TransGrade"] = transGrade / 5;
      data["ArmoryEquipment"]["option"]["TransLevel"] = transLevel;
      data["ArmoryEquipment"]["option"]["ElixirLevel"] = elixirLevel;
      if (data["ArmoryEquipment"]["option"]["ElixirName"].includes("<FONT")) {
        data["ArmoryEquipment"]["option"]["ElixirName"] = "";
      }

      if (isEsdo) {
        data["ArmoryEquipment"]["무기"]["SetName"] =
          data["ArmoryEquipment"]["장갑"]["SetName"];
        data["ArmoryEquipment"]["무기"]["SetLevel"] =
          data["ArmoryEquipment"]["장갑"]["SetLevel"];

        data["ArmoryEquipment"]["option"]["SetNames"][
          data["ArmoryEquipment"]["무기"]["SetName"]
        ] += 1;
      }
      Object.keys(data["ArmoryEquipment"]["option"]["SetNames"]).forEach(
        (option) => {
          if (
            Object.keys(data["ArmoryEquipment"]["option"]["SetNames"]).length >
            1
          ) {
            data["ArmoryEquipment"]["option"]["SetOption"] +=
              data["ArmoryEquipment"]["option"]["SetNames"][option] + option[0];
          } else {
            data["ArmoryEquipment"]["option"]["SetOption"] +=
              data["ArmoryEquipment"]["option"]["SetNames"][option] + option;
          }
        }
      );
      data["ArmoryEquipment"]["option"]["ArmourAvg"] /= 5;
      data["ArmoryEquipment"]["option"]["AccAvg"] /= 5;

      var engravingLevel = "";
      data["ArmoryEngraving"]["fullEffects"].forEach(() => {
        engravingLevel += "3";
      });
      data["ArmoryEngraving"]["Effects"].forEach((element) => {
        engravingLevel += String(element["Level"]);
      });
      data["ArmoryEngraving"]["Level"] = engravingLevel;

      data["ArmoryGem"]["option"]["Level"] =
        data["ArmoryGem"]["option"]["HongLevel"] +
        data["ArmoryGem"]["option"]["MeulLevel"];
      data["ArmoryGem"]["option"]["Num"] =
        data["ArmoryGem"]["option"]["HongNum"] +
        data["ArmoryGem"]["option"]["MeulNum"];
      data["ArmoryGem"]["option"]["HongLevel"] = data["ArmoryGem"]["option"][
        "HongNum"
      ]
        ? (
            data["ArmoryGem"]["option"]["HongLevel"] /
            data["ArmoryGem"]["option"]["HongNum"]
          ).toFixed(2)
        : undefined;
      data["ArmoryGem"]["option"]["MeulLevel"] = data["ArmoryGem"]["option"][
        "MeulNum"
      ]
        ? (
            data["ArmoryGem"]["option"]["MeulLevel"] /
            data["ArmoryGem"]["option"]["MeulNum"]
          ).toFixed(2)
        : undefined;
      data["ArmoryGem"]["option"]["Level"] = data["ArmoryGem"]["option"]["Num"]
        ? (
            data["ArmoryGem"]["option"]["Level"] /
            data["ArmoryGem"]["option"]["Num"]
          ).toFixed(2)
        : undefined;
      // DB에 작업 반영
      // await conn.commit();
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      // await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      // pool.releaseConnection(conn);
    }
  },
};
module.exports = CharacterCardService;

const pool = require("../models/pool");
const CharacterModel = require("../models/character.model");

// {
//   Name: "", //이름
//   Icon: "", //아이콘
//   Grade: "", //등급(고대)
//   ItemGrade: "", //아이템강화단계
//   ItemLevel: "", //아이템레벨
//   qualityValue: "", //품질
//   MainPower: {}, //기본효과
//   PlusPower: {}, //추가효과
//   TransGrade: "", //초월단계
//   TransLevel: "", //초월레벨
//   IsCommon01: "", //공용엘릭서
//   Option01: "", //엘릭서옵션
//   Level01: "", //엘릭서레벨
//   IsCommon02: "", //공용엘릭서
//   Option02: "", //엘릭서옵션
//   Level02: "", //엘릭서레벨
//   IsCommon03: "", //공용엘릭서
//   Option03: "", //엘릭서옵션
//   Level03: "", //엘릭서레벨
//   SetOption: "", //세트옵션
//   SetOptionLevel: "", //옵션레벨
// },

const NumberRegex = /[^0-9]/g;
const CharacterCardService = {
  async getCardData(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
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
          },
          Gems: [],
        },
        ArmoryCard: {},
      };

      Object.keys(res).forEach((sub) => {
        console.log(sub);
      });

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

            var isTrans = true;
            var isElixir = true;

            if (["투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
              var TransTooltip = dat["Element_008"]["value"]["Element_000"]
                ? dat["Element_008"]["value"]["Element_000"]
                : undefined;
              var ElixirTooltip = dat["Element_009"]["value"]["Element_000"]
                ? dat["Element_009"]["value"]["Element_000"]
                : undefined;

              if (!ElixirTooltip) {
                isTrans = false;
                if (!TransTooltip) {
                  isElixir = false;
                } else {
                  ElixirTooltip = TransTooltip;
                  TransTooltip = undefined;
                }
              }

              if (
                isTrans &&
                (!TransTooltip["topStr"] ||
                  (TransTooltip["topStr"] &&
                    TransTooltip["topStr"].indexOf("초월") == -1))
              ) {
                isTrans = false;
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
              if (isTrans) {
                myElixir = dat["Element_010"]["value"]["Element_000"]["topStr"];
              } else {
                myElixir = dat["Element_009"]["value"]["Element_000"]["topStr"];
              }
              data[sub]["option"]["ElixirName"] = myElixir.substring(
                myElixir.indexOf("><FONT SIZE='12'") + 33,
                myElixir.indexOf(")</FONT>") - 5
              );
            }

            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)
            ) {
              data[sub][Type]["ItemGrade"] = parseInt(
                res[sub][element]["Name"].replace(NumberRegex, "")
              );
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];

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
                data[sub]["option"]["ElixirName"]
              ) {
                whereSet += 1;
              }

              var mySetOption =
                dat[`Element_0${whereSet > 9 ? "" : "0"}${whereSet}`]["value"][
                  "Element_001"
                ];

              data[sub][Type]["SetName"] = mySetOption.split(
                " <FONT COLOR='#FFD200'>Lv."
              )[0];
              data[sub][Type]["SetLevel"] = Number(
                mySetOption.split(" <FONT COLOR='#FFD200'>Lv.")[1][0]
              );

              if (data[sub]["option"]["SetNames"][data[sub][Type]["SetName"]]) {
                data[sub]["option"]["SetNames"][
                  data[sub][Type]["SetName"]
                ] += 1;
              } else {
                data[sub]["option"]["SetNames"][data[sub][Type]["SetName"]] = 1;
              }
            } else if (Type == "목걸이") {
              data[sub][Type]["qualityValue"] =
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

              const ringTooltip = dat["Element_005"]["value"]["Element_001"];
              data[sub][Type][isExisted]["Stats"][
                dat["Element_005"]["value"]["Element_001"].substring(
                  0,
                  ringTooltip.indexOf("+") - 1
                )
              ] = Number(ringTooltip.substr(ringTooltip.indexOf("+")));

              [0, 1, 2].forEach((i) => {
                const myEngraving =
                  dat["Element_006"]["value"]["Element_000"]["contentStr"][
                    `Element_00${i}`
                  ]["contentStr"];
                data[sub][Type][isExisted][`engravings0${i}`]["name"] =
                  myEngraving.substring(
                    myEngraving.indexOf("<FONT COLOR") + 22,
                    myEngraving.indexOf("</FONT>")
                  );
                data[sub][Type][isExisted][`engravings0${i}`]["level"] = Number(
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
              [(0, 1, 2)].forEach((i) => {
                const myEngraving =
                  myEngravingList[`Element_00${i}`]["contentStr"];
                data[sub][Type][`engravings0${i}`]["name"] =
                  myEngraving.substring(
                    myEngraving.indexOf("<FONT COLOR") + 22,
                    myEngraving.indexOf("</FONT>")
                  );
                data[sub][Type][`engravings0${i}`]["level"] = Number(
                  myEngraving.substr(myEngraving.indexOf("활성도 +") + 5, 1)
                );
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
            if (tmp["Level"] == 3) {
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
      data["ArmoryEquipment"]["option"]["TransGrade"] = transGrade / 5;
      data["ArmoryEquipment"]["option"]["TransLevel"] = transLevel;
      data["ArmoryEquipment"]["option"]["ElixirLevel"] = elixirLevel;
      if (data["ArmoryEquipment"]["option"]["ElixirName"].includes("<FONT")) {
        data["ArmoryEquipment"]["option"]["ElixirName"] = "";
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
      data["ArmoryGem"]["option"]["HongLevel"] =
        data["ArmoryGem"]["option"]["HongLevel"] /
        data["ArmoryGem"]["option"]["HongNum"];
      data["ArmoryGem"]["option"]["MeulLevel"] =
        data["ArmoryGem"]["option"]["MeulLevel"] /
        data["ArmoryGem"]["option"]["MeulNum"];
      data["ArmoryGem"]["option"]["Level"] =
        data["ArmoryGem"]["option"]["Level"] /
        data["ArmoryGem"]["option"]["Num"];
      // DB에 작업 반영
      await conn.commit();
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
};
module.exports = CharacterCardService;

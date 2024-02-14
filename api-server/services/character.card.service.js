const pool = require("../models/pool");
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
    "바리케이드",
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

const isGongElixer = function (elixer) {
  const GongElixer = [
    "공격력",
    "마나",
    "무기 공격력",
    "무력화",
    "물약중독",
    "힘",
    "민첩",
    "지능",
    "방랑자",
    "생명의 축복",
    "자원의 축복",
    "탈출의 달인",
    "폭발물 달인",
    "회피의 달인",
  ];
  if (GongElixer.includes(elixer)) return true;
  return false;
};

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
            HighLevel: 0,
            ItemLevel: "",
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
            HighLevel: 0,
            ItemLevel: "",
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
            HighLevel: 0,
            ItemLevel: "",
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
            HighLevel: 0,
            ItemLevel: "",
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
            HighLevel: 0,
            ItemLevel: "",
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
            HighLevel: 0,
            ItemLevel: "",
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
            LetStats: {},
            LetOptions: {},
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
            LetSum: 0,
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
        SubStat: {
          statName: "",
          statValue: 0,
        },
        Collectibles: {},
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
                if (element) {
                  data[sub][key][element["Type"]] = element["Value"]
                    ? element["Value"]
                    : element["Point"];
                }
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
            // 데이터 확인용
            data[sub][Type]["aa"] = dat;

            Object.keys(dat).forEach((element_idx) => {
              var element_value = dat[element_idx]["value"];
              if (typeof element_value == "string") {
                if (element_value.indexOf("상급 재련") != -1) {
                  data[sub][Type]["HighLevel"] = Number(
                    element_value
                      .split("[상급 재련]</FONT> <FONT COLOR='#FFD200'>")[1]
                      .split("</FONT>단계</FONT>")[0]
                  );
                }
              } else {
                Object.keys(element_value).forEach((element_index) => {
                  if (
                    ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(
                      Type
                    ) &&
                    element_index == "Element_000"
                  ) {
                    var Tooltip = element_value[element_index]["topStr"];
                    if (Tooltip) {
                      if (Tooltip.indexOf("[초월]") != -1) {
                        data[sub][Type]["TransGrade"] = Number(
                          Tooltip.substr(
                            Tooltip.indexOf("<FONT COLOR='#FFD200'>") + 22,
                            1
                          )
                        );
                        data[sub][Type]["TransLevel"] = Number(
                          Tooltip.substr(Tooltip.indexOf("</img>") + 6)
                        );
                        transGrade += data[sub][Type]["TransGrade"];
                        transLevel += data[sub][Type]["TransLevel"];
                      } else if (Tooltip.indexOf("엘릭서 효과") != -1) {
                        var ElixirTooltip =
                          element_value[element_index]["contentStr"];
                        if (ElixirTooltip) {
                          const Elixir00Tooltip =
                            ElixirTooltip["Element_000"][
                              "contentStr"
                            ].substring(4);
                          data[sub][Type]["Elixir00"]["name"] =
                            Elixir00Tooltip.substring(
                              Elixir00Tooltip.indexOf("</FONT>") + 8,
                              Elixir00Tooltip.indexOf(" <FONT color='#FFD200'>")
                            );
                          data[sub][Type]["Elixir00"]["level"] = Number(
                            Elixir00Tooltip.substr(
                              Elixir00Tooltip.indexOf(
                                "<FONT color='#FFD200'>Lv."
                              ) + 25,
                              1
                            )
                          );
                          elixirLevel += data[sub][Type]["Elixir00"]["level"];
                        }
                        const Elixir01Tooltip =
                          ElixirTooltip["Element_001"]["contentStr"].substring(
                            4
                          );

                        data[sub][Type]["Elixir01"]["name"] =
                          Elixir01Tooltip.substring(
                            Elixir01Tooltip.indexOf("</FONT>") + 8,
                            Elixir01Tooltip.indexOf(" <FONT color='#FFD200'>")
                          );
                        data[sub][Type]["Elixir01"]["level"] = Number(
                          Elixir01Tooltip.substr(
                            Elixir01Tooltip.indexOf(
                              "<FONT color='#FFD200'>Lv."
                            ) + 25,
                            1
                          )
                        );
                        elixirLevel += data[sub][Type]["Elixir01"]["level"];
                      } else if (Tooltip.indexOf("연성 추가 효과") != -1) {
                        if (Tooltip) {
                          data[sub]["option"]["ElixirName"] = Tooltip.substring(
                            Tooltip.indexOf("><FONT SIZE='12'") + 33,
                            Tooltip.indexOf(")</FONT>") - 5
                          );
                        }
                      }
                    } else {
                      // console.log(element_value[element_index]);
                      if (
                        element_value[element_index].indexOf(
                          "세트 효과 레벨"
                        ) != -1
                      ) {
                        var mySetOption = element_value["Element_001"];
                        data[sub][Type]["SetName"] = mySetOption.split(
                          " <FONT COLOR='#FFD200'>Lv."
                        )[0];
                        data[sub][Type]["SetLevel"] = Number(
                          mySetOption.split(" <FONT COLOR='#FFD200'>Lv.")[1][0]
                        );
                        if (
                          data[sub]["option"]["SetNames"][
                            data[sub][Type]["SetName"]
                          ]
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
                    }
                  }
                  if (
                    ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(
                      Type
                    ) &&
                    element_index == "leftStr2"
                  ) {
                    Tooltip = element_value[element_index];
                    data[sub][Type]["ItemLevel"] = Tooltip.substring(
                      Tooltip.indexOf("<FONT SIZE='14'>아이템 레벨") + 23,
                      Tooltip.indexOf("(티어 3)</FONT>") - 1
                    );
                  } else if (
                    [
                      "무기",
                      "투구",
                      "상의",
                      "하의",
                      "장갑",
                      "어깨",
                      "목걸이",
                    ].includes(Type) &&
                    element_index == "qualityValue"
                  ) {
                    data[sub][Type][element_index] =
                      element_value[element_index];
                    if (Type != "무기" && Type != "목걸이") {
                      data[sub]["option"]["ArmourAvg"] +=
                        element_value[element_index];
                    }
                    if (Type == "목걸이") {
                      data[sub]["option"]["AccAvg"] +=
                        element_value[element_index];
                    }
                  } else if (
                    ["귀걸이", "반지"].includes(Type) &&
                    element_index == "qualityValue"
                  ) {
                    var isExisted = 0;
                    if (data[sub][Type][isExisted]["Name"]) {
                      isExisted = 1;
                    }

                    data[sub][Type][isExisted]["Name"] =
                      res[sub][element]["Name"];
                    data[sub][Type][isExisted]["Icon"] =
                      res[sub][element]["Icon"];
                    data[sub][Type][isExisted]["Grade"] =
                      res[sub][element]["Grade"];
                    data[sub][Type][isExisted][element_index] =
                      element_value[element_index];
                    data[sub]["option"]["AccAvg"] +=
                      element_value[element_index];

                    const ringTooltip =
                      dat["Element_005"]["value"]["Element_001"];
                    data[sub][Type][isExisted]["Stats"][
                      dat["Element_005"]["value"]["Element_001"].substring(
                        0,
                        ringTooltip.indexOf("+") - 1
                      )
                    ] = Number(ringTooltip.substr(ringTooltip.indexOf("+")));

                    [0, 1, 2].forEach((j) => {
                      if (
                        !dat["Element_006"]["value"]["Element_000"] ||
                        !dat["Element_006"]["value"]["Element_000"][
                          "contentStr"
                        ][`Element_00${j}`]
                      ) {
                        return false;
                      }
                      const myEngraving =
                        dat["Element_006"]["value"]["Element_000"][
                          "contentStr"
                        ][`Element_00${j}`]["contentStr"];
                      data[sub][Type][isExisted][`engravings0${j}`]["name"] =
                        myEngraving.substring(
                          myEngraving.indexOf("<FONT COLOR") + 22,
                          myEngraving.indexOf("</FONT>")
                        );
                      data[sub][Type][isExisted][`engravings0${j}`]["level"] =
                        Number(
                          myEngraving.substr(
                            myEngraving.indexOf("활성도 +") + 5,
                            1
                          )
                        );
                    });
                  }
                });
              }
            });

            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)
            ) {
              data[sub][Type]["ItemGrade"] = parseInt(
                res[sub][element]["Name"].substr(0, 4).replace(NumberRegex, "")
              );
            }

            if (["투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
              if (
                data[sub][Type]["Elixir00"]["name"] &&
                data[sub][Type]["Elixir00"]["name"]
              ) {
                if (isGongElixer(data[sub][Type]["Elixir00"]["name"])) {
                  [data[sub][Type]["Elixir00"], data[sub][Type]["Elixir01"]] = [
                    data[sub][Type]["Elixir01"],
                    data[sub][Type]["Elixir00"],
                  ];
                }
              }
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

            if (["목걸이", "어빌리티 스톤"].includes(Type)) {
              var myEngravingList;
              if (dat["Element_006"]["value"]["Element_000"]) {
                myEngravingList =
                  dat["Element_006"]["value"]["Element_000"]["contentStr"];
              } else {
                myEngravingList = dat["Element_005"]["value"]["Element_000"]
                  ? dat["Element_005"]["value"]["Element_000"]["contentStr"]
                  : "";
              }

              [0, 1, 2].forEach((j) => {
                if (!myEngravingList || !myEngravingList[`Element_00${j}`]) {
                  return false;
                }
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
            if (Type == "팔찌") {
              const myDatas =
                dat["Element_004"]["value"]["Element_001"].split("<BR>");
              myDatas.forEach((myData) => {
                if (myData.includes("[<FONT COLOR=''>")) {
                  data[sub][Type]["LetOptions"][
                    myData.substring(
                      myData.indexOf("[<FONT COLOR=''>") + 16,
                      myData.indexOf("</FONT>")
                    )
                  ] = 1;
                } else if (myData.includes("</img>")) {
                  const myStats = myData
                    .substring(myData.indexOf("</img>") + 6)
                    .split(" ");
                  var a = 0;
                  if (!myStats[0]) {
                    a = 1;
                  }
                  data[sub][Type]["LetStats"][myStats[a]] = Number(
                    myStats[a + 1].substr(1)
                  );
                }
              });
            }
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
            var isZero = false;
            if (dat["Element_002"]["value"].includes("귀속")) {
              isZero = true;
            }
            if (
              dat[`Element_00${isZero ? 5 : 4}`]["value"][
                "Element_001"
              ].includes(data["ArmoryProfile"]["CharacterClassName"])
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
          var AwakeName = "";

          res[sub]["Cards"].forEach((element) => {
            AwakeCount += element["AwakeCount"];
          });
          res[sub]["Effects"].forEach((element) => {
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
            } else if (
              element["Items"][2]["Name"].includes("운명의 별 5세트")
            ) {
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
          data[sub] = { ...res[sub], AwakeCount, AwakeName };
        } else if (sub == "Collectibles") {
          var dat = {};
          res[sub].forEach((element) => {
            var tmp = {
              Point: element["Point"],
              MaxPoint: element["MaxPoint"],
              Per: ((element["Point"] / element["MaxPoint"]) * 100).toFixed(0),
              Percent: (element["Point"] / element["MaxPoint"]).toFixed(2),
            };
            dat[element["Type"]] = tmp;
          });

          data[sub] = { ...dat };
        }
      });

      Object.keys(data["ArmoryProfile"]["Stats"]).forEach((key) => {
        if (key != "공격력" && key != "최대 생명력") {
          if (
            data["SubStat"]["statValue"] <
            Number(data["ArmoryProfile"]["Stats"][key])
          ) {
            data["SubStat"]["statValue"] = Number(
              data["ArmoryProfile"]["Stats"][key]
            );
            data["SubStat"]["statName"] = key;
          }
          if (
            data["MainStat"]["statValue"] <
            Number(data["ArmoryProfile"]["Stats"][key])
          ) {
            data["SubStat"]["statName"] = data["MainStat"]["statName"];
            data["SubStat"]["statValue"] = data["MainStat"]["statValue"];
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

      Object.keys(data["ArmoryEquipment"]["팔찌"]["LetStats"]).forEach(
        (key) => {
          if (["특화", "치명", "신속"].includes(key)) {
            data["ArmoryEquipment"]["option"]["LetSum"] +=
              data["ArmoryEquipment"]["팔찌"]["LetStats"][key];
          }
        }
      );
      data["ArmoryEquipment"]["option"]["LetSum"];

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
      const cardSort = function (a, b) {
        var Order = ["전설", "영웅", "고급", "희귀", "일반"];
        var indexA = Order.indexOf(a["Grade"]);
        var indexB = Order.indexOf(b["Grade"]);

        return indexA - indexB;
      };
      data["ArmoryCard"]["Cards"].sort(cardSort);
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

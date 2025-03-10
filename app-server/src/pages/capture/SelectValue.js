import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useDispatch, useSelector } from "react-redux";
import {
  setAcc,
  setFrontIcons,
  setFrontItems,
  setOptionItems,
} from "../../store/itemSlice";
import { toast } from "react-toastify";

const shortEngrav = function (eng) {
  if (eng == "아르데타인의 기술") {
    return "기술스카";
  } else if (eng == "멈출 수 없는 충동") {
    return "충모닉";
  } else {
    return eng;
  }
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

const shortElixer = function (elixer) {
  var ret = elixer;
  if (elixer == "마법 방어력") {
    ret = "마방";
  } else if (elixer == "물리 방어력") {
    ret = "물방";
  } else if (elixer == "받는 피해 감소") {
    ret = "받피감";
  } else if (elixer == "최대 생명력") {
    ret = "최생";
  } else if (elixer == "아이덴티티 획득") {
    ret = "아덴획득";
  } else if (elixer == "치명타 피해") {
    ret = "치피";
  }
  return ret.replace(" ", "");
};

const SelectValue = function () {
  const { setIsChanged, isChanged } = useOutletContext();
  const characterId = useSelector((state) => state.itemSlice.characterId);
  const acc = useSelector((state) => state.itemSlice.acc);
  const userData = useSelector((state) => state.itemSlice.userData);
  const frontItems = useSelector((state) => state.itemSlice.frontItems);
  const optionItems = useSelector((state) => state.itemSlice.optionItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!characterId || characterId == "") {
    setTimeout(() => {
      navigate("../");
    }, 10);
  }

  useEffect(() => {
    if (!userData || !userData["ArmoryProfile"]) {
      return;
    }
    const newFrontItems = {
      todo: [
        {
          id: "MeulLevel",
          title: "겁화레벨 평균",
          body: "겁화의 보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["GupLevel"],
          cardTitle: "멸화",
          cardValue: userData["ArmoryGem"]["option"]["GupLevel"],
        },
        {
          id: "HongLevel",
          title: "작열레벨 평균",
          body: "작열의 보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["JakLevel"],
          cardTitle: "홍염",
          cardValue: userData["ArmoryGem"]["option"]["JakLevel"],
        },

        {
          id: "ArmourQualityAvg",
          title: "방어구품질 평균",
          body: "방어구 품질의 평균값 입니다.",
          value: userData["ArmoryEquipment"]["방어구_품질"],
          cardTitle: "방품",
          cardValue: userData["ArmoryEquipment"]["방어구_품질"],
        },
        {
          id: "AccQualityValueAvg",
          title: "악세서리 품질 평균",
          body: "악세서리 품질의 평균값 입니다.",
          value: userData["ArmoryEquipment"]["악세_품질"],
          cardTitle: "악세품질",
          cardValue: userData["ArmoryEquipment"]["악세_품질"],
          size: 5,
        },
        {
          id: "AccStatQualityAvg",
          title: "악세서리 힘민지 품질 평균",
          body: "악세서리 힘민지 품질의 평균값 입니다.",
          value: userData["ArmoryEquipment"]["악세_스탯_품질"],
          cardTitle: "스탯품질",
          cardValue: userData["ArmoryEquipment"]["악세_스탯_품질"],
          size: 5,
        },
        {
          id: "ElixirName",
          title: "엘릭서 특수옵션",
          body: "엘릭서 특수옵션 입니다.",
          value: userData["ArmoryEquipment"]["엘릭서_효과"],
          cardTitle: "엘릭서",
          cardValue: userData["ArmoryEquipment"]["엘릭서_효과"],
          size: 4,
        },
        // {
        //   id: "StatsSumBracelet",
        //   title: "팔찌 특성합",
        //   body: "팔찌의 특성합 입니다.",
        //   value: userData["ArmoryEquipment"]["option"]["LetSum"],
        //   cardTitle: "팔찌 합",
        //   cardValue: userData["ArmoryEquipment"]["option"]["LetSum"],
        //   size: 6,
        // },
        // {
        //   id: "StatsMain",
        //   title: "메인스텟",
        //   body: "메인스텟 수치입니다.",
        //   value:
        //     userData["MainStat"]["statName"] +
        //     ": " +
        //     userData["MainStat"]["statValue"],
        //   cardTitle: userData["MainStat"]["statName"],
        //   cardValue: userData["MainStat"]["statValue"],
        // },
        {
          id: "PvpGradeName",
          title: "PVP 등급",
          body: "PVP 등급입니다.",
          value: userData["ArmoryProfile"]["PvpGradeName"],
          cardTitle: "PVP",
          cardValue: userData["ArmoryProfile"]["PvpGradeName"],
        },
        {
          id: "TotalSkillPoint",
          title: "스킬포인트",
          body: "스킬포인트 값입니다.",
          value: userData["ArmoryProfile"]["TotalSkillPoint"],
          cardTitle: "스포",
          cardValue: userData["ArmoryProfile"]["TotalSkillPoint"],
        },
        {
          id: "TownLevel",
          title: "원정대 영지 레벨",
          body: "원정대 영지 레벨입니다.",
          value: userData["ArmoryProfile"]["TownLevel"],
          cardTitle: "영지",
          cardValue: `Lv ${userData["ArmoryProfile"]["TownLevel"]}`,
        },
      ],
      done: [
        {
          id: "GemsLevel",
          title: "보석레벨 평균",
          body: "총보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["level"],
          cardTitle: "보석",
          cardValue: userData["ArmoryGem"]["option"]["level"],
        },

        {
          id: "AwakeName",
          title: "카드세트 옵션",
          body: "카드세트 옵션입니다.",
          value: userData["ArmoryCard"]["AwakeName"],
          cardTitle: "카드",
          cardValue: userData["ArmoryCard"]["AwakeName"],
          size: 5,
        },
        {
          id: "EngravingSum",
          title: "유각 합",
          body: "유각의 합계 입니다.",
          value: userData["ArmoryEngraving"]["EngravingSum"],
          cardTitle: "유각",
          cardValue: userData["ArmoryEngraving"]["EngravingSum"] + " 장",
          size: 4,
        },

        // {
        //   id: "jobEngraving",
        //   title: "직업각인",
        //   body: "직업각인입니다.",
        //   value: userData["ArmoryEngraving"]["JobEffects"][0]
        //     ? userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
        //     : undefined,
        //   cardTitle: "직각",
        //   cardValue: userData["ArmoryEngraving"]["JobEffects"][0]
        //     ? shortEngrav(userData["ArmoryEngraving"]["JobEffects"][0]["Name"])
        //     : undefined,
        //   size: userData["ArmoryEngraving"]["JobEffects"][0]
        //     ? Math.floor(
        //         shortEngrav(
        //           userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
        //         ).length / 1.5
        //       ) + 3
        //     : 3,
        // },
      ],
    };
    const newFrontIcons = {
      "todo Combat": [
        {
          id: "WeaponQuality",
          title: "무기 품질",
          body: "무기의 품질입니다.",
          value: userData["ArmoryEquipment"]["장비"]["무기"]["qualityValue"],
          cardImg: userData["ArmoryEquipment"]["장비"]["무기"]["Icon"],
          cardValue:
            userData["ArmoryEquipment"]["장비"]["무기"]["qualityValue"],
          spanRight: "--20",
        },
        {
          id: "TenGup",
          title: "10레벨 겁화 갯수",
          body: "10레벨 겁화 갯수 입니다.",
          value: userData["ArmoryGem"]["option"]["TenGup"] + " ea",
          cardImg: "/assets/images/icons/10gup.webp",
          cardValue: userData["ArmoryGem"]["option"]["TenGup"] + " ea",
          size: 3,
        },
        {
          id: "TenJak",
          title: "10레벨 작열 갯수",
          body: "10레벨 작열 갯수 입니다.",
          value: userData["ArmoryGem"]["option"]["TenJak"] + " ea",
          cardImg: "/assets/images/icons/10jak.webp",
          cardValue: userData["ArmoryGem"]["option"]["TenJak"] + " ea",
          size: 3,
        },
        {
          id: "ElixirLevel",
          title: "엘릭서 레벨합",
          body: "엘릭서 강화의 총 레벨 합입니다.",
          value: userData["ArmoryEquipment"]["엘릭서_레벨"],
          cardImg: "/assets/images/icons/엘릭서.png",
          cardValue: userData["ArmoryEquipment"]["엘릭서_레벨"],
          size: 3,
        },
        {
          id: "TransGrade",
          title: "초월 각성 합",
          body: "초월의 각성단계 합입니다.",
          value: userData["ArmoryEquipment"]["전체_초월_레벨"],
          cardImg: "/assets/images/icons/초월5.png",
          cardValue: userData["ArmoryEquipment"]["전체_초월_레벨"],
          size: 3,
          spanRight: userData["ArmoryEquipment"]["전체_초월_레벨"] ? "-10" : "",
        },
        {
          id: "AwakeCount",
          title: "카드 각성 합",
          body: "카드의 각성단계 합입니다.",
          value: userData["ArmoryCard"]["AwakeCount"],
          cardImg: "/assets/images/icons/card.png",
          cardValue: userData["ArmoryCard"]["AwakeCount"],
          size: 3,
        },
      ],
      "todo Naesil": [],
      //   {
      //     id: "Mococo",
      //     title: "모코코 씨앗",
      //     body: "수집한 모코코 씨앗의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["모코코 씨앗"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["모코코 씨앗"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "mococo",
      //   },
      //   {
      //     id: "IslandSoul",
      //     title: "섬의 마음",
      //     body: "수집한 섬의 마음의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["섬의 마음"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["섬의 마음"]["Per"],
      //     size: "3",
      //     spanRight: "-10",
      //     sprite: "islandSoul",
      //   },
      //   {
      //     id: "Masterpiece",
      //     title: "위대한 미술품",
      //     body: "수집한 위대한 미술품의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["위대한 미술품"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["위대한 미술품"]["Per"],
      //     size: "3_3",
      //     spanRight: "-15",
      //     sprite: "masterpiece",
      //   },
      //   {
      //     id: "GiantHeart",
      //     title: "거인의 심장",
      //     body: "수집한 거인의 심장의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["거인의 심장"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["거인의 심장"]["Per"],
      //     size: "3_3",
      //     spanRight: "-10",
      //     sprite: "giantHeart",
      //   },
      //   {
      //     id: "IgneaToken",
      //     title: "이그네아의 징표",
      //     body: "수집한 이그네아의 징표의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["이그네아의 징표"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["이그네아의 징표"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "igneaToken",
      //   },
      //   {
      //     id: "Adventure",
      //     title: "항해 모험물",
      //     body: "수집한 항해 모험물의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["항해 모험물"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["항해 모험물"]["Per"],
      //     size: "3_3",
      //     spanRight: "-10",
      //     sprite: "adventure",
      //   },
      //   {
      //     id: "Leaf",
      //     title: "세계수의 잎",
      //     body: "수집한 세계수의 잎의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["세계수의 잎"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["세계수의 잎"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "leaf",
      //   },
      //   {
      //     id: "Orpeus",
      //     title: "오르페우스의 별",
      //     body: "수집한 오르페우스의 별의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["오르페우스의 별"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["오르페우스의 별"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "orpeus",
      //   },
      //   {
      //     id: "Orgel",
      //     title: "기억의 오르골",
      //     body: "수집한 기억의 오르골의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["기억의 오르골"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["기억의 오르골"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "orgel",
      //   },
      // ],
      done: [
        {
          id: "WeaponGrade",
          title: "무기 레벨",
          body: "무기의 강화 레벨입니다.",
          value:
            "+" + userData["ArmoryEquipment"]["장비"]["무기"]["아이템_레벨"],
          cardImg: userData["ArmoryEquipment"]["장비"]["무기"]["Icon"],
          cardValue:
            "+" + userData["ArmoryEquipment"]["장비"]["무기"]["아이템_레벨"],
          spanRight: "--10",
        },
        {
          id: "ArkPassiveJin",
          title: "진화 아크 패시브 포인트",
          body: "아크패시브 진화 포인트 입니다.",
          value: userData["ArkPassive"]["진화"],
          cardImg: "/assets/images/icons/앜패진화.png",
          cardValue: userData["ArkPassive"]["진화"],
          size: 3,
        },
        {
          id: "ArkPassiveGgae",
          title: "깨달음 아크 패시브 포인트",
          body: "아크패시브 깨달음 포인트 입니다.",
          value: userData["ArkPassive"]["깨달음"],
          cardImg: "/assets/images/icons/앜패깨달음.png",
          cardValue: userData["ArkPassive"]["깨달음"],
          size: 3,
        },
        {
          id: "ArkPassiveDoe",
          title: "도약 아크 패시브 포인트",
          body: "아크패시브 도약 포인트 입니다.",
          value: userData["ArkPassive"]["도약"],
          cardImg: "/assets/images/icons/앜패도약.png",
          cardValue: userData["ArkPassive"]["도약"],
          size: 3,
        },
        {
          id: "AbilityStone",
          title: "어빌리티 스톤",
          body: "어빌리티 스톤 입니다.",
          value:
            userData["ArmoryEquipment"]["어빌리티_스톤"]["engravings00"][
              "level"
            ] +
            " " +
            userData["ArmoryEquipment"]["어빌리티_스톤"]["engravings01"][
              "level"
            ],

          cardImg: userData["ArmoryEquipment"]["어빌리티_스톤"]["Icon"],
          cardValue:
            userData["ArmoryEquipment"]["어빌리티_스톤"]["engravings00"][
              "level"
            ] != ""
              ? userData["ArmoryEquipment"]["어빌리티_스톤"]["engravings00"][
                  "level"
                ] +
                " " +
                userData["ArmoryEquipment"]["어빌리티_스톤"]["engravings01"][
                  "level"
                ]
              : "-",
          size: 3,
        },
      ],
    };
    const newOptionItems = {
      "todo Combat": [
        // {
        //   id: "boxAcc",
        //   title: "악추피",
        //   body: "클릭해서 악추피값을 입력해 주세요",
        //   value: acc,
        //   cardValue: acc,
        //   onclick: true,
        // },
        {
          id: "boxExlixer01",
          title: "투구 특옵",
          body: "투구에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["레벨"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["투구"]["Elixir01"]["레벨"]
              : "-",
        },
        {
          id: "boxExlixer02",
          title: "상의 특옵",
          body: "상의에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["레벨"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["상의"]["Elixir01"]["레벨"]
              : "-",
        },
        {
          id: "boxExlixer03",
          title: "하의 특옵",
          body: "하의에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["레벨"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["하의"]["Elixir01"]["레벨"]
              : "-",
        },
        {
          id: "boxExlixer04",
          title: "견갑 특옵",
          body: "견갑에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["레벨"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["어깨"]["Elixir01"]["레벨"]
              : "-",
        },
        {
          id: "boxExlixer05",
          title: "장갑 특옵",
          body: "장갑에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["레벨"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["효과"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["효과"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"][
                    "효과"
                  ]
                ) +
                " " +
                userData["ArmoryEquipment"]["장비"]["장갑"]["Elixir01"]["레벨"]
              : "-",
        },
        {
          id: "boxAcc01",
          title: "목걸이 연마",
          body: "목걸이에 붙은 연마 효과 입니다.",
          value:
            userData["ArmoryEquipment"]["악세"]["목걸이"][0]["연마_효과_단축"],
          cardValue:
            "목걸이: " +
            userData["ArmoryEquipment"]["악세"]["목걸이"][0]["연마_효과_단축"],
        },
        {
          id: "boxAcc02",
          title: "귀걸이 연마 1",
          body: "귀걸이에 붙은 연마 효과 입니다.",
          value:
            userData["ArmoryEquipment"]["악세"]["귀걸이"][0]["연마_효과_단축"],
          cardValue:
            "귀걸이: " +
            userData["ArmoryEquipment"]["악세"]["귀걸이"][0]["연마_효과_단축"],
        },
        {
          id: "boxAcc03",
          title: "귀걸이 연마 2",
          body: "귀걸이에 붙은 연마 효과 입니다.",
          value:
            userData["ArmoryEquipment"]["악세"]["귀걸이"][1]["연마_효과_단축"],
          cardValue:
            "귀걸이: " +
            userData["ArmoryEquipment"]["악세"]["귀걸이"][1]["연마_효과_단축"],
        },
        {
          id: "boxAcc04",
          title: "반지 연마 1",
          body: "반지에 붙은 연마 효과 입니다.",
          value:
            userData["ArmoryEquipment"]["악세"]["반지"][0]["연마_효과_단축"],
          cardValue:
            "반지: " +
            userData["ArmoryEquipment"]["악세"]["반지"][0]["연마_효과_단축"],
        },
        {
          id: "boxAcc05",
          title: "반지 연마 2",
          body: "반지에 붙은 연마 효과 입니다.",
          value:
            userData["ArmoryEquipment"]["악세"]["반지"][1]["연마_효과_단축"],
          cardValue:
            "반지: " +
            userData["ArmoryEquipment"]["악세"]["반지"][1]["연마_효과_단축"],
        },
        {
          id: "boxGup",
          title: "겁화",
          body: "겁화의 갯수와 평균레벨 입니다.",
          value: `${userData["ArmoryGem"]["option"]["GupNum"]}겁 Lv ${
            userData["ArmoryGem"]["option"]["GupLevel"]
              ? userData["ArmoryGem"]["option"]["GupLevel"]
              : "0"
          }`,
          cardValue: `${userData["ArmoryGem"]["option"]["GupNum"]}겁 Lv ${
            userData["ArmoryGem"]["option"]["GupLevel"]
              ? userData["ArmoryGem"]["option"]["GupLevel"]
              : "0"
          }`,
        },
        {
          id: "boxJak",
          title: "작열",
          body: "작열의 갯수와 평균레벨 입니다.",
          value: `${userData["ArmoryGem"]["option"]["JakNum"]}작 Lv ${
            userData["ArmoryGem"]["option"]["JakLevel"]
              ? userData["ArmoryGem"]["option"]["JakLevel"]
              : "0"
          }`,
          cardValue:
            `${userData["ArmoryGem"]["option"]["JakNum"]}작 ` +
            `Lv ${
              userData["ArmoryGem"]["option"]["JakLevel"]
                ? userData["ArmoryGem"]["option"]["JakLevel"]
                : "0"
            }`,
        },
      ],

      "todo Naesil": [],
      //   {
      //     id: "boxMococo",
      //     title: "모코코 씨앗",
      //     body: "수집한 모코코 씨앗의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["모코코 씨앗"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["모코코 씨앗"]["Per"],
      //     sprite: "mococo",
      //   },
      //   {
      //     id: "IslandSoul",
      //     title: "섬의 마음",
      //     body: "수집한 섬의 마음의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["섬의 마음"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["섬의 마음"]["Per"],
      //     size: "3",
      //     spanRight: "-10",
      //     sprite: "islandSoul",
      //   },
      //   {
      //     id: "Masterpiece",
      //     title: "위대한 미술품",
      //     body: "수집한 위대한 미술품의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["위대한 미술품"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["위대한 미술품"]["Per"],
      //     size: "3_3",
      //     spanRight: "-15",
      //     sprite: "masterpiece",
      //   },
      //   {
      //     id: "GiantHeart",
      //     title: "거인의 심장",
      //     body: "수집한 거인의 심장의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["거인의 심장"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["거인의 심장"]["Per"],
      //     size: "3_3",
      //     spanRight: "-10",
      //     sprite: "giantHeart",
      //   },
      //   {
      //     id: "IgneaToken",
      //     title: "이그네아의 징표",
      //     body: "수집한 이그네아의 징표의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["이그네아의 징표"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["이그네아의 징표"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "igneaToken",
      //   },
      //   {
      //     id: "Adventure",
      //     title: "항해 모험물",
      //     body: "수집한 항해 모험물의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["항해 모험물"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["항해 모험물"]["Per"],
      //     size: "3_3",
      //     spanRight: "-10",
      //     sprite: "adventure",
      //   },
      //   {
      //     id: "Leaf",
      //     title: "세계수의 잎",
      //     body: "수집한 세계수의 잎의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["세계수의 잎"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["세계수의 잎"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "leaf",
      //   },
      //   {
      //     id: "Orpeus",
      //     title: "오르페우스의 별",
      //     body: "수집한 오르페우스의 별의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["오르페우스의 별"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["오르페우스의 별"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "orpeus",
      //   },
      //   {
      //     id: "Orgel",
      //     title: "기억의 오르골",
      //     body: "수집한 기억의 오르골의 수집 진행률 입니다.",
      //     value: userData["Collectibles"]["기억의 오르골"]["Per"] + "%",
      //     cardImg: "/assets/images/icons/sprite_profile.png",
      //     cardValue: userData["Collectibles"]["기억의 오르골"]["Per"],
      //     size: 3,
      //     spanRight: "-10",
      //     sprite: "orgel",
      //   },
      // ],

      done: [
        {
          id: "boxExlixer",
          title: "엘릭서 레벨합",
          body: "엘릭서 강화의 총 레벨 합입니다.",
          value: "Lv" + userData["ArmoryEquipment"]["엘릭서_레벨"],
          cardImg: "/assets/images/icons/엘릭서.png",
          cardValue: "Lv" + userData["ArmoryEquipment"]["엘릭서_레벨"],
        },
        {
          id: "boxCho",
          title: "초월 각성 합",
          body: "초월의 각성단계 합입니다.",
          value: userData["ArmoryEquipment"]["전체_초월_레벨"],
          cardImg: "/assets/images/icons/초월5.png",
          cardValue: userData["ArmoryEquipment"]["전체_초월_레벨"],
        },
        {
          id: "boxGem",
          title: "보석",
          body: "겁화,작열의 갯수와 평균레벨 입니다.",
          value:
            `${userData["ArmoryGem"]["option"]["GupNum"]}겁 ` +
            `${userData["ArmoryGem"]["option"]["JakNum"]}작 ` +
            `Lv ${
              userData["ArmoryGem"]["option"]["level"]
                ? userData["ArmoryGem"]["option"]["level"]
                : "0"
            }`,
          cardImg: "/assets/images/icons/10gup.webp",
          cardValue:
            `${userData["ArmoryGem"]["option"]["GupNum"]}겁 ` +
            `${userData["ArmoryGem"]["option"]["JakNum"]}작 ` +
            `Lv ${
              userData["ArmoryGem"]["option"]["level"]
                ? userData["ArmoryGem"]["option"]["level"]
                : "0"
            }`,
          gridTwo: true,
        },
      ],
    };
    dispatch(
      setFrontItems({
        newFrontItems,
      })
    );
    dispatch(
      setFrontIcons({
        newFrontIcons,
      })
    );
    dispatch(
      setOptionItems({
        newOptionItems,
      })
    );
  }, [userData]);

  useEffect(() => {
    if (!frontItems["todo"] || acc === "-") {
      return;
    }

    const todoTemp = frontItems["todo"].map((e) => {
      if (e["id"] === "Acc") {
        return {
          ...e,
          cardValue: acc,
          value: acc,
        };
      }
      return e;
    });

    const doneTemp = frontItems["done"].map((e) => {
      if (e["id"] === "Acc") {
        return {
          ...e,
          cardValue: acc,
          value: acc,
        };
      }
      return e;
    });

    const todoCombatTemp = optionItems["todo Combat"].map((e) => {
      if (e["id"] === "boxAcc") {
        return {
          ...e,
          cardValue: "악추피: " + acc,
          value: acc,
        };
      }
      return e;
    });
    const todoNaesilTemp = optionItems["todo Naesil"].map((e) => {
      if (e["id"] === "boxAcc") {
        return {
          ...e,
          cardValue: "악추피: " + acc,
          value: acc,
        };
      }
      return e;
    });

    const donebTemp = optionItems["done"].map((e) => {
      if (e["id"] === "boxAcc") {
        return {
          ...e,
          cardValue: "악추피: " + acc,
          value: acc,
        };
      }
      return e;
    });

    const newFrontItems = { todo: todoTemp, done: doneTemp };
    const newOptionItems = {
      "todo Combat": todoCombatTemp,
      "todo Naesil": todoNaesilTemp,
      done: donebTemp,
    };
    dispatch(setFrontItems({ newFrontItems }));
    dispatch(setOptionItems({ newOptionItems }));
  }, [acc]);

  // if (!userData["ArmoryEquipment"]) {
  //   return;
  // }
  return (
    <div className="option-body select" style={{ position: "relative" }}>
      <h3>02. 내용 정하기</h3>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>숨기기</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <ToggleButton
                titleRef={"isName"}
                title={"닉네임 표시"}
                body={"닉네임/길드명을 숨깁니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
              <ToggleButton
                titleRef={"isTitle"}
                title={"칭호 표시"}
                body={"칭호를 숨깁니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
              <ToggleButton
                titleRef={"isLevel"}
                title={"레벨 근사"}
                body={"아이템 레벨을 근사값으로 표현합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
              <ToggleButton
                titleRef={"isGothic"}
                title={"폰트 변경"}
                body={"나눔고딕 폰트를 사용합니다."}
                isChanged={isChanged}
                setIsChanged={setIsChanged}
              />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>앞면 내용 활성화</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="frontItems" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="2">
          <Accordion.Header>앞면 아이콘 활성화 (전투) </Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="frontIconsCombat" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="3">
          <Accordion.Header>앞면 아이콘 활성화 (내실) </Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="frontIconsNaesil" />
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
      <Accordion>
        <Accordion.Item eventKey="4">
          <Accordion.Header>뒷면 내용 활성화 (전투)</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="optionItemsCombat" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        {/* <Accordion.Item eventKey="5">
          <Accordion.Header>뒷면 내용 활성화 (내실)</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="optionItemsNaesil" />
            </div>
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"다음"} />
    </div>
  );
};

export default SelectValue;

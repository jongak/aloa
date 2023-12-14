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
  const { setPage, characterNameRef, setIsChanged, isChanged } =
    useOutletContext();
  const acc = useSelector((state) => state.itemSlice.acc);
  const userData = useSelector((state) => state.itemSlice.userData);
  const frontItems = useSelector((state) => state.itemSlice.frontItems);
  const optionItems = useSelector((state) => state.itemSlice.optionItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("select");
  }, []);

  useEffect(() => {
    if (!userData || !userData["ArmoryProfile"]) {
      return;
    }
    const newFrontItems = {
      todo: [
        {
          id: "Acc",
          title: "악마 추가피해옵션",
          body: "클릭해서 악추피값을 입력해 주세요",
          value: acc,
          cardTitle: "악추피",
          cardValue: acc,
          onclick: true,
        },
        {
          id: "MeulLevel",
          title: "멸화레벨 평균",
          body: "멸화의 보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["MeulLevel"],
          cardTitle: "멸화",
          cardValue: userData["ArmoryGem"]["option"]["MeulLevel"],
        },
        {
          id: "HongLevel",
          title: "홍염레벨 평균",
          body: "홍염의 보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["HongLevel"],
          cardTitle: "홍염",
          cardValue: userData["ArmoryGem"]["option"]["HongLevel"],
        },

        {
          id: "ArmourQualityAvg",
          title: "방어구품질 평균",
          body: "방어구 품질의 평균값 입니다.",
          value: userData["ArmoryEquipment"]["option"]["ArmourAvg"],
          cardTitle: "방품",
          cardValue: userData["ArmoryEquipment"]["option"]["ArmourAvg"],
        },
        {
          id: "AccQualityValueAvg",
          title: "악세서리 품질 평균",
          body: "악세서리 품질의 평균값 입니다.",
          value: userData["ArmoryEquipment"]["option"]["AccAvg"],
          cardTitle: "악세품질",
          cardValue: userData["ArmoryEquipment"]["option"]["AccAvg"],
          size: 5,
        },

        {
          id: "oneEngraving",
          title: "1각인",
          body: "1각인입니다.",
          value: userData["ArmoryEngraving"]["Effects"][0]
            ? userData["ArmoryEngraving"]["Effects"][0]["Name"] +
              " " +
              userData["ArmoryEngraving"]["Effects"][0]["Level"]
            : "없음",
          cardTitle: userData["ArmoryEngraving"]["Effects"][0]
            ? userData["ArmoryEngraving"]["Effects"][0]["Name"]
            : undefined,
          cardValue: userData["ArmoryEngraving"]["Effects"][0]
            ? userData["ArmoryEngraving"]["Effects"][0]["Level"]
            : undefined,
          size: 7,
        },
        {
          id: "StatsSumBracelet",
          title: "팔찌 특성합",
          body: "팔찌의 특성합 입니다.",
          value: userData["ArmoryEquipment"]["option"]["LetSum"],
          cardTitle: "팔찌 합",
          cardValue: userData["ArmoryEquipment"]["option"]["LetSum"],
          size: 6,
        },
        {
          id: "StatsMain",
          title: "메인스텟",
          body: "메인스텟 수치입니다.",
          value:
            userData["MainStat"]["statName"] +
            ": " +
            userData["MainStat"]["statValue"],
          cardTitle: userData["MainStat"]["statName"],
          cardValue: userData["MainStat"]["statValue"],
        },
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
          id: "SetOption",
          title: "세트옵션",
          body: "세트옵션입니다.",
          value: userData["ArmoryEquipment"]["option"]["SetOption"],
          cardTitle: "세트",
          cardValue: userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "GemsLevel",
          title: "보석레벨 평균",
          body: "총보석의 평균값 입니다.",
          value: userData["ArmoryGem"]["option"]["Level"],
          cardTitle: "보석",
          cardValue: userData["ArmoryGem"]["option"]["Level"],
        },
        {
          id: "ElixirName",
          title: "엘릭서 특수옵션",
          body: "엘릭서 특수옵션 입니다.",
          value: userData["ArmoryEquipment"]["option"]["ElixirName"],
          cardTitle: "엘릭서",
          cardValue: userData["ArmoryEquipment"]["option"]["ElixirName"],
          size: 4,
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
          id: "jobEngraving",
          title: "직업각인",
          body: "직업각인입니다.",
          value: userData["ArmoryEngraving"]["JobEffects"][0]
            ? userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
            : undefined,
          cardTitle: "직각",
          cardValue: userData["ArmoryEngraving"]["JobEffects"][0]
            ? shortEngrav(userData["ArmoryEngraving"]["JobEffects"][0]["Name"])
            : undefined,
          size: userData["ArmoryEngraving"]["JobEffects"][0]
            ? Math.floor(
                shortEngrav(
                  userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
                ).length / 1.5
              ) + 3
            : 3,
        },
      ],
    };
    const newFrontIcons = {
      todoCombat: [
        {
          id: "WeaponQuality",
          title: "무기 품질",
          body: "무기의 품질입니다.",
          value: userData["ArmoryEquipment"]["무기"]["qualityValue"],
          cardImg: userData["ArmoryEquipment"]["무기"]["Icon"],
          cardValue: userData["ArmoryEquipment"]["무기"]["qualityValue"],
          spanRight: "--20",
        },
        {
          id: "TenMeul",
          title: "10레벨 멸화 갯수",
          body: "10레벨 멸화 갯수 입니다.",
          value: userData["ArmoryGem"]["option"]["TenMeul"] + " ea",
          cardImg: "/assets/images/icons/10meol.webp",
          cardValue: userData["ArmoryGem"]["option"]["TenMeul"] + " ea",
        },
        {
          id: "TenHong",
          title: "10레벨 홍염 갯수",
          body: "10레벨 홍염 갯수 입니다.",
          value: userData["ArmoryGem"]["option"]["TenHong"] + " ea",
          cardImg: "/assets/images/icons/10hong.webp",
          cardValue: userData["ArmoryGem"]["option"]["TenHong"] + " ea",
        },
      ],
      todoNaesil: [
        {
          id: "Mococo",
          title: "모코코 씨앗",
          body: "수집한 모코코 씨앗의 수집 진행률 입니다.",
          value: userData["Collectibles"]["모코코 씨앗"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["모코코 씨앗"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "mococo",
        },
        {
          id: "IslandSoul",
          title: "섬의 마음",
          body: "수집한 섬의 마음의 수집 진행률 입니다.",
          value: userData["Collectibles"]["섬의 마음"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["섬의 마음"]["Per"],
          size: "3",
          spanRight: "-10",
          sprite: "islandSoul",
        },
        {
          id: "Masterpiece",
          title: "위대한 미술품",
          body: "수집한 위대한 미술품의 수집 진행률 입니다.",
          value: userData["Collectibles"]["위대한 미술품"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["위대한 미술품"]["Per"],
          size: "3_3",
          spanRight: "-15",
          sprite: "masterpiece",
        },
        {
          id: "GiantHeart",
          title: "거인의 심장",
          body: "수집한 거인의 심장의 수집 진행률 입니다.",
          value: userData["Collectibles"]["거인의 심장"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["거인의 심장"]["Per"],
          size: "3_3",
          spanRight: "-10",
          sprite: "giantHeart",
        },
        {
          id: "IgneaToken",
          title: "이그네아의 징표",
          body: "수집한 이그네아의 징표의 수집 진행률 입니다.",
          value: userData["Collectibles"]["이그네아의 징표"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["이그네아의 징표"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "igneaToken",
        },
        {
          id: "Adventure",
          title: "항해 모험물",
          body: "수집한 항해 모험물의 수집 진행률 입니다.",
          value: userData["Collectibles"]["항해 모험물"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["항해 모험물"]["Per"],
          size: "3_3",
          spanRight: "-10",
          sprite: "adventure",
        },
        {
          id: "Leaf",
          title: "세계수의 잎",
          body: "수집한 세계수의 잎의 수집 진행률 입니다.",
          value: userData["Collectibles"]["세계수의 잎"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["세계수의 잎"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "leaf",
        },
        {
          id: "Orpeus",
          title: "오르페우스의 별",
          body: "수집한 오르페우스의 별의 수집 진행률 입니다.",
          value: userData["Collectibles"]["오르페우스의 별"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["오르페우스의 별"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "orpeus",
        },
        {
          id: "Orgel",
          title: "기억의 오르골",
          body: "수집한 기억의 오르골의 수집 진행률 입니다.",
          value: userData["Collectibles"]["기억의 오르골"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["기억의 오르골"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "orgel",
        },
      ],
      done: [
        {
          id: "WeaponGrade",
          title: "무기 레벨",
          body: "무기의 강화 레벨입니다.",
          value: "+" + userData["ArmoryEquipment"]["무기"]["ItemGrade"],
          cardImg: userData["ArmoryEquipment"]["무기"]["Icon"],
          cardValue: "+" + userData["ArmoryEquipment"]["무기"]["ItemGrade"],
          spanRight: "--10",
        },
        {
          id: "AbilityStone",
          title: "어빌리티 스톤",
          body: "어빌리티 스톤 입니다.",
          value:
            userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings00"][
              "level"
            ] +
            " " +
            userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings01"][
              "level"
            ] +
            " " +
            userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings02"][
              "level"
            ],

          cardImg: userData["ArmoryEquipment"]["어빌리티 스톤"]["Icon"],
          cardValue:
            userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings00"][
              "level"
            ] != ""
              ? userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings00"][
                  "level"
                ] +
                " " +
                userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings01"][
                  "level"
                ] +
                " " +
                userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings02"][
                  "level"
                ]
              : "-",
          spanRight:
            userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings00"][
              "level"
            ] != ""
              ? false
              : "--10",
        },
        {
          id: "ElixirLevel",
          title: "엘릭서 레벨합",
          body: "엘릭서 강화의 총 레벨 합입니다.",
          value: userData["ArmoryEquipment"]["option"]["ElixirLevel"],
          cardImg: "/assets/images/icons/exlixer.webp",
          cardValue: userData["ArmoryEquipment"]["option"]["ElixirLevel"],
          size: 3,
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
        {
          id: "TransGrade",
          title: "초월 각성 합",
          body: "초월의 각성단계 합입니다.",
          value: userData["ArmoryEquipment"]["option"]["TransLevel"],
          cardImg: "/assets/images/cho/cho_5.png",
          cardValue: userData["ArmoryEquipment"]["option"]["TransLevel"],
          size: 3,
          spanRight: userData["ArmoryEquipment"]["option"]["TransLevel"]
            ? "-10"
            : "",
        },
      ],
    };
    const newOptionItems = {
      todoCombat: [
        {
          id: "boxAcc",
          title: "악추피",
          body: "클릭해서 악추피값을 입력해 주세요",
          value: acc,
          cardValue: acc,
          onclick: true,
        },
        {
          id: "boxExlixer01",
          title: "투구 특옵",
          body: "투구에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["투구"]["Elixir00"]["level"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["투구"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["투구"]["Elixir00"]["level"]
              : "-",
        },
        {
          id: "boxExlixer02",
          title: "상의 특옵",
          body: "상의에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["상의"]["Elixir00"]["level"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["상의"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["상의"]["Elixir00"]["level"]
              : "-",
        },
        {
          id: "boxExlixer03",
          title: "하의 특옵",
          body: "하의에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["하의"]["Elixir00"]["level"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["하의"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["하의"]["Elixir00"]["level"]
              : "-",
        },
        {
          id: "boxExlixer04",
          title: "견갑 특옵",
          body: "견갑에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["어깨"]["Elixir00"]["level"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["어깨"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["어깨"]["Elixir00"]["level"]
              : "-",
        },
        {
          id: "boxExlixer05",
          title: "장갑 특옵",
          body: "장갑에 붙은 엘릭서 특수옵션 입니다.",
          value:
            userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["장갑"]["Elixir00"]["level"]
              : "없음",
          cardValue:
            userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"] &&
            !isGongElixer(
              userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"]
            )
              ? shortElixer(
                  userData["ArmoryEquipment"]["장갑"]["Elixir00"]["name"]
                ) +
                " " +
                userData["ArmoryEquipment"]["장갑"]["Elixir00"]["level"]
              : "-",
        },
      ],

      todoNaesil: [
        {
          id: "boxMococo",
          title: "모코코 씨앗",
          body: "수집한 모코코 씨앗의 수집 진행률 입니다.",
          value: userData["Collectibles"]["모코코 씨앗"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["모코코 씨앗"]["Per"],
          sprite: "mococo",
        },
        {
          id: "IslandSoul",
          title: "섬의 마음",
          body: "수집한 섬의 마음의 수집 진행률 입니다.",
          value: userData["Collectibles"]["섬의 마음"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["섬의 마음"]["Per"],
          size: "3",
          spanRight: "-10",
          sprite: "islandSoul",
        },
        {
          id: "Masterpiece",
          title: "위대한 미술품",
          body: "수집한 위대한 미술품의 수집 진행률 입니다.",
          value: userData["Collectibles"]["위대한 미술품"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["위대한 미술품"]["Per"],
          size: "3_3",
          spanRight: "-15",
          sprite: "masterpiece",
        },
        {
          id: "GiantHeart",
          title: "거인의 심장",
          body: "수집한 거인의 심장의 수집 진행률 입니다.",
          value: userData["Collectibles"]["거인의 심장"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["거인의 심장"]["Per"],
          size: "3_3",
          spanRight: "-10",
          sprite: "giantHeart",
        },
        {
          id: "IgneaToken",
          title: "이그네아의 징표",
          body: "수집한 이그네아의 징표의 수집 진행률 입니다.",
          value: userData["Collectibles"]["이그네아의 징표"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["이그네아의 징표"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "igneaToken",
        },
        {
          id: "Adventure",
          title: "항해 모험물",
          body: "수집한 항해 모험물의 수집 진행률 입니다.",
          value: userData["Collectibles"]["항해 모험물"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["항해 모험물"]["Per"],
          size: "3_3",
          spanRight: "-10",
          sprite: "adventure",
        },
        {
          id: "Leaf",
          title: "세계수의 잎",
          body: "수집한 세계수의 잎의 수집 진행률 입니다.",
          value: userData["Collectibles"]["세계수의 잎"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["세계수의 잎"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "leaf",
        },
        {
          id: "Orpeus",
          title: "오르페우스의 별",
          body: "수집한 오르페우스의 별의 수집 진행률 입니다.",
          value: userData["Collectibles"]["오르페우스의 별"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["오르페우스의 별"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "orpeus",
        },
        {
          id: "Orgel",
          title: "기억의 오르골",
          body: "수집한 기억의 오르골의 수집 진행률 입니다.",
          value: userData["Collectibles"]["기억의 오르골"]["Per"] + "%",
          cardImg: "/assets/images/icons/sprite_profile.png",
          cardValue: userData["Collectibles"]["기억의 오르골"]["Per"],
          size: 3,
          spanRight: "-10",
          sprite: "orgel",
        },
      ],

      done: [
        {
          id: "boxExlixer",
          title: "엘릭서 레벨합",
          body: "엘릭서 강화의 총 레벨 합입니다.",
          value: "Lv" + userData["ArmoryEquipment"]["option"]["ElixirLevel"],
          cardImg: "/assets/images/icons/exlixer.webp",
          cardValue:
            "Lv" + userData["ArmoryEquipment"]["option"]["ElixirLevel"],
        },
        {
          id: "boxCho",
          title: "초월 각성 합",
          body: "초월의 각성단계 합입니다.",
          value: userData["ArmoryEquipment"]["option"]["TransLevel"],
          cardImg: "/assets/images/cho/cho_5.png",
          cardValue: userData["ArmoryEquipment"]["option"]["TransLevel"],
        },
        {
          id: "boxGem",
          title: "보석",
          body: "홍염,멸화의 갯수와 평균레벨 입니다.",
          value:
            `${userData["ArmoryGem"]["option"]["MeulNum"]}멸 ` +
            `${userData["ArmoryGem"]["option"]["HongNum"]}홍 ` +
            `Lv ${
              userData["ArmoryGem"]["option"]["Level"]
                ? userData["ArmoryGem"]["option"]["Level"]
                : "0"
            }`,
          cardImg: "/assets/images/icons/10meol.webp",
          cardValue:
            `${userData["ArmoryGem"]["option"]["MeulNum"]}멸 ` +
            `${userData["ArmoryGem"]["option"]["HongNum"]}홍 ` +
            `Lv ${
              userData["ArmoryGem"]["option"]["Level"]
                ? userData["ArmoryGem"]["option"]["Level"]
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

    const todoCombatTemp = optionItems["todoCombat"].map((e) => {
      if (e["id"] === "boxAcc") {
        return {
          ...e,
          cardValue: "악추피: " + acc,
          value: acc,
        };
      }
      return e;
    });
    const todoNaesilTemp = optionItems["todoNaesil"].map((e) => {
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
      todoCombat: todoCombatTemp,
      todoNaesil: todoNaesilTemp,
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
        <Accordion.Item eventKey="3">
          <Accordion.Header>앞면 아이콘 활성화 (내실) </Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="frontIconsNaesil" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
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
        <Accordion.Item eventKey="5">
          <Accordion.Header>뒷면 내용 활성화 (내실)</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="optionItemsNaesil" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"다음"} />
    </div>
  );
};

export default SelectValue;

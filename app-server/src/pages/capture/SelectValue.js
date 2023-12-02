import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";
import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useDispatch, useSelector } from "react-redux";
import {
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

  const userData = useSelector((state) => state.itemSlice.userData);
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
        {
          id: "Acc",
          title: "악마 추가피해옵션",
          body: "카드효과의 악마추가피해증가 입니다.",
          value: "지원안함",
          cardTitle: "악추피",
          cardValue: "-",
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
      todo: [
        {
          id: "WeaponQuality",
          title: "무기 품질",
          body: "무기의 품질입니다.",
          value: userData["ArmoryEquipment"]["무기"]["qualityValue"],
          cardImg: userData["ArmoryEquipment"]["무기"]["Icon"],
          cardValue: userData["ArmoryEquipment"]["무기"]["qualityValue"],
          spanRight: "--5",
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
      done: [
        {
          id: "WeaponGrade",
          title: "무기 레벨",
          body: "무기의 강화 레벨입니다.",
          value: "+" + userData["ArmoryEquipment"]["무기"]["ItemGrade"],
          cardImg: userData["ArmoryEquipment"]["무기"]["Icon"],
          cardValue: "+" + userData["ArmoryEquipment"]["무기"]["ItemGrade"],
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
          iconSize: 16,
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
          iconSize: 23,
        },
        {
          id: "AwakeCount",
          title: "카드 각성 합",
          body: "카드의 각성단계 합입니다.",
          value: userData["ArmoryCard"]["AwakeCount"],
          cardImg: "/assets/images/icons/card.png",
          cardValue: userData["ArmoryCard"]["AwakeCount"],
          spanRight: "--5",
        },
        {
          id: "TransGrade",
          title: "초월 각성 합",
          body: "초월의 각성단계 합입니다.",
          value: userData["ArmoryEquipment"]["option"]["TransLevel"],
          cardImg: "/assets/images/cho/cho_5.png",
          cardValue: userData["ArmoryEquipment"]["option"]["TransLevel"],
          size: 3,
          iconSize: 26,
          spanRight: userData["ArmoryEquipment"]["option"]["TransLevel"]
            ? "-10"
            : "",
        },
      ],
    };
    const newOptionItems = {
      todo: [
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
        {
          id: "acc",
          title: "악추피",
          body: "악마 추가 피해를 입력해야 합니다.",
          value: "지원안함",
          cardValue: "-",
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
        <Accordion.Item eventKey="2">
          <Accordion.Header>앞면 아이콘 활성화</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="frontIcons" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>뒷면 내용 활성화</Accordion.Header>
          <Accordion.Body>
            <div className="userRow">
              <MyDnd title="optionItems" />
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

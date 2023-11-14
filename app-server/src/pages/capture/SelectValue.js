import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";

import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useDispatch, useSelector } from "react-redux";
import {
  setFrontIcons,
  setFrontItems,
  setUserData,
} from "../../store/captureSlice";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [isName, setIsName] = useState(true);
  const [isServer, setIsServer] = useState(false);
  const userData = useSelector((state) => state.captureSlice.userData);
  const dispatch = useDispatch();

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("select");
  }, []);

  useEffect(() => {
    if (!userData["ArmoryEquipment"]) return;
    dispatch(
      setFrontItems({
        newFrontItems: {
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
              id: "jobEngraving",
              title: "직업각인",
              body: "직업각인입니다.",
              value: userData["ArmoryEngraving"]["JobEffects"][0]
                ? userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
                : undefined,
              cardTitle: "직각",
              cardValue: userData["ArmoryEngraving"]["JobEffects"][0]
                ? userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
                : undefined,
              size: 6,
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
              value: "지원안함",
              cardTitle: "팔찌특성합",
              cardValue: undefined,
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
              size: 4,
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
        },
      })
    );
    dispatch(
      setFrontIcons({
        newFrontIcons: {
          todo: [
            {
              id: "WeaponQuality",
              title: "무기 품질",
              body: "무기의 품질입니다.",
              value: userData["ArmoryEquipment"]["무기"]["qualityValue"],
              cardImg: userData["ArmoryEquipment"]["무기"]["Icon"],
              cardValue: userData["ArmoryEquipment"]["무기"]["qualityValue"],
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
                ] +
                " " +
                userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings01"][
                  "level"
                ] +
                " " +
                userData["ArmoryEquipment"]["어빌리티 스톤"]["engravings02"][
                  "level"
                ],
              iconSize: 16,
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
            },
            {
              id: "TransGrade",
              title: "초월 각성 합",
              body: "초월의 각성단계 합입니다.",
              value: userData["ArmoryEquipment"]["option"]["TransLevel"],
              cardImg: "/assets/images/cho/cho_5.png",
              cardValue: userData["ArmoryEquipment"]["option"]["TransLevel"],
              size: 2,
              iconSize: 30,
              margin: "mt-2",
            },
          ],
        },
      })
    );
  }, [userData]);

  // if (!userData["ArmoryEquipment"]) {
  //   return;
  // }
  return (
    <div className="option-body" style={{ position: "relative" }}>
      <h3>02. 내용 정하기</h3>

      <div className="userRow">
        <MyDnd title="frontIcons" />
      </div>

      <div className="userRow">
        <ToggleButton
          valueRef={isName}
          setValueRef={setIsName}
          title={"닉네임 표시"}
          body={"닉네임을 숨깁니다."}
        />
        <ToggleButton
          valueRef={isServer}
          setValueRef={setIsServer}
          title={"칭호 표시"}
          body={"칭호를 숨깁니다."}
        />
        <ToggleButton
          valueRef={isServer}
          setValueRef={setIsServer}
          title={"레벨 근사"}
          body={"아이템 레벨을 근사값으로 표현합니다."}
        />
      </div>

      <div className="userRow">
        <MyDnd title="frontItems" />
      </div>

      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};

export default SelectValue;

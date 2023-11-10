import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";

import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";
import { useSelector } from "react-redux";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [isName, setIsName] = useState(true);
  const [isServer, setIsServer] = useState(false);
  const userData = useSelector((state) => state.captureSlice.userData);

  // if (!characterNameRef.current) {
  //   navigate("../");
  // }
  useEffect(() => {
    setPage("select");
  }, []);

  const [frontItems, setFrontItems] = useState({ todo: [], done: [] });
  const [backItems, setBackItems] = useState({ todo: [], done: [] });
  useEffect(() => {
    if (!userData["ArmoryEquipment"]) return;
    setFrontItems({
      todo: [
        {
          id: "MeulLevel",
          title: "멸화레벨 평균",
          body: "멸화의 보석의 평균값 입니다.",
          value: userData && userData["ArmoryGem"]["option"]["MeulLevel"],
        },
        {
          id: "HongLevel",
          title: "홍염레벨 평균",
          body: "홍염의 보석의 평균값 입니다.",
          value: userData && userData["ArmoryGem"]["option"]["HongLevel"],
        },

        {
          id: "qualityValueArmourAvg",
          title: "방어구품질 평균",
          body: "방어구 품질의 평균값 입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "qualityValueAccAvg",
          title: "악세서리 품질 평균",
          body: "악세서리 품질의 평균값 입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "jobEngraving",
          title: "직업각인",
          body: "직업각인입니다.",
          value: userData && userData["ArmoryEngraving"]["JobEffects"][0],
        },
        {
          id: "oneEngraving",
          title: "1각인",
          body: "1각인입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "StatsSumBracelet",
          title: "팔찌 특성합",
          body: "팔찌의 특성합 입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "StatsMain",
          title: "세트옵션",
          body: "세트옵션입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "StatsMain",
          title: "메인스텟",
          body: "메인스텟 수치입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "PvpGradeName",
          title: "PVP 등급",
          body: "PVP 등급입니다.",
          value: userData && userData["ArmoryProfile"]["PvpGradeName"],
        },
        {
          id: "TotalSkillPoint",
          title: "스킬포인트",
          body: "스킬포인트 값입니다.",
          value: userData && userData["ArmoryProfile"]["TotalSkillPoint"],
        },
        {
          id: "TownLevel",
          title: "원정대 영지 레벨",
          body: "원정대 영지 레벨입니다.",
          value: userData && userData["ArmoryProfile"]["TownLevel"],
        },
      ],
      done: [
        {
          id: "SetOption",
          title: "세트옵션",
          body: "세트옵션입니다.",
          value: userData && userData["ArmoryEquipment"]["option"]["SetOption"],
        },
        {
          id: "GemsLevel",
          title: "보석레벨 평균",
          body: "총보석의 평균값 입니다.",
          value: userData && userData["ArmoryGem"]["option"]["Level"],
        },
        {
          id: "ElixirName",
          title: "엘릭서 특수옵션",
          body: "엘릭서 특수옵션 입니다.",
          value:
            userData && userData["ArmoryEquipment"]["option"]["ElixirName"],
        },
        {
          id: "AwakeName",
          title: "카드세트 옵션",
          body: "카드세트 옵션입니다.",
          value: userData && userData["ArmoryCard"]["AwakeName"],
        },
        {
          id: "Acc",
          title: "악마 추가피해옵션",
          body: "카드효과의 악마추가피해증가 입니다.",
          value: "3.36%",
        },
      ],
    });
  }, [userData]);

  // if (!userData["ArmoryEquipment"]) {
  //   return;
  // }
  return (
    <div className="option-body" style={{ position: "relative" }}>
      <h3>02. 내용 정하기</h3>

      <div className="userRow">
        <MyDnd items={backItems} setItems={setBackItems} />
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
        <MyDnd items={frontItems} setItems={setFrontItems} />
      </div>

      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};

export default SelectValue;

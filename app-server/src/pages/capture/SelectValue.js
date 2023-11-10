import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";

import ToggleButton from "../../components/common/ToggleButton";
import MyDnd from "./MyDnd";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [isName, setIsName] = useState(true);
  const [isServer, setIsServer] = useState(false);

  // if (!characterNameRef.current) {
  //   navigate("../");
  // }
  useEffect(() => {
    setPage("select");
  }, []);

  const [items, setItems] = useState({
    todo: [...Array(6)].map((_, i) => ({
      id: `${i}${i}${i}`,
      title: `Title ${i + 1}000`,
      status: "doing",
    })),
    done: [
      {
        id: "SetOptin",
        title: "세트옵션",
        body: userData["ArmoryEquipment"]["option"]["SetOption"],
      },
    ],
  });

  return (
    <div className="option-body" style={{ position: "relative" }}>
      <h3>02. 내용 정하기</h3>
      <div className="userRow">
        <MyDnd items={items} setItems={setItems} />
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

      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};

export default SelectValue;

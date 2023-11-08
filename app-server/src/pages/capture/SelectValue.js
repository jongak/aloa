import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "./Main.module.css";
import ToggleButton from "../../components/common/ToggleButton";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  const [isName, setIsName] = useState(true);
  const [isServer, setIsServer] = useState(false);

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("select");
  }, []);
  return (
    <div className="option-body">
      <h3>02. 내용 정하기</h3>
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
          title={"서버 표시"}
        />
      </div>

      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};
export default SelectValue;

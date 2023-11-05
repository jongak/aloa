import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useState } from "react";
import axios from "axios";

const SelectValue = function () {
  const { setPage, characterNameRef } = useOutletContext();
  const navigate = useNavigate();
  const [userData, setUserData] = useState();
  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("select");
  }, []);
  return (
    <div className="option-body">
      <h3>02. 내용 정하기</h3>
      <div>{characterNameRef.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};
export default SelectValue;

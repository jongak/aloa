import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";

const SelectValue = function () {
  const { setPage, characterName } = useOutletContext();
  const navigate = useNavigate();

  if (!characterName.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("select");
  }, []);
  return (
    <div className="option-body">
      <h3>02. 내용 정하기</h3>
      <div>{characterName.current}</div>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </div>
  );
};
export default SelectValue;

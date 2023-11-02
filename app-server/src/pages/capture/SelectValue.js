import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";

const SelectValue = function () {
  const { setPage } = useOutletContext();

  useEffect(() => {
    setPage("select");
  }, []);
  return (
    <>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </>
  );
};
export default SelectValue;

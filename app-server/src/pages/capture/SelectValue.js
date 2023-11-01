import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";

const SelectValue = function () {
  const { setPage } = useOutletContext();

  setPage("select");
  return (
    <>
      <Button href="../" title={"이전"} />
      <Button href="../set" title={"이후"} />
    </>
  );
};
export default SelectValue;

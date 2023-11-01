import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";

const FindName = function () {
  const { setPage } = useOutletContext();

  setPage("find");
  return (
    <>
      <Button href="/" title={"이전"} />
      <Button href="./select" title={"이후"} />
    </>
  );
};

export default FindName;

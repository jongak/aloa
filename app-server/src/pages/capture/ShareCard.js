import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";

const ShareCard = function () {
  const { setPage } = useOutletContext();

  setPage("share");
  return (
    <>
      <Button href="../set" title={"이전"} />
      <Button href="../share" title={"이후"} />
    </>
  );
};

export default ShareCard;

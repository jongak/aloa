import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";

const ShareCard = function () {
  const { setPage } = useOutletContext();

  useEffect(() => {
    setPage("share");
  }, []);
  return (
    <>
      <Button href="../set" title={"이전"} />
      <Button href="../share" title={"이후"} />
    </>
  );
};

export default ShareCard;

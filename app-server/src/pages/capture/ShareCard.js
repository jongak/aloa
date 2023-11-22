import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import UserItem from "../../components/item/UserItem";
import { toast, ToastContainer } from "react-toastify";
const ShareCard = function () {
  const {
    setPage,
    handleFrontDown,
    handleBackDown,
    handleServer,
    characterNameRef,
  } = useOutletContext();
  const navigate = useNavigate();

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("share");
  }, []);

  return (
    <div className="option-body share">
      <h3>04. 공유하기</h3>
      <ShareCard
        handleBackDown={handleBackDown}
        handleFrontDown={handleFrontDown}
        handleServer={handleServer}
      />
      <Button href="../set" title={"이전"} />
      <Button isClickable={false} title={"다음"} />
    </div>
  );
};

export default ShareCard;

import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import UserItem from "../../components/common/UserItem";

const ShareCard = function () {
  const { setPage, handleFrontDown, handleBackDown } = useOutletContext();

  useEffect(() => {
    setPage("share");
  }, []);
  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  return (
    <>
      <UserItem
        character={{
          CharacterClassName: "창술사",
          CharacterLevel: 59,
          CharacterName: "qq",
          ItemMaxLevel: 1650,
        }}
        characterName={"부먹펩시파인애플피자지코"}
      />
      <UserItem
        character={{
          CharacterClassName: "창술사",
          CharacterLevel: 59,
          CharacterName: "부먹펩시파인애플피자지코",
          ItemMaxLevel: 1650,
        }}
        characterName={"부먹펩시파인애플피자지코"}
      />
      <br />
      <Button href="../set" title={"이전"} />
      <Button href="../share" title={"이후"} />

      <br />
      <input type="text" ref={copyLinkRef} value={"http://localhost:3000"} />
      <Button title={"복사"} onClick={copyTextUrl} />
      <br />
      <Button title={"앞면 저장"} onClick={handleFrontDown} />
      <Button title={"뒷면 저장"} onClick={handleBackDown} />
    </>
  );
};

export default ShareCard;

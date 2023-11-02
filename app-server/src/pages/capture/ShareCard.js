import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect } from "react";
import UserItem from "./UserItem";

const ShareCard = function () {
  const { setPage } = useOutletContext();

  useEffect(() => {
    setPage("share");
  }, []);
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
      <Button href="../set" title={"이전"} />
      <Button href="../share" title={"이후"} />
    </>
  );
};

export default ShareCard;

import { useNavigate } from "react-router";

const UserItem = function (props) {
  const { characterName, character } = props;
  const { CharacterClassName, CharacterLevel, CharacterName, ItemMaxLevel } =
    character;
  const navigate = useNavigate();
  const onClickButtonChange = () => {
    characterName.current = CharacterName;
    navigate("./select");
  };
  return (
    <div className="my-card userItem" onClick={onClickButtonChange}>
      <img src="/assets/images/class_mark/mark-artist-border.png" />
      <div className="my-card-body">
        <p className="my-card-title">{CharacterName}</p>
        <p className="my-card-text">{CharacterClassName}</p>
        <p className="my-card-text">{CharacterLevel}</p>
        <p className="my-card-text">{ItemMaxLevel}</p>
      </div>
    </div>
  );
};
export default UserItem;

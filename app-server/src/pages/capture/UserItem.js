import "./UserItem.css";
const UserItem = function (props) {
  const { characterName, character } = props;
  const { CharacterClassName, CharacterLevel, CharacterName, ItemMaxLevel } =
    character;
  const onClickButtonChange = () => {
    characterName.current = CharacterName;
    console.log(characterName.current);
  };
  return (
    <div className="userItem" onClick={onClickButtonChange}>
      <div>{CharacterClassName}</div>
      <div>{CharacterLevel}</div>
      <div>{CharacterName}</div>
      <div>{ItemMaxLevel}</div>
    </div>
  );
};
export default UserItem;

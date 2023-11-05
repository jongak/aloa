import { useNavigate } from "react-router";

const change = {
  기상술사: "aeromancer",
  아르카나: "mark-arcana'-border.png",
  도화가: "artist",
  바드: "bard",
  배틀마스터: "battlemaster",
  버서커: "berserker",
  블레이드: "blade",
  블래스터: "blaster",
  데모닉: "demonic",
  디스트로이어: "destroyer",
  데빌헌터: "devilhunter",
  건슬링어: "gunslinger",
  호크아이: "hawkeye",
  홀리나이트: "holyknight",
  인파이터: "infighter",
  창술사: "lancemaster",
  리퍼: "reaper",
  스카우터: "scouter",
  슬레이어: "slayer",
  소서리스: "sorceress",
  소울이터: "soulEater",
  기공사: "soulmaster",
  스트라이커: "striker",
  서머너: "summoner",
  워로드: "warlord",
};

const UserItem = function (props) {
  const { characterNameRef, character } = props;
  const { CharacterClassName, CharacterLevel, CharacterName, ItemMaxLevel } =
    character;
  const navigate = useNavigate();
  const onClickButtonChange = () => {
    characterNameRef.current = CharacterName;
    navigate("./select");
  };
  return (
    <div className="my-card userItem" onClick={onClickButtonChange}>
      <img
        src={`/assets/images/class_mark/mark-${change[CharacterClassName]}-border.png`}
      />
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

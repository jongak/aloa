import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { setCharacterId } from "../../store/itemSlice";

const change = {
  기상술사: "aeromancer",
  아르카나: "arcana",
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
  암살자: "assassin",
  "무도가(여)": "fighter_female",
  "무도가(남)": "fighter-male",
  "헌터(남)": "hunter_male",
  "헌터(여)": "hunter-female",
  마법사: "magician",
  스페셜리스트: "specialist",
  "전사(여)": "warrior-female",
  "전사(남)": "warrior-male",
  브레이커: "breaker",
};

const UserItem = function (props) {
  const { character } = props;
  const {
    CharacterClassName,
    CharacterLevel,
    CharacterName,
    ItemMaxLevel,
    isArkPassive,
  } = character;
  const isDark = useSelector((state) => state.isDark);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickButtonChange = () => {
    if (isArkPassive) {
      dispatch(setCharacterId({ newCharacterId: CharacterName }));
      navigate("./select");
    } else {
      toast.error("아크패시브가 켜진 캐릭터만 이용가능합니다.");
    }
  };

  return (
    <div
      className={`my-card userItem ripple ${
        isArkPassive ? "cursor-pointer arkPassive" : ""
      }`}
      onClick={onClickButtonChange}
    >
      <div
        className="my-card-img class"
        style={{
          backgroundImage: `url(/assets/images/class_mark/mark-${
            change[CharacterClassName]
          }-border${isDark == "dark" ? "" : "2"}.png)`,
        }}
      />

      <div className="my-card-body">
        <p className="my-card-title">
          {CharacterName} {isArkPassive ? <>아크패시브</> : <></>}
        </p>
        <p className="my-card-text">{CharacterClassName}</p>
        <p className="my-card-text">{CharacterLevel}</p>
        <p className="my-card-text">{ItemMaxLevel}</p>
      </div>
    </div>
  );
};
export default UserItem;

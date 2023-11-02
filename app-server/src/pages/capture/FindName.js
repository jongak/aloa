import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";

const serverList = [
  "루페온",
  "카단",
  "카마인",
  "실리안",
  "아만",
  " 카제로스",
  "아브렐슈드",
  "니나브",
];

const getData = async function (id) {
  try {
    const res = await axios.get(`/character/characters/${id}`);
    if (res.data.ok) {
      return res.data.data;
    }
    return;
  } catch (err) {
    console.error(err);
  }
};

const FindName = function () {
  const { setPage, characterName } = useOutletContext();
  const userName = useRef();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setPage("find");
  }, []);

  const onClickButtonChange = async () => {
    setUserList(await getData(userName.current.value));
  };

  const AllListCom = {};
  serverList.forEach((server) => {
    var ServerListCom;
    if (userList[server]) {
      ServerListCom = userList[server].map((character) => {
        return (
          <UserItem
            key={character["CharacterName"]}
            character={character}
            characterName={characterName}
          />
        );
      });
    }
    AllListCom[server] = ServerListCom;
  });

  return (
    <div className="option-body">
      <h2>01. 캐릭터 고르기</h2>
      <input ref={userName}></input>
      <Button title={"검색"} onClick={onClickButtonChange} />
      <div className="userList">
        <div className={`userRow ${userList["서버"]}`}>
          {AllListCom[userList["서버"]]}
        </div>

        {serverList.map((server) => {
          if (AllListCom[server] && server != userList["서버"])
            return (
              <div className={`userRow ${server}`}> {AllListCom[server]}</div>
            );
        })}
      </div>
      <Button href="/" title={"이전"} />
      <Button href="./select" title={"이후"} />
    </div>
  );
};

export default FindName;

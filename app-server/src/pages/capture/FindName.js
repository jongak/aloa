import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserItem from "./UserItem";

const serverList = [
  "Lupeon",
  "Kadan",
  "Karmian",
  "Silian",
  "Aman",
  "Kazeros",
  "Avrelsud",
  "Ninave",
];

const serverKor = {
  Lupeon: "루페온",
  Kadan: "카단",
  Karmian: "카마인",
  Silian: "실리안",
  Aman: "아만",
  Kazeros: "카제로스",
  Avrelsud: "아브렐슈드",
  Ninave: "니나브",
};

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
      <h3>01. 캐릭터 고르기</h3>
      <div className="find-input">
        <input className="form-control" ref={userName}></input>
        <Button title={"검색"} onClick={onClickButtonChange} />
      </div>

      <div className="userList">
        <div
          key={userList["server"]}
          className={`userRow ${userList["server"]}`}
        >
          <span>{serverKor[userList["server"]]}</span>
          {AllListCom[userList["server"]]}
        </div>

        {serverList.map((server) => {
          if (AllListCom[server] && server != userList["server"])
            return (
              <div key={server} className={`userRow ${server}`}>
                <span>{serverKor[server]}</span>
                {AllListCom[server]}
              </div>
            );
        })}
      </div>
      <Button href="/" title={"이전"} />
      <Button href="./select" title={"이후"} />
    </div>
  );
};

export default FindName;
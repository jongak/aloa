import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import UserItem from "../../components/item/UserItem";
import { toast } from "react-toastify";

const serverList = [
  "루페온",
  "카단",
  "카마인",
  "실리안",
  "아만",
  "카제로스",
  "아브렐슈드",
  "니나브",
];

const getData = async function (id) {
  try {
    const res = await axios.get(`/card/expedition/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const FindName = function () {
  const userName = useRef();
  const [userList, setUserList] = useState([]);

  const onClickButtonChange = async (e) => {
    e.preventDefault();

    let now = new Date();

    const week = ["일", "월", "화", "수", "목", "금", "토"];
    let dayOfweek = week[now.getDay()];
    let hours = now.getHours();

    if (dayOfweek == "수" && hours > 5 && hours < 10) {
      toast.error("로아 서버 점검중입니다. 끝나고 이용해 주세요");
      return;
    }

    var tmp = await getData(userName.current.value);
    if (tmp) {
      setUserList(tmp);
    } else {
      toast.error(`잘못된 아이디 입니다.`);
      userName.current.value = "";
      userName.current.focus();
    }
  };

  const AllListCom = {};
  if (userList) {
    serverList.forEach((server) => {
      var ServerListCom;
      if (userList[server]) {
        ServerListCom = userList[server].map((character) => {
          return (
            <UserItem key={character["CharacterName"]} character={character} />
          );
        });
      }
      AllListCom[server] = ServerListCom;
    });
  }

  const keyHandler = function (e) {
    if (e.key === "Enter") {
      onClickButtonChange(e);
    }
  };

  return (
    <div className="option-body find">
      <h3>01. 캐릭터 고르기</h3>
      <div className="find-input">
        <input
          className="form-control"
          ref={userName}
          onKeyUp={keyHandler}
        ></input>
        <Button title={"검색"} onClick={onClickButtonChange} />
      </div>

      <div className="userList">
        <div
          key={userList["server"]}
          className={`userRow ${userList["server"]}`}
        >
          <span className="server">{userList["server"]}</span>
          {AllListCom[userList["server"]]}
        </div>

        {serverList.map((server) => {
          if (AllListCom[server] && server != userList["server"])
            return (
              <div key={server} className={`userRow ${server}`}>
                <span className="server">{server}</span>
                {AllListCom[server]}
              </div>
            );
        })}
      </div>
      <Button isClickable={false} title={"이전"} />
      <Button href="./select" title={"다음"} />
    </div>
  );
};

export default FindName;

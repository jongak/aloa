import axios from "axios";
import CardListItem from "./CardListItem";
import { useEffect, useState } from "react";

const getData = async function (no) {
  try {
    const res = await axios.get(`/images/list/${no}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const cardList = function () {
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(0);
      if (res) {
        setCardList(res);
      }
    };

    fetchData();
  }, []); // id가 변경될 때마다 useEffect를 실행

  return (
    <div className="main-banner container">
      <div className="row justify-content-around">
        {cardList.map((character_id) => (
          <CardListItem
            key={"item" + character_id}
            character_id={character_id}
          />
        ))}
      </div>
    </div>
  );
};

export default cardList;

import axios from "axios";
import CardListItem from "./CardListItem";
import { useEffect, useState } from "react";
import Button from "../../components/common/Button";

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
  const [no, setNo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(no);
      if (res) {
        setCardList(res);
      }
    };

    fetchData();
  }, [no]); // id가 변경될 때마다 useEffect를 실행

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
      <div
        className="buttonCover"
        style={{ display: "flex", justifyContent: "center", gap: "20px" }}
      >
        <Button
          onClick={() => {
            if (no != 0) {
              setNo(no - 1);
            }
          }}
          isClickable={no != 0}
          title={"이전"}
        />
        <Button
          onClick={() => {
            setNo(no + 1);
          }}
          title={"다음"}
        />
      </div>
    </div>
  );
};

export default cardList;

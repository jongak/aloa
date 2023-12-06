import { useNavigate, useParams } from "react-router";
import HistoryItem from "./HistoryItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/numlist/${id}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const History = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [numList, setNumList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(id);
      if (res) {
        setNumList(res);
      } else {
        navigate("../capture");
        toast.error("카드를 먼저 만들어 주세요");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // id가 변경될 때마다 useEffect를 실행

  return (
    <div className="option-area history col-lg-10 col-md-10">
      <div className="progress">
        <div className="inner">
          <h3>{id} 님의 히스토리</h3>
        </div>
      </div>
      <div className="option-body history">
        {numList.map((element, index) => {
          return (
            <HistoryItem key={"history" + index} index={index} time={element} />
          );
        })}
      </div>
    </div>
  );
};

export default History;

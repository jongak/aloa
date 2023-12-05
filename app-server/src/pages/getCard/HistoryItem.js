import { useEffect, useState } from "react";
import LootCard from "../../components/common/LootCard";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const getData = async function (id, no) {
  try {
    const res = await axios.get(`/images/effect/${id}/${no}`);
    return JSON.parse(res.data);
  } catch (err) {
    console.error(err);
  }
};

const HistoryItem = function ({ index, time }) {
  const [effectRef, setEffectRef] = useState({ rarityPreset: "holographic" });
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const [zIndex, setZIndex] = useState([5, 4]);

  const onClickHandle = function () {
    var newZIndex = [zIndex[1], zIndex[0]];

    setZIndex(newZIndex);
  };

  const leftStyle = {
    zIndex: zIndex[0],
  };
  const rightStyle = {
    zIndex: zIndex[1],
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(id, index);
      if (res) {
        setEffectRef(res);
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
    <div className="item">
      <div className="image">
        <div>
          <img
            className="notice_dot"
            src={`/assets/images/logo/logo_mark_${isDark}.png`}
          />
          <span>{time.split("T")[0].substring(2)}</span>
          <span>{time.split("T")[1].split(".")[0].substring(0, 5)}</span>
        </div>
      </div>

      <div className="details">
        <div className="card-cover col-sm-12 mt-3">
          <LootCard
            img={
              process.env.REACT_APP_API_SERVER +
              "/images/front/" +
              id +
              "/" +
              index
            }
            {...effectRef}
            size={{ height: 400, width: 300 }}
            style={leftStyle}
            onClickHandler={onClickHandle}
          />

          <LootCard
            img={
              process.env.REACT_APP_API_SERVER +
              "/images/back/" +
              id +
              "/" +
              index
            }
            {...effectRef}
            size={{ height: 400, width: 300 }}
            style={rightStyle}
            onClickHandler={onClickHandle}
          />
        </div>
      </div>
      <div className="small_image">
        <span>
          {time.split("T")[0].substring(2) +
            " " +
            time.split("T")[1].split(".")[0].substring(0, 5)}
        </span>
      </div>
    </div>
  );
};
export default HistoryItem;

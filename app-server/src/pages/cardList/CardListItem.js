import { useEffect, useState } from "react";
import LootCard from "../../components/common/LootCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/effect/${id}/0`);
    return JSON.parse(res.data);
  } catch (err) {
    console.error(err);
  }
};

const CardListItem = function ({ character_id }) {
  const [effectRef, setEffectRef] = useState({ rarityPreset: "holographic" });
  const navigate = useNavigate();
  const is_manager = useSelector((state) => state.loginSlice.is_manager);
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

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(character_id);
      if (res) {
        setEffectRef(res);
      }
    };

    fetchData();
  }, []); // id가 변경될 때마다 useEffect를 실행

  return (
    <div className="option-area list lg-mycol-11">
      <div className="progress">
        <div className="inner">
          <h5>로스트아크</h5>
        </div>
      </div>
      <div
        className="option-body"
        onClick={() => {
          if (is_manager) {
            navigate("/cards/" + character_id);
          }
        }}
      >
        <div className="card-cover">
          {/* 나중에 db에 저장된 커스텀모드 불러오기 가능해야할듯 */}
          <LootCard
            img={
              process.env.REACT_APP_API_SERVER + "/images/front/" + character_id
            }
            rarityPreset={"holographic"}
            size={{ height: 400, width: 300 }}
            {...effectRef}
            style={leftStyle}
            onClickHandler={onClickHandle}
          />

          <LootCard
            img={
              process.env.REACT_APP_API_SERVER + "/images/back/" + character_id
            }
            rarityPreset={"holographic"}
            size={{ height: 400, width: 300 }}
            {...effectRef}
            style={rightStyle}
            onClickHandler={onClickHandle}
          />
        </div>
      </div>
    </div>
  );
};
export default CardListItem;

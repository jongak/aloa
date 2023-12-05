import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import LootCard from "../../components/common/LootCard";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/effect/${id}/0`);
    return JSON.parse(res.data);
  } catch (err) {
    console.error(err);
  }
};

const History = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const [effectRef, setEffectRef] = useState({ rarityPreset: "holographic" });
  const isDark = "dark";
  const cardRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(id);
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
    <div className="option-area history col-lg-10 col-md-10">
      <div className="progress">
        <div className="inner">
          <h3>{id} 님의 히스토리</h3>
        </div>
      </div>
      <div className="option-body history">
        <div className="item">
          <div className="image">
            <div>
              <img
                className="notice_dot"
                src={`/assets/images/logo/logo_mark_${isDark}.png`}
              />
              <span>23.11.30.</span>
              <span>15:53</span>
            </div>
          </div>
          <div className="details">
            <div className="card-cover col-sm-12 mt-3">
              {/* 나중에 db에 저장된 커스텀모드 불러오기 가능해야할듯 */}
              <LootCard
                img={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
                {...effectRef}
                size={{ height: 400, width: 300 }}
              />

              <LootCard
                img={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
                {...effectRef}
                size={{ height: 400, width: 300 }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;

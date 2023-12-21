import { useEffect, useState } from "react";
import LootCard from "../../components/common/LootCard";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Button from "../../components/common/Button";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/effect/${id}/0`);
    return JSON.parse(res.data);
  } catch (err) {
    console.error(err);
  }
};

const removeData = async function (id, no) {
  try {
    const res = await axios.delete(`/images/${id}/${no}`);
    return JSON.parse(res.data);
  } catch (err) {
    console.error(err);
  }
};

const AdminListItem = function ({ character_id }) {
  const [effectRef, setEffectRef] = useState({ rarityPreset: "holographic" });
  const [id, setId] = useState(character_id);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);

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

  const handleChange = async () => {
    var new_id = window.prompt("새 아이디를 입력하세요");
    try {
      if (!new_id) {
        toast.error("취소했습니다.");
        return;
      }
      const res = await axios.post(`/images/change`, {
        cur_id: id,
        new_id: new_id,
        no: 0,
      });
      if (res["data"]) {
        setId(new_id);
        toast.error("변경되었습니다.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말 삭제합니까?")) {
      removeData(id, 0);
      toast.error("삭제되었습니다.");
      setIsDeleted(true);
    } else {
      toast.error("취소합니다.");
    }
  };

  if (isDeleted) {
    return null; // 아무것도 렌더링하지 않음
  }

  return (
    <div className="option-area list lg-mycol-11">
      <div className="progress">
        <div className="inner">
          <h5>로스트아크</h5>
          <h5>{id}</h5>
          <Button title={"변경"} onClick={handleChange} />
          <Button title={"삭제"} onClick={handleDelete} />
        </div>
      </div>
      <div
        className="option-body"
        onClick={() => {
          navigate("/cards/" + id + "/history");
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
export default AdminListItem;

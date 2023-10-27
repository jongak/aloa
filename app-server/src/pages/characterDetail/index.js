import axios from "axios";
import { Link, Outlet, useParams } from "react-router-dom";
import Header from "../../../src/components/layout/Header";

const CharacterDetail = function () {
  const { id } = useParams();

  const getData = async function (id) {
    try {
      const res = await axios.get(`/character/${id}`);
      console.log(res.data.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  getData(id);
  console.log("들어옴");
  return (
    <div
      className="container"
      style={{ border: "solid red 1px", marginTop: "65px" }}
    >
      <div className="row" style={{ backgroundColor: "white" }}>
        <div className="col-3 btn btn-outline-info" type="button">
          즐겨 찾기
        </div>
        <div className="col-3 btn btn-outline-info" type="button">
          카드 만들기
        </div>
        <div className="col-3 btn btn-outline-info" type="button">
          현재 셋팅 저장하기
        </div>
        <div className="col-3 btn btn-outline-info" type="button">
          갱신 하기
        </div>
      </div>
      <div className="row">
        <div className="col-7" style={{ backgroundColor: "white" }}>
          <div
            className="col"
            style={{
              height: "30vh",
              textAlign: "center",
              border: "solid green 1px ",
            }}
          >
            송도나봉선
          </div>
          <div
            className="col"
            style={{
              height: "40vh",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              border: "solid blue 1px",
            }}
          >
            캐릭터 정보
          </div>
          <div className="row" style={{ border: "solid black 1px" }}>
            <button type="button" className="col-2 btn btn-secondary">
              전투
            </button>
            <button type="button" className="col-2 btn btn-secondary">
              내실
            </button>
            <button type="button" className="col-2 btn btn-secondary">
              아바타
            </button>
            <button type="button" className="col-2 btn btn-secondary">
              통계
            </button>
            <button type="button" className="col-2 btn btn-secondary">
              캐릭터
            </button>
            <button type="button" className="col-2 btn btn-secondary">
              길드
            </button>
          </div>
        </div>

        <div className="col-5" style={{ backgroundColor: "blue" }}>
          <div className="col"></div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default CharacterDetail;

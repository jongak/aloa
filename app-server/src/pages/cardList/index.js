import { useRef } from "react";
import domtoimage from "dom-to-image";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import LootCard from "../../components/common/LootCard";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/front/${id}`);
    return res.data.error;
  } catch (err) {
    console.error(err);
  }
};

const cardList = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const copyLinkRef = useRef({ value: "" });
  const copyHTMLRef = useRef({ value: "" });

  const copyLinkUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      toast.success(`링크를 복사했습니다.`);
    });
  };
  const copyHTMLUrl = function () {
    copyHTMLRef.current.focus();
    copyHTMLRef.current.select();

    navigator.clipboard.writeText(copyHTMLRef.current.value).then(() => {
      toast.success(`HTML 태그를 복사했습니다.`);
    });
  };

  return (
    <div className="main-banner container">
      <div className="row justify-content-center">
        <div className="option-area col-lg-10 col-md-10">
          <div className="progress">
            <div className="inner">
              <h3 style={{ color: "var(--my--dark-heading)" }}>카드 목록</h3>
            </div>
          </div>
          <div className="option-body getCard">
            <div className="userRow">
              <h3 style={{ color: "var(--my--dark-heading)" }}>
                {id} 님의 카드
              </h3>

              <div
                className="col-sm-12 mt-5"
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  flexWrap: "wrap",
                }}
              >
                {/* 나중에 db에 저장된 커스텀모드 불러오기 가능해야할듯 */}
                <LootCard
                  img={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
                  rarityPreset={"holographic"}
                  size={{ height: 400, width: 300 }}
                />

                <LootCard
                  img={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
                  rarityPreset={"holographic"}
                  size={{ height: 400, width: 300 }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default cardList;

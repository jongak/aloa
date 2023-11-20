import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
// import LootCard from "../../components/common/LootCard";
// import CardFront from "../../components/common/CardFront";
// import CardBack from "../../components/common/CardBack";
// import { Outlet } from "react-router";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { setUserData } from "../../store/captureSlice";
import saveAs from "file-saver";
import Button from "../../components/common/Button";

const getDataCard = async function (id) {
  try {
    const res = await axios.get(`/character/carddata/${id}`);
    if (res.data.ok) {
      return res.data.data;
    }
    return;
  } catch (err) {
    console.error(err);
  }
};

const GetCard = function () {
  const frontRef = useRef("");
  const backRef = useRef("");
  const fullRef = useRef("");

  const handleFrontDown = async () => {
    const div = frontRef.current;
    const frontCard = await html2canvas(div, { scale: 2 });
    frontCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const handleBackDown = async () => {
    const div = backRef.current;
    const backCard = await html2canvas(div, { scale: 2 });
    backCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const cardDown = async () => {
    const div = fullRef.current;
    const fullCard = await html2canvas(div, { scale: 2 });
    fullCard.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
    });
  };

  const copy = "<i className='fas fa-copy'></i>";

  return (
    <>
      <div className="main-banner container">
        <div className="row justify-content-center">
          <div className="option-area col-lg-10 col-md-6">
            <div className="progress">
              <div className="inner">
                <h3 style={{ color: "var(--my--dark-heading)" }}>내 카드</h3>
              </div>
            </div>

            <div
              className="row justify-content-center"
              style={{ padding: "40px 0" }}
            >
              <div
                className="card-area col-lg-10 col-md-8"
                ref={fullRef}
                style={{ display: "flex" }}
              >
                <div ref={frontRef}>
                  <img src="/assets/images/card_front_sample.png" />
                </div>
                <div ref={backRef}>
                  <img src="/assets/images/card_back_sample.png" />
                </div>
              </div>
            </div>

            <div
              className="progress"
              style={{
                borderRadius: "0",
                height: "200px",
                marginBottom: "4px",
              }}
            >
              <div className="inner" style={{ marginBottom: "12px" }}>
                <h4
                  style={{
                    color: "var(--my--dark-heading)",
                  }}
                >
                  카드 저장하기
                </h4>
              </div>
              <div>
                <Button
                  title={"카드 전체"}
                  onClick={cardDown}
                  style={{
                    fontSize: "20px",
                    padding: "12px 50px",
                    marginRight: "8px",
                  }}
                />
                <Button
                  title={"앞면"}
                  onClick={handleFrontDown}
                  style={{
                    fontSize: "20px",
                    padding: "12px 50px",
                    marginRight: "8px",
                  }}
                />
                <Button
                  title={"뒷면"}
                  onClick={handleBackDown}
                  style={{ fontSize: "20px", padding: "12px 50px" }}
                />
              </div>
            </div>
            <div className="progress" style={{ borderRadius: "0 0 12px 12px" }}>
              <div>
                <input
                  type="text"
                  ref={copyLinkRef}
                  value={"http://localhost:3000/cards"}
                  style={{
                    padding: "4px 20px",
                    width: "300px",
                    borderRadius: "8px 0 0 8px",
                  }}
                />
                <Button title={"복사"} onClick={copyTextUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GetCard;

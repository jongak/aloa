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
import { Link } from "react-router-dom";

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
          <div className="option-area col-lg-10 col-md-10">
            <div className="progress">
              <div className="inner">
                <h3 style={{ color: "var(--my--dark-heading)" }}>
                  *** 님의 카드
                </h3>
              </div>
            </div>

            <div
              className="row justify-content-center"
              style={{ padding: "40px 0" }}
            >
              <div
                className="card-area col-sm-10"
                ref={fullRef}
                style={{ display: "flex" }}
              >
                <div ref={frontRef}>
                  <img src="/assets/images/card_front_sample.png" />
                </div>
                <div ref={backRef}>
                  <img
                    src="/assets/images/card_back_sample.png"
                    style={{ marginLeft: "12px" }}
                  />
                </div>
              </div>
            </div>

            {/* <div
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
                <ul style={{ display: "inline-flex" }}>
                  <li>
                    <Button
                      title={"카드 전체"}
                      onClick={cardDown}
                      style={{
                        fontSize: "20px",
                        padding: "10px 50px",
                      }}
                    />
                  </li>
                  <li style={{ margin: "0 20px" }}>
                    <Button
                      title={"앞면"}
                      onClick={handleFrontDown}
                      style={{
                        fontSize: "20px",
                        padding: "10px 50px",
                      }}
                    />
                  </li>
                  <li>
                    <Button
                      title={"뒷면"}
                      onClick={handleBackDown}
                      style={{ fontSize: "20px", padding: "10px 50px" }}
                    />
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="option-body share">
              <div className="userRow">
                <div className="inner" style={{ marginBottom: "12px" }}>
                  <h4
                    style={{
                      color: "var(--my--dark-heading)",
                    }}
                  >
                    카드 간직하기
                  </h4>
                </div>
                <div className="buttonCover">
                  <Button
                    title={"카드 전체"}
                    onClick={cardDown}
                    style={{
                      fontSize: "20px",
                      padding: "10px 50px",
                    }}
                  />
                  <div>
                    <Button
                      title={"앞면"}
                      onClick={handleFrontDown}
                      style={{
                        fontSize: "20px",
                        padding: "10px 50px",
                      }}
                    />
                    <Button
                      title={"뒷면"}
                      onClick={handleBackDown}
                      style={{ fontSize: "20px", padding: "10px 50px" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="option-body share">
              <div className="userRow">
                <div className="find-input">
                  <input
                    className="form-control"
                    type="text"
                    ref={copyLinkRef}
                    value={"http://localhost:3000/cards"}
                  />
                  <Button
                    title={"현재 페이지 url 복사"}
                    onClick={copyTextUrl}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default GetCard;

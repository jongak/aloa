import html2canvas from "html2canvas";
import { useRef } from "react";

import axios from "axios";
import saveAs from "file-saver";
import Button from "../../components/common/Button";
import { useParams } from "react-router-dom";

const GetCard = function () {
  const frontRef = useRef("");
  const backRef = useRef("");
  const fullRef = useRef("");
  const { id } = useParams();
  console.log(id);

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

            <div className="option-body share">
              <div className="cardRow">
                <div className="progress">
                  <div className="inner" style={{ marginBottom: "12px" }}>
                    <h4
                      style={{
                        color: "var(--my--dark-heading)",
                      }}
                    >
                      <i className="fa fa-download"></i> 카드 저장하기
                    </h4>
                  </div>
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
              <div className="cardRow">
                <div className="progress">
                  <div className="inner" style={{ marginBottom: "12px" }}>
                    <h4
                      style={{
                        color: "var(--my--dark-heading)",
                      }}
                    >
                      <i className="fa fa-share-nodes"></i> 카드 공유하기
                    </h4>
                  </div>
                </div>

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

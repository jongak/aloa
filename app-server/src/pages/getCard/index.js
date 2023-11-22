import html2canvas from "html2canvas";
import { useEffect, useRef } from "react";

import axios from "axios";
import saveAs from "file-saver";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import LootCard from "../../components/common/LootCard";
import { toast } from "react-toastify";

const GetCard = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const frontRef = useRef(
    `https://aloa-bucket.s3.ap-northeast-2.amazonaws.com/${encodeURI(
      id
    )}_front.png`
  );
  const backRef = useRef(
    `https://aloa-bucket.s3.ap-northeast-2.amazonaws.com/${encodeURI(
      id
    )}_back.png`
  );

  // const isHolo = useSelector((state) => state.captureSlice.isHolo);
  // const isGlow = useSelector((state) => state.captureSlice.isGlow);
  // const isShine = useSelector((state) => state.captureSlice.isShine);
  // const isShadow = useSelector((state) => state.captureSlice.isShadow);

  // const holographicOptionColors = useRef([
  //   "#0077be",
  //   "#0087b3",
  //   "#0097a8",
  //   "#00a799",
  //   "#00b78e",
  // ]);
  // const shineOptionColors = useRef(["#6dd5ed", "#2193b0"]);
  // const shadowOptionColors = useRef([
  //   "#6dd5ed",
  //   "#2193b0",
  //   "#6dd5ed",
  //   "#2193b0",
  // ]);

  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      toast.success(`링크를 복사했습니다.`);
    });
  };

  return (
    <div className="main-banner container">
      <div className="row justify-content-center">
        <div className="option-area col-lg-10 col-md-10">
          <div className="progress">
            <div className="inner">
              <h3 style={{ color: "var(--my--dark-heading)" }}>
                {id} 님의 카드
              </h3>
            </div>
          </div>

          <div
            className="row justify-content-center"
            style={{ padding: "40px 0" }}
          >
            <div
              className="col-sm-12"
              // ref={fullRef}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              {/* <LootCard
                img={encodeURI(frontRef.current)}
                holographicOptions={
                  isHolo
                    ? {
                        glow: isGlow,
                        color1: holographicOptionColors.current[0],
                        color2: holographicOptionColors.current[1],
                        color3: holographicOptionColors.current[2],
                        color4: holographicOptionColors.current[3],
                        color5: holographicOptionColors.current[4],
                      }
                    : null
                }
                shineOptions={
                  isShine
                    ? {
                        color1: shineOptionColors.current[0],
                        color2: shineOptionColors.current[1],
                      }
                    : null
                }
                shadowOptions={
                  isShadow
                    ? {
                        default: {
                          color1: shadowOptionColors.current[0],
                          color2: shadowOptionColors.current[1],
                        },
                        hover: {
                          color1: shadowOptionColors.current[2],
                          color2: shadowOptionColors.current[3],
                        },
                      }
                    : null
                }
                size={{ height: 400, width: 300 }}
              />

              <LootCard
                img={encodeURI(backRef.current)}
                holographicOptions={
                  isHolo
                    ? {
                        glow: isGlow,
                        color1: holographicOptionColors.current[0],
                        color2: holographicOptionColors.current[1],
                        color3: holographicOptionColors.current[2],
                        color4: holographicOptionColors.current[3],
                        color5: holographicOptionColors.current[4],
                      }
                    : null
                }
                shineOptions={
                  isShine
                    ? {
                        color1: shineOptionColors.current[0],
                        color2: shineOptionColors.current[1],
                      }
                    : null
                }
                shadowOptions={
                  isShadow
                    ? {
                        default: {
                          color1: shadowOptionColors.current[0],
                          color2: shadowOptionColors.current[1],
                        },
                        hover: {
                          color1: shadowOptionColors.current[2],
                          color2: shadowOptionColors.current[3],
                        },
                      }
                    : null
                }
                size={{ height: 400, width: 300 }}
              /> */}
              <img
                src={encodeURI(frontRef.current)}
                style={{ height: 400, width: 300 }}
              />
              <img
                src={encodeURI(backRef.current)}
                style={{ height: 400, width: 300 }}
              />
            </div>
          </div>

          {/* <div className="option-body share">
            <div className="cardRow">
              <div className="progress">
                <div className="inner" style={{ marginBottom: "12px" }}>
                  <h4
                    style={{
                      color: "var(--my--dark-heading)",
                    }}
                  >
                    <i className="fa fa-download"></i> &nbsp;&nbsp; 카드
                    저장하기
                  </h4>
                </div>
              </div>
              <div className="buttonCover">
                <Button
                  title={"카드 전체"}
                  onClick={handleDownload}
                  style={{
                    fontSize: "20px",
                    padding: "10px 50px",
                  }}
                />
                <div>
                  <Button
                    title={"앞면"}
                    // onClick={handleFrontDown}
                    style={{
                      fontSize: "20px",
                      padding: "10px 50px",
                    }}
                  />
                  <Button
                    title={"뒷면"}
                    // onClick={handleBackDown}
                    style={{ fontSize: "20px", padding: "10px 50px" }}
                  />
                </div>
              </div>
            </div>
          </div> */}

          <div className="option-body share">
            <div className="cardRow">
              <div className="progress">
                <div className="inner" style={{ marginBottom: "12px" }}>
                  <h4
                    style={{
                      color: "var(--my--dark-heading)",
                    }}
                  >
                    <i className="fa fa-share-nodes"></i> &nbsp;&nbsp; 카드
                    공유하기
                  </h4>
                </div>
              </div>

              <div className="find-input">
                <input
                  className="form-control"
                  type="text"
                  ref={copyLinkRef}
                  value={process.env.REACT_APP_SERVER + "cards/" + id}
                  onChange={() => {}}
                />
                <Button title={"현재 페이지 url 복사"} onClick={copyTextUrl} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetCard;

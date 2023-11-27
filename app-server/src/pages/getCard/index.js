import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard/src";

import axios from "axios";
import saveAs from "file-saver";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LootCard from "../../components/common/LootCard";
import { toast } from "react-toastify";
import { setRarityPreset } from "../../store/captureSlice";

const GetCard = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isHolo = useSelector((state) => state.captureSlice.isHolo);
  const isGlow = useSelector((state) => state.captureSlice.isGlow);
  const isShine = useSelector((state) => state.captureSlice.isShine);
  const isShadow = useSelector((state) => state.captureSlice.isShadow);

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
  dispatch(
    setRarityPreset({
      newRarityPreset: "Holographic",
    })
  );

  const copyLinkRef = useRef({ value: "" });
  const copyHTMLRef = useRef({ value: "" });

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
          <div className="option-body getCard">
            <div
              className="col-sm-12 mt-5"
              // ref={fullRef}
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
              }}
            >
              <LootCard
                img={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
                // holographicOptions={
                //   isHolo
                //     ? {
                //         glow: isGlow,
                //         color1: holographicOptionColors.current[0],
                //         color2: holographicOptionColors.current[1],
                //         color3: holographicOptionColors.current[2],
                //         color4: holographicOptionColors.current[3],
                //         color5: holographicOptionColors.current[4],
                //       }
                //     : null
                // }
                // shineOptions={
                //   isShine
                //     ? {
                //         color1: shineOptionColors.current[0],
                //         color2: shineOptionColors.current[1],
                //       }
                //     : null
                // }
                // shadowOptions={
                //   isShadow
                //     ? {
                //         default: {
                //           color1: shadowOptionColors.current[0],
                //           color2: shadowOptionColors.current[1],
                //         },
                //         hover: {
                //           color1: shadowOptionColors.current[2],
                //           color2: shadowOptionColors.current[3],
                //         },
                //       }
                //     : null
                // }
                size={{ height: 400, width: 300 }}
              />

              <LootCard
                img={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
                // holographicOptions={
                //   isHolo
                //     ? {
                //         glow: isGlow,
                //         color1: holographicOptionColors.current[0],
                //         color2: holographicOptionColors.current[1],
                //         color3: holographicOptionColors.current[2],
                //         color4: holographicOptionColors.current[3],
                //         color5: holographicOptionColors.current[4],
                //       }
                //     : null
                // }
                // shineOptions={
                //   isShine
                //     ? {
                //         color1: shineOptionColors.current[0],
                //         color2: shineOptionColors.current[1],
                //       }
                //     : null
                // }
                // shadowOptions={
                //   isShadow
                //     ? {
                //         default: {
                //           color1: shadowOptionColors.current[0],
                //           color2: shadowOptionColors.current[1],
                //         },
                //         hover: {
                //           color1: shadowOptionColors.current[2],
                //           color2: shadowOptionColors.current[3],
                //         },
                //       }
                //     : null
                // }
                size={{ height: 400, width: 300 }}
              />

              {/* <img
                src={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
                style={{ height: 400, width: 300 }}
              />
              <img
                src={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
                style={{ height: 400, width: 300 }}
              /> */}
            </div>

            <h3>
              <i className="fa fa-download"></i> &nbsp;&nbsp; 카드 저장하기
            </h3>
            <div className="userRow">
              <div className="buttonCover">
                <Button title={"카드전체 저장"} />
                <Button
                  title={"앞면저장"}
                  href={
                    process.env.REACT_APP_API_SERVER + "/images/front/" + id
                  }
                />
                <Button
                  title={"뒷면저장"}
                  href={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
                />
              </div>
            </div>
            <h3>
              <i className="fa fa-share-nodes"></i> &nbsp;&nbsp; 카드 공유하기
            </h3>
            <div className="userRow">
              <div className="find-input">
                <input
                  className="form-control"
                  ref={copyLinkRef}
                  value={process.env.REACT_APP_SERVER + "cards/" + id}
                  onChange={() => {}}
                ></input>
                <CopyToClipboard
                  text={copyLinkRef.current.value}
                  onCopy={() => toast.success(`링크를 복사했습니다.`)}
                >
                  <Button
                    title={
                      <>
                        <i className="fa fa-clipboard" />
                        &nbsp;&nbsp;클립보드에 복사
                      </>
                    }
                  />
                </CopyToClipboard>
              </div>

              <div className="find-input">
                <input
                  className="form-control"
                  type="text"
                  ref={copyHTMLRef}
                  value={
                    `<a href='${process.env.REACT_APP_SERVER}'> ` +
                    `<img ` +
                    `loading='lazy' ` +
                    `src='${process.env.REACT_APP_API_SERVER}/images/front/${id}' ` +
                    `style='height: 400; width: 300; aspect-ratio: 300 / 400' ` +
                    `/> ` +
                    `<img ` +
                    `loading='lazy' ` +
                    `src='${process.env.REACT_APP_API_SERVER}/images/back/${id}' ` +
                    `style='height: 400; width: 300; aspect-ratio: 300 / 400' ` +
                    `/> ` +
                    `</a> ` +
                    `<div> ` +
                    `더많은 카드를 만들기 위해서 <a href='${process.env.REACT_APP_SERVER}'>ALOA</a> 방문 ` +
                    `</div> `
                  }
                  onChange={() => {}}
                />
                <CopyToClipboard
                  text={copyHTMLRef.current.value}
                  onCopy={() => {
                    toast.success(`HTML 태그를 복사했습니다.`);
                  }}
                >
                  <Button
                    title={
                      <>
                        <i className="fa fa-clipboard" />
                        &nbsp;&nbsp;HTML 태그 복사
                      </>
                    }
                  />
                </CopyToClipboard>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCard;

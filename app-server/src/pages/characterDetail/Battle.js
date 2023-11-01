import { useState } from "react";
import "./detail.css";

const Battle = function () {
  const [expanded, setExpanded] = useState(false); // expanded 상태와 setter 함수
  const [isBig, setIsBig] = useState(true);
  const toggleAccordion = () => {
    setExpanded(!expanded); // 상태를 토글하는 함수
  };
  const accordionHeight = expanded ? "80vh" : "25vh";

  ///

  const [isTransformed, setIsTransformed] = useState(false);

  const toggleTransform = () => {
    setIsTransformed(!isTransformed);
    console.log(isTransformed);
  };

  const transformStyle = isTransformed
    ? { transform: "rotate(180deg) translateZ(0px)" }
    : { transform: "none" };
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "10px" }}>
        <div className="col-6">
          <div
            className="col"
            style={{
              border: "solid 1px black",
              height: "10vh",
              backgroundColor: "white",
            }}
          >
            아이템 레벨, 전투
          </div>
          <div
            className="col accordion accordion-flush"
            id="accordionFlushExample"
            data-bs-parent="#accordionFlushExample"
            style={{
              border: "solid 1px black",
              height: accordionHeight,
              backgroundColor: "white",
            }}
          >
            <div
              className={`small ${isBig ? "view" : "hide"}`}
              onClick={() => {
                console.log(isBig);
                setIsBig(false);
              }}
            >
              특화 치명 신속
            </div>
            <div
              className={`big ${!isBig ? "view" : "hide"}`}
              onClick={() => {
                console.log(isBig);
                setIsBig(true);
              }}
            >
              s simply dummy text of the printing and typesetting industry
              LoremIpsum has been the standard dummy text ever since the 1500s,
              when an unknown printer took a galley of type and s simply dummy
              text of the printing and typesetting industry LoremIpsum has been
              the standard dummy text ever since the 1500s, when an unknown
              printer took a galley of type and s simply dummy text of the
              printing and typesetting industry LoremIpsum has been the standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and
            </div>
          </div>
        </div>
        <div
          className="col-6"
          style={{
            border: "solid 1px black",
            height: "35vh",
            backgroundColor: "white",
          }}
        >
          어떤 사진
        </div>
      </div>
      <div className="row" style={{ marginTop: "10px" }}>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "60vh",
            backgroundColor: "white",
          }}
        >
          현재 착용 장비
        </div>
        <div
          className="col-12 flex flex-col gap-3 mt-1 bg-negative px-3.5 pt-3 pb-3 rounded-md shadow-md"
          style={{
            border: "solid 1px red",
            height: "30vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          <div
            className="flex justify-between cursor-pointer select-none"
            onClick={toggleTransform}
          >
            <span className="flex items-center gap-3">
              <span className="text-base">보석</span>
              <div className="flex items-center gap-2">
                <span className="bg-negative-less text-sm rounded px-2 py-0.5 inline-flex items-center gap-1 text-positive-less whitespace-nowrap">
                  7멸
                </span>
                <span className="bg-negative-less text-sm rounded px-2 py-0.5 inline-flex items-center gap-1 text-positive-less whitespace-nowrap">
                  4홍
                </span>
                <span className="bg-negative-less text-sm rounded px-2 py-0.5 inline-flex items-center gap-1 text-positive-less whitespace-nowrap">
                  레벨 10
                </span>
              </div>
            </span>
            <div className="flex items-center">
              <div style={{ transformStyle }}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.25em"
                  width="1.25em"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    verticalAlign: "middle",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <path fill="none" d="M24 24H0V0h24v24z" opacity=".87"></path>
                  <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "30vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          카드
        </div>
        <div
          className="col-12"
          style={{
            border: "solid 1px red",
            height: "60vh",
            backgroundColor: "white",
            marginTop: "10px",
          }}
        >
          스킬
        </div>
      </div>
    </div>
  );
};

export default Battle;

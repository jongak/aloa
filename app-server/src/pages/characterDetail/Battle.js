import { useState } from "react";
import "./detail.css";
import gems from "../../data/gem.json";
import cards from "../../data/cards.json";

const Battle = function () {
  const [expanded, setExpanded] = useState(false); // expanded 상태와 setter 함수

  const [isBig, setIsBig] = useState(true);
  const toggleAccordion = () => {
    setExpanded(!expanded); // 상태를 토글하는 함수
  };
  const accordionHeight = expanded ? "80vh" : "25vh";

  const [isTransformed, setIsTransformed] = useState(false);

  const toggleTransform = () => {
    setIsTransformed(!isTransformed);
    console.log(isTransformed);
  };

  const transformStyle = isTransformed
    ? { transform: "rotate(180deg) translateZ(0px)" }
    : { transform: "none" };

  const [isFoldGems, setFoldGems] = useState(false);
  const foldToggleGems = function () {
    setFoldGems(!isFoldGems);
  };

  const [isFoldCards, setIsFoldCards] = useState(false);
  const foldToggleCards = function () {
    setIsFoldCards(!isFoldCards);
  };

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
            className="flex justify-between cursor-pointer select-none btn"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-expanded="false"
            aria-controls="collapseExample"
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
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div>
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
          className="container"
          style={{
            border: "solid 1px red",
            backgroundColor: "yellow",
            marginTop: "10px",
            padding: "20px",
          }}
        >
          <div
            className="row justify-content-between"
            onClick={foldToggleGems}
            style={{ display: "flex", marginBottom: "10px", cursor: "pointer" }}
          >
            <span className="col-6 d-flex">
              <span className="">보석</span>
              <div className="">
                <span>7멸</span>
                <span>4홍</span>
                <span>레벨 10</span>
              </div>
            </span>
            <div className="col-1 align-self-center">
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

          <div className="row">
            <div className={isFoldGems ? "detail" : "summary"}>
              {gems.Gems.map((item) => (
                <div
                  key={item.CardsSlot}
                  className={isFoldGems ? "col-1 list" : "col-1 detail"}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "#15181d",
                    }}
                  >
                    <img src={item.Icon}></img>
                  </div>
                  <div
                    className={isFoldGems ? "" : "none"}
                    style={{
                      width: "36px",
                      height: "36px",
                      backgroundColor: "#15181d",
                    }}
                  >
                    <img src={item} />
                  </div>
                  <div
                    style={{
                      width: "36px",
                      height: "20px",
                      backgroundColor: "gray",
                      lineHeight: "18px",
                    }}
                  >
                    {item.Level}
                  </div>
                </div>
              ))}
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
        {/* 카드  */}
        <div
          className="container"
          style={{
            border: "solid 1px red",
            backgroundColor: "green",
            marginTop: "10px",
            //padding: "20px",
          }}
        >
          <div
            className="row justify-content-between"
            onClick={foldToggleCards}
            style={{ display: "flex", marginBottom: "10px", cursor: "pointer" }}
          >
            <span className="col-6 d-flex items-center gap-3">
              <span className="">카드</span>
              <div className="flex items-center gap-2">
                <span className="bg-negative-less text-sm rounded px-2 py-0.5 inline-flex items-center gap-1 text-positive-less whitespace-nowrap">
                  세구빛 30
                </span>
              </div>
            </span>
            <div className="col-1 align-self-center">
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

          <div className="row">
            <div className={isFoldCards ? "detail" : "summary"}>
              {cards.Cards.map((item) => (
                <div
                  key={item.GemSlot}
                  className={isFoldCards ? "col-2 list" : "col-2 detail"}
                >
                  <div className="aspect-[248/362] -m-0.5 relative flex overflow-hidden rounded-md ">
                    <div className="py-1.5 px-[0.2rem]">
                      <img src={item.Icon}></img>
                    </div>
                    <div className="absolute bottom-0 w-full p-[10%]">
                      <div className="drop-shadow-xl">
                        <div className="relative aspect-[10/3] bg-[url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] bg-cover overflow-hidden">
                          <div className="absolute overflow-hidden w-full -left-[0%] h-full bg-[0_100%] bg-[url(https://cdn-lostark.game.onstove.com/2018/obt/assets/images/pc/profile/img_profile_awake.png)] bg-cover"></div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-full absolute bg-[80.15%_0] bg-[url(https://cdn-lostark.iloa.gg/2018/obt/assets/images/pc/profile/img_card_grade.png)] bg-cover">
                      <img></img>
                    </div>
                    <p className="mt-2 text-2xs">{item.Name}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
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

import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
import LootCard from "../../components/common/LootCard";
import CardFront from "../../components/common/CardFront";
import CardBack from "../../components/common/CardBack";
import { Outlet } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/captureSlice";
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
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [page, setPage] = useState("share");
  const [frontCanvasRef, setFrontCanvasRef] = useState("우레");
  const [backCanvasRef, setBackCanvasRef] = useState("우레");
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [isCardReady, setIsCardReady] = useState(false);
  const rarityPresetRef = useRef("custom");
  const characterNameRef = useRef("우레");
  const holoRef = useRef(true);
  const glowRef = useRef(true);
  const shineRef = useRef(true);
  const shadowRef = useRef(true);

  const dispatch = useDispatch();
  const front = useSelector((state) => state.captureSlice.userData);
  const userData = useSelector((state) => state.captureSlice.userData);
  const frontItems = useSelector((state) => state.captureSlice.frontItems);
  const frontIcons = useSelector((state) => state.captureSlice.frontIcons);
  const imgSrcRef = useRef(
    "https://attach.dak.gg/portal/gaming-cards/202310/1698295239147_137d95ef15660d9f_front.png"
  );
  const holoSrcRef = useRef("http://localhost:4500/api/images/wave.png");

  const holographicOptionColors = useRef([
    "#0077be",
    "#0087b3",
    "#0097a8",
    "#00a799",
    "#00b78e",
  ]);
  const shineOptionColors = useRef(["#6dd5ed", "#2193b0"]);
  const shadowOptionColors = useRef([
    "#6dd5ed",
    "#2193b0",
    "#6dd5ed",
    "#2193b0",
  ]);
  useEffect(() => {
    if (characterNameRef.current) {
      getDataCard(characterNameRef.current);
    }
  }, [characterNameRef.current]);

  useEffect(() => {
    const fetchData = async () => {
      if (!frontRef.current) return;
      const front = frontRef.current;

      // 캔버스 생성 코드
      const frontCanvas = await html2canvas(front, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      frontCanvas.style.setProperty("width", "400px");
      frontCanvas.style.setProperty("height", "500px");

      if (!backRef.current) return;
      const back = backRef.current;
      // 캔버스 생성 코드
      const backCanvas = await html2canvas(back, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      backCanvas.style.setProperty("width", "400px");
      backCanvas.style.setProperty("height", "500px");

      setFrontCanvasRef(frontCanvas);
      setBackCanvasRef(backCanvas);
      // setIsLoading(false); // 이미지 생성 및 캔버스화 완료 후 로딩 상태를 false로 변경
      setIsCardReady(true); // 카드 생성이 완료됨

      // canvas.toBlob((blob) => {
      //   if (blob !== null) {
      //     saveAs(blob, "result.png");
      //   }
      // });

      // frontCanvas.toBlob(function (blob) {
      //   saveAs(blob, "result.png");
      // });
    };
    if (isLoading) {
      fetchData();
    }
  }, [isLoading, frontIcons, frontItems]);

  const setOptionStates = {
    rarityPresetRef,
    holoRef,
    glowRef,
    shineRef,
    shadowRef,
    isChanged,
    holographicOptionColors,
    shineOptionColors,
    shadowOptionColors,
    imgSrcRef,
    holoSrcRef,
  };
  const setOptionActions = { setIsChanged };

  const handleFrontDown = async () => {
    const front = frontRef.current;
    const cardFront = await html2canvas(front, { scale: 2 });
    cardFront.toBlob(function (blob) {
      saveAs(blob, "result.png");
    });
  };
  const handleBackDown = async () => {
    const back = backRef.current;
    const cardBack = await html2canvas(back, { scale: 2 });
    cardBack.toBlob(function (blob) {
      if (blob !== null) {
        saveAs(blob, "result.png");
      }
    });
  };
  const fullcard = useRef();
  const cardDown = async () => {
    const div = fullcard.current;
    const card = await html2canvas(div, { scale: 2 });
    card.toBlob(function (blob) {
      if (blob !== null) {
        saveAs(blob, "result.png");
      }
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
    <div className="main-banner container">
      <div className="row justify-content-center">
        <div className="option-area col-lg-10 col-md-6">
          <div className="progress">
            <div className="inner">
              <div className={`dot-wrapper ${page == "find" ? "active" : ""}`}>
                <div className="dot"></div>
                <span className="step-text">캐릭터 고르기</span>
              </div>
              <div
                className={`dot-wrapper ${page == "select" ? "active" : ""}`}
              >
                <div className="dot"></div>
                <span className="step-text">내용 정하기</span>
              </div>
              <div className={`dot-wrapper ${page == "set" ? "active" : ""}`}>
                <div className="dot"></div>
                <span className="step-text">카드 효과</span>
              </div>
              <div className={`dot-wrapper ${page == "share" ? "active" : ""}`}>
                <div className="dot"></div>
                <span className="step-text">공유 하기</span>
              </div>
              <div className="bar"></div>
            </div>
          </div>

          <div className="card-area col-lg-5 col-md-6">
            {/* {cardImgMemo} */}
            <CardBack
              characterNameRef={characterNameRef}
              divRef={backRef}
              setIsLoading={setIsLoading}
              style={{
                position: "absolute",
                left: "-1000px",
                marginLeft: "-100px",
              }}
            />
            <CardFront
              characterNameRef={characterNameRef}
              divRef={frontRef}
              setIsLoading={setIsLoading}
              style={{
                position: "absolute",
                left: "-1000px",
                marginLeft: "-100px",
              }}
            />
            <div ref={fullcard} style={{ display: "flex", width: "1200px" }}>
              <LootCard
                rarityPreset={rarityPresetRef.current}
                img={imgSrcRef.current}
                holo={holoSrcRef.current}
                canvasRef={frontCanvasRef}
                holographicOptions={
                  holoRef.current
                    ? {
                        glow: glowRef.current,
                        color1: holographicOptionColors.current[0],
                        color2: holographicOptionColors.current[1],
                        color3: holographicOptionColors.current[2],
                        color4: holographicOptionColors.current[3],
                        color5: holographicOptionColors.current[4],
                      }
                    : null
                }
                shineOptions={
                  shineRef.current
                    ? {
                        color1: shineOptionColors.current[0],
                        color2: shineOptionColors.current[1],
                      }
                    : null
                }
                shadowOptions={
                  shadowRef.current
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
                size={{ height: 500, width: 400 }}
              />

              <LootCard
                rarityPreset={rarityPresetRef.current}
                img={imgSrcRef.current}
                holo={holoSrcRef.current}
                canvasRef={backCanvasRef}
                holographicOptions={
                  holoRef.current
                    ? {
                        glow: glowRef.current,
                        color1: holographicOptionColors.current[0],
                        color2: holographicOptionColors.current[1],
                        color3: holographicOptionColors.current[2],
                        color4: holographicOptionColors.current[3],
                        color5: holographicOptionColors.current[4],
                      }
                    : null
                }
                shineOptions={
                  shineRef.current
                    ? {
                        color1: shineOptionColors.current[0],
                        color2: shineOptionColors.current[1],
                      }
                    : null
                }
                shadowOptions={
                  shadowRef.current
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
                size={{ height: 500, width: 400 }}
              />
            </div>
          </div>

          <div>
            <Button title={"카드"} onClick={cardDown} />
            <Button title={"앞면"} onClick={handleFrontDown} />
            <Button title={"뒷면"} onClick={handleBackDown} />
          </div>
          <div>
            <input
              type="text"
              ref={copyLinkRef}
              value={"http://localhost:3000/cards"}
            />
            <Button title={"복사"} onClick={copyTextUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default GetCard;

import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
import LootCard from "../../components/common/LootCard";
import CardFront from "../../components/common/CardFront";
import CardBack from "../../components/common/CardBack";
import { Outlet } from "react-router";

const capture = function () {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [page, setPage] = useState("find");
  const [frontCanvasRef, setFrontCanvasRef] = useState();
  const [backCanvasRef, setBackCanvasRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [isCardReady, setIsCardReady] = useState(false);
  const rarityPresetRef = useRef("custom");
  const characterNameRef = useRef();
  const holoRef = useRef(true);
  const glowRef = useRef(true);
  const shineRef = useRef(true);
  const shadowRef = useRef(true);
  const imgSrcRef = useRef(
    "https://attach.dak.gg/portal/gaming-cards/202310/1698295239147_137d95ef15660d9f_front.png"
  );
  const holoSrcRef = useRef("http://localhost:4400/api/images/wave.png");

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
    const fetchData = async () => {
      if (!frontRef.current) return;
      const front = frontRef.current;

      // 캔버스 생성 코드
      const frontCanvas = await html2canvas(front, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      frontCanvas.style.setProperty("width", "300px");
      frontCanvas.style.setProperty("height", "400px");

      if (!backRef.current) return;
      const back = backRef.current;
      // 캔버스 생성 코드
      const backCanvas = await html2canvas(back, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      backCanvas.style.setProperty("width", "300px");
      backCanvas.style.setProperty("height", "400px");

      setFrontCanvasRef(frontCanvas);
      setBackCanvasRef(backCanvas);
      // setIsLoading(false); // 이미지 생성 및 캔버스화 완료 후 로딩 상태를 false로 변경
      setIsCardReady(true); // 카드 생성이 완료됨

      // canvas.toBlob((blob) => {
      //   if (blob !== null) {
      //     saveAs(blob, "result.png");
      //   }
      // });
    };
    if (isLoading) {
      fetchData();
    }
  }, [isLoading]);

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
  return (
    <div className="main-banner container">
      <div className="row">
        <div className="option-area col-lg-7 col-md-6">
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
          <Outlet
            context={{
              setPage,
              characterNameRef,
              ...setOptionActions,
              ...setOptionStates,
            }}
          />
        </div>

        <div className="card-area col-lg-5 col-md-6">
          {/* {cardImgMemo} */}

          <CardFront
            characterNameRef={characterNameRef}
            divRef={frontRef}
            setIsLoading={setIsLoading}
            style={{
              // position: "absolute",
              // left: "-1000px",
              marginLeft: "-100px",
            }}
          />
          <CardBack
            characterNameRef={characterNameRef}
            divRef={backRef}
            setIsLoading={setIsLoading}
            style={{
              position: "absolute",
              left: "-1000px",
            }}
          />

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
            size={{ height: 400, width: 300 }}
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
            size={{ height: 400, width: 300 }}
          />
        </div>
      </div>
    </div>
  );
};
export default capture;

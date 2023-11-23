import html2canvas from "html2canvas";
import { useEffect, useMemo, useRef, useState } from "react";
import LootCard from "../../components/common/LootCard";
import CardFront from "../../components/common/CardFront";
import CardBack from "../../components/common/CardBack";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../store/captureSlice";
import saveAs from "file-saver";
import { ToastContainer, toast } from "react-toastify";

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

const capture = function () {
  const frontRef = useRef(null);
  const backRef = useRef(null);
  const [page, setPage] = useState("find");
  const [frontCanvasRef, setFrontCanvasRef] = useState();
  const [backCanvasRef, setBackCanvasRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);

  const characterNameRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isHolo = useSelector((state) => state.captureSlice.isHolo);
  const isGlow = useSelector((state) => state.captureSlice.isGlow);
  const isShine = useSelector((state) => state.captureSlice.isShine);
  const isShadow = useSelector((state) => state.captureSlice.isShadow);
  const frontItems = useSelector((state) => state.captureSlice.frontItems);
  const frontIcons = useSelector((state) => state.captureSlice.frontIcons);

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
      getDataCard(characterNameRef.current).then((res) => {
        dispatch(setUserData({ newUserData: res }));

        if (!res) {
          toast.error("서버에 문제가 생겼습니다.");
          characterNameRef.current = "";
          navigate("./");
        }
      });
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
      // setIsCardReady(true); // 카드 생성이 완료됨
    };
    if (isLoading) {
      setTimeout(fetchData, 50);
    }
  }, [isLoading, isChanged, frontItems, frontIcons]);

  const handleFrontDown = async () => {
    frontCanvasRef.toBlob(function (blob) {
      saveAs(blob, "CardFront.png");
    });
  };
  const handleBackDown = async () => {
    backCanvasRef.toBlob(function (blob) {
      if (blob !== null) {
        saveAs(blob, "CardBack.png");
      }
    });
  };

  const handleServer = async () => {
    try {
      const frontBlob = await new Promise((resolve) => {
        frontCanvasRef.toBlob(resolve);
      });

      const backBlob = await new Promise((resolve) => {
        backCanvasRef.toBlob(resolve);
      });

      const encodedCharacterName = encodeURIComponent(characterNameRef.current);

      const formData = new FormData();
      formData.append("image", frontBlob, `${encodedCharacterName}_front.png`);
      formData.append("image", backBlob, `${encodedCharacterName}_back.png`);

      const res = await axios.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.ok) {
        // console.log("Images uploaded:", res.data.data);
        toast.success(`서버에 저장 완료`);
        navigate("../cards/" + characterNameRef.current);
      }
    } catch (error) {
      // console.error("Error uploading images:", error);
      toast.error(`서버에 저장 실패`);
    }
  };
  const setOptionStates = {
    isChanged,
    holographicOptionColors,
    shineOptionColors,
    shadowOptionColors,
    // imgSrcRef,
    // holoSrcRef,
  };
  const setOptionActions = { setIsChanged };
  const shareCardActions = { handleFrontDown, handleBackDown, handleServer };

  return (
    <div className="main-banner container">
      <div className="row justify-content-center">
        <div className="option-area col-md-7">
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
              ...shareCardActions,
            }}
          />
        </div>
        <div style={{ position: "absolute" }}>
          <CardFront
            characterNameRef={characterNameRef}
            divRef={frontRef}
            setIsLoading={setIsLoading}
            style={{
              position: "absolute",
              left: "-3000px",
              // marginLeft: "-100px",
            }}
          />
          <CardBack
            characterNameRef={characterNameRef}
            divRef={backRef}
            setIsLoading={setIsLoading}
            style={{
              position: "absolute",
              left: "-3000px",
              // marginLeft: "-100px",
            }}
          />
        </div>

        <div className="card-area col-md-5 ">
          {/* {cardImgMemo} */}
          <div className="card-view">
            <LootCard
              img={"/assets/images/card_example_f.png"}
              // holo={holoSrcRef.current}
              canvasRef={frontCanvasRef}
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
              img={"/assets/images/card_example_b.png"}
              // holo={holoSrcRef.current}
              canvasRef={backCanvasRef}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default capture;

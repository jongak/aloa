import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useMemo, useRef, useState } from "react";
import CardImg from "../../components/common/CardImg";
import axios from "axios";
import Button from "../../components/common/Button";
import LootCard from "../../components/common/LootCard";
import img from "../../img/result_5.png";
import CardC from "../../components/common/CardC";
import ColorToggle from "../../components/common/ColorToggle";
import CardAvatar from "../../components/common/CardAvatar";

const Makecard = function () {
  const divRef = useRef(null);
  const [canvasRef, setCanvasRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const rarityPresetRef = useRef("custom");
  const holoRef = useRef(true);
  const glowRef = useRef(true);
  const shineRef = useRef(true);
  const shadowRef = useRef(true);
  const imgSrcRef = useRef({
    value:
      "https://attach.dak.gg/portal/gaming-cards/202310/1698295239147_137d95ef15660d9f_front.png",
  });

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

  const cardImgMemo = useMemo(() => {
    return (
      <CardImg
        setIsLoading={setIsLoading}
        divRef={divRef}
        style={{ position: "absolute", top: "-1000px" }}
      />
    );
  }, [isLoading]);
  const LootCardMemo = useMemo(
    () => (
      <LootCard
        rarityPreset={rarityPresetRef.current}
        img={imgSrcRef.current.value}
        // canvasRef={canvasRef}

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
    ),
    [isChanged]
  );

  useEffect(() => {
    const fetchData = async () => {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      setCanvasRef(canvas);

      // 여기서 canvas를 사용하거나 다른 작업을 수행할 수 있습니다.
    };
    if (isLoading) {
      fetchData();
    }

    // colorRef를 의존성 배열에 추가
  }, [isLoading]);

  const onChangeToggleRarityPreset = (event) => {
    rarityPresetRef.current = event.target.dataset.value;
    if (rarityPresetRef.current != "custom") {
      holoRef.current = false;
      glowRef.current = false;
      shineRef.current = false;
      shadowRef.current = false;
    }
    setIsChanged(!isChanged);
  };

  const onClickToggleHolo = (event) => {
    holoRef.current = !holoRef.current;
    if (!holoRef.current) {
      glowRef.current = false;
      shineRef.current = false;
      shadowRef.current = false;
    }
    rarityPresetRef.current = "custom";
    setIsChanged(!isChanged);
  };

  useEffect(() => {
    console.log(imgSrcRef.current.value);
  }, [isChanged]);

  const rarityPresets = ["custom", "legendary", "holographic"];
  const rarityPresetsList = rarityPresets.map((rarityPreset) => {
    return (
      <Button
        isRev={rarityPreset == rarityPresetRef.current}
        value={rarityPreset}
        key={rarityPreset}
        onClick={onChangeToggleRarityPreset}
        title={rarityPreset}
      />
    );
  });

  return (
    <div className="Cap" style={{ margin: "100px" }}>
      {rarityPresetsList}

      <Button
        isRev={holoRef.current}
        onClick={onClickToggleHolo}
        title={"홀로"}
      />

      <Button
        isRev={glowRef.current}
        toggleRef={glowRef}
        defaltRefs={[rarityPresetRef, holoRef]}
        defaltValues={["custom", true]}
        toggleChanged={isChanged}
        setToggleChanged={setIsChanged}
        title={"글로우"}
      />
      <ColorToggle
        optionColors={holographicOptionColors}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />

      <Button
        isRev={shineRef.current}
        toggleRef={shineRef}
        defaltRefs={[rarityPresetRef]}
        defaltValues={["custom"]}
        toggleChanged={isChanged}
        setToggleChanged={setIsChanged}
        title={"샤인"}
      />
      <ColorToggle
        optionColors={shineOptionColors}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />

      <Button
        isRev={shadowRef.current}
        toggleRef={shadowRef}
        defaltRefs={[rarityPresetRef]}
        defaltValues={["custom"]}
        toggleChanged={isChanged}
        setToggleChanged={setIsChanged}
        title={"그림자"}
      />
      <ColorToggle
        optionColors={shadowOptionColors}
        isChanged={isChanged}
        setIsChanged={setIsChanged}
      />

      {cardImgMemo}
      {LootCardMemo}

      <section>
        <div
          className="container"
          style={{ width: "400px", borderRadius: "5px" }}
        >
          <div
            className="row"
            style={{
              backgroundImage: "url('/assets/images/card_bg.png')",
              backgroundSize: "cover",
            }}
          >
            <div className="col">
              <img src="/assets/images/card_frame.png" />
            </div>
            <div>
              <img src="https://img.lostark.co.kr/armory/5/b2a54b9bfd283162ede6c950259ec45d9c3dfe440dbe5d6fd0cf57e786ef71de.png?v=20231029202224" />
            </div>
            {/* <img src="/assets/images/card_bg.png" /> */}
          </div>
        </div>
      </section>

      <CardAvatar setIsLoading={setIsLoading} divRef={divRef} />

      <input
        type="text"
        className="form-control"
        ref={imgSrcRef}
        onBlur={() => {
          setIsChanged(!isChanged);
        }}
        defaultValue={imgSrcRef.current.value}
      />
    </div>
  );
};
export default Makecard;

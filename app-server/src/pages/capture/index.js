import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useMemo, useRef, useState } from "react";
import CardImg from "../../components/common/CardImg";
import axios from "axios";
import Button from "../../components/common/Button";
import LootCard from "../../components/common/LootCard";
import img from "../../img/result_5.png";
import CardC from "../../components/common/CardC";

const capture = function () {
  const divRef = useRef(null);
  const [canvasRef, setCanvasRef] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const rarityPresetRef = useRef("custom");
  const glowRef = useRef(true);
  const holoRef = useRef(true);
  const [holographicOptionColors, setHolographicOptionColors] = useState([
    "#0077be",
    "#0087b3",
    "#0097a8",
    "#00a799",
    "#00b78e",
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
        img={
          "https://attach.dak.gg/portal/gaming-cards/202310/1698295239147_137d95ef15660d9f_front.png"
        }
        // canvasRef={canvasRef}
        // shineOptions={{
        //   color1: "#6dd5ed",
        //   color2: "#2193b0",
        // }}
        holographicOptions={
          holoRef.current
            ? {
                glow: glowRef.current,
                color1: holographicOptionColors[0],
                color2: holographicOptionColors[1],
                color3: holographicOptionColors[2],
                color4: holographicOptionColors[3],
                color5: holographicOptionColors[4],
              }
            : null
        }
        shadowOptions={{
          default: { color1: "#6dd5ed", color2: "#2193b0" },
          hover: { color1: "#6dd5ed", color2: "#2193b0" },
        }}
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
      glowRef.current = false;
      holoRef.current = false;
    }
    setIsChanged(!isChanged);
  };

  const onChangeToggleGlow = (event) => {
    glowRef.current = !glowRef.current;
    rarityPresetRef.current = "custom";
    setIsChanged(!isChanged);
  };

  const onChangeToggleHolo = (event) => {
    holoRef.current = !holoRef.current;
    glowRef.current = !glowRef.current;
    rarityPresetRef.current = "custom";
    setIsChanged(!isChanged);
  };

  const handleBlurChangeHolographicOptionColors = (event) => {
    var newHolographicOptionColors = holographicOptionColors;
    newHolographicOptionColors[event.target.dataset.index] = event.target.value;
    console.log(event.target.dataset.index, event.target.dataset.color);
    setHolographicOptionColors(newHolographicOptionColors);
    setIsChanged(!isChanged);
  };

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

  const holographicOptionsList = holographicOptionColors.map((color, i) => {
    return (
      <input
        key={`color${i + 1}`}
        type="color"
        defaultValue={color}
        data-index={i}
        onBlur={handleBlurChangeHolographicOptionColors}
      />
    );
  });

  return (
    <div className="Cap" style={{ margin: "100px" }}>
      {rarityPresetsList}
      <Button
        isRev={holoRef.current}
        onClick={onChangeToggleHolo}
        title={"홀로"}
      />
      <Button
        isRev={glowRef.current}
        onClick={onChangeToggleGlow}
        title={"글로우"}
      />

      {holographicOptionsList}
      {cardImgMemo}
      {LootCardMemo}
    </div>
  );
};
export default capture;

import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useRef, useState } from "react";
import CardImg from "../../components/common/CardImg";
import axios from "axios";
import Button from "../../components/common/Button";
import LootCard from "../../components/common/LootCard";
import img from "../../img/result_5.png";
import CardC from "../../components/common/CardC";

const capture = function () {
  const divRef = useRef(null);
  const [canvasRef, setCanvasRef] = useState();
  const [isChanged, setIsChanged] = useState(true);
  const rarityPresetRef = useRef("common");

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

    fetchData();

    // colorRef를 의존성 배열에 추가
  }, [rarityPresetRef]);

  const onChangeToggle = (event) => {
    rarityPresetRef.current = event.target.dataset.value;
    setIsChanged(!isChanged);
  };

  const rarityPresets = ["common", "legendary", "holographic"];
  const rarityPresetsList = rarityPresets.map((rarityPreset) => {
    return (
      <Button
        type="button"
        value={rarityPreset}
        key={rarityPreset}
        onClick={onChangeToggle}
        // className="item"
        style={{
          padding: "4px 5px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid",
        }}
        title={rarityPreset}
      />
    );
  });

  return (
    <div className="Cap" style={{ margin: "100px" }}>
      {rarityPresetsList}
      {/* <div
        style={{
          backgroundColor: `${colorRef}`,
          position: "absolute",
          width: "300px",
          height: "400px",
          marginBottom: "10px",
          top: "-500px",
        }}
        ref={divRef}
      /> */}
      {/* <img ref={divRef} alt="이미지" /> */}
      <CardImg
        divRef={divRef}
        style={{ position: "absolute", top: "-1000px" }}
      />

      <LootCard
        pp={isChanged}
        rarityPreset={rarityPresetRef.current}
        // img={
        //   "https://attach.dak.gg/portal/gaming-cards/202310/1698295239147_137d95ef15660d9f_front.png"
        // }
        canvasRef={canvasRef}
        // shineOptions={{
        //   color1: "#6dd5ed",
        //   color2: "#2193b0",
        // }}
        // holographicOptions={{
        //   glow: true,
        //   color1: "#0077be",
        //   color2: "#0087b3",
        //   color3: "#0097a8",
        //   color4: "#00a799",
        //   color5: "#00b78e",
        // }}
        shadowOptions={{
          default: { color1: "#6dd5ed", color2: "#2193b0" },
          hover: { color1: "#6dd5ed", color2: "#2193b0" },
        }}
        size={{ height: 400, width: 300 }}
      />
    </div>
  );
};
export default capture;

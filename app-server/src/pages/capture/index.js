import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useRef, useState } from "react";
import CardImg from "../../components/common/CardImg";
import axios from "axios";
import Button from "../../components/common/Button";
import LootCard from "../../components/common/LootCard";
import img from "../../img/result_5.png";
import Canvas2Image from "canvas2image";

const capture = function () {
  const divRef = useRef(null);
  const canvasRef = useRef();
  const [colorRef, setColorRef] = useState("black");
  useEffect(() => {
    const fetchData = async () => {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
      });
      canvasRef.current = Canvas2Image.saveAsImage(canvas);

      // 여기서 canvas를 사용하거나 다른 작업을 수행할 수 있습니다.
    };

    fetchData();

    // colorRef를 의존성 배열에 추가
  }, [colorRef]);

  const onChangeToggle = (event) => {
    setColorRef(event.target.dataset.value);
  };

  const colors = ["red", "yellow", "blue"];
  const colorsList = colors.map((color) => {
    return (
      <Button
        type="button"
        value={color}
        key={color}
        onClick={onChangeToggle}
        // className="item"
        style={{
          padding: "4px 5px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid",
        }}
        title={color}
      />
    );
  });
  if (canvasRef.current) {
    console.log(canvasRef.current.childNodes[0]);
  }

  return (
    <div className="Cap" style={{ margin: "100px" }}>
      {colorsList}
      <div
        style={{
          backgroundColor: `${colorRef}`,
          position: "absolute",
          width: "300px",
          height: "400px",
          marginBottom: "10px",
          top: "-500px",
        }}
        ref={divRef}
      />
      {/* <img ref={divRef} alt="이미지" /> */}
      {/* <CardImg divRef={divRef} /> */}
      <div className="canvas" ref={canvasRef} />
      <LootCard
        img={canvasRef.current ? canvasRef.current.childNodes[0] : null}
        shineOptions={{
          color1: "#6dd5ed",
          color2: "#2193b0",
        }}
        holographicOptions={{
          glow: true,
          color1: "#0077be",
          color2: "#0087b3",
          color3: "#0097a8",
          color4: "#00a799",
          color5: "#00b78e",
        }}
        shadowOptions={{
          default: { color1: "#6dd5ed", color2: "#2193b0" },
          hover: { color1: "#6dd5ed", color2: "#2193b0" },
        }}
        size={{ height: 410, width: 300 }}
      />
    </div>
  );
};
export default capture;

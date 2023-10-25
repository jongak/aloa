import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useEffect, useRef } from "react";
import CardImg from "../../components/common/CardImg";
import axios from "axios";

const capture = function () {
  const divRef = useRef(null);
  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, {
        scale: 2,
        allowTaint: true,
        useCORS: true,
        // proxy: "/html2canvas-proxy",
      });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div className="Cap" style={{ margin: "100px" }}>
      {/* <img ref={divRef} alt="이미지" /> */}
      <CardImg divRef={divRef} />
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
};
export default capture;

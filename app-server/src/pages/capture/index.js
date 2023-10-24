import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";
import CardImg from "../../components/common/CardImg";

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
    <div className="Cap">
      <CardImg divRef={divRef} />
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
};
export default capture;

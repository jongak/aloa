import html2canvas from "html2canvas";
import saveAs from "file-saver";
import { useRef } from "react";

const capture = function () {
  const divRef = useRef < HTMLDivElement > null;

  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
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
    <div className="App">
      <div
        ref={divRef}
        style={{ backgroundColor: "lime", width: "300px", height: "200px" }}
      >
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
      </div>
      <button onClick={handleDownload}>다운로드</button>
    </div>
  );
};
export default capture;

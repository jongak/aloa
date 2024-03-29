import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image";
import Button from "../../components/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import LootCard from "../../components/common/LootCard";
import saveAs from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";

const getData = async function (id) {
  try {
    const res = await axios.get(`/images/effect/${id}/0`);
    return JSON.parse(res.data);
  } catch (err) {
    // console.error(err);
  }
};

const Current = function () {
  const { id } = useParams();
  const navigate = useNavigate();
  const copyLinkRef = useRef({ value: "" });
  const copyHTMLRef = useRef({ value: "" });
  const [effectRef, setEffectRef] = useState({ rarityPreset: "holographic" });

  const copyLinkUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      toast.success(`링크를 복사했습니다.`);
    });
  };
  const copyHTMLUrl = function () {
    copyHTMLRef.current.focus();
    copyHTMLRef.current.select();

    navigator.clipboard.writeText(copyHTMLRef.current.value).then(() => {
      toast.success(`HTML 태그를 복사했습니다.`);
    });
  };
  const handleFrontDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href =
      process.env.REACT_APP_API_SERVER + "/images/front/" + id;
    downloadLink.download = id + "_front.png";
    downloadLink.click();
  };
  const handleBackDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = process.env.REACT_APP_API_SERVER + "/images/back/" + id;
    downloadLink.download = id + "_back.png";
    downloadLink.click();
  };

  const cardRef = useRef();
  const fullDown = () => {
    const card = cardRef.current;
    domtoimage.toBlob(card).then((blob) => {
      saveAs(blob, "aloacard.png");
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(id);
      if (res) {
        setEffectRef(res);
      } else {
        navigate("../capture");
        toast.error("카드를 먼저 만들어 주세요");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // id가 변경될 때마다 useEffect를 실행

  const openPdfInNewTab = () => {
    const newWindow = window.open(
      process.env.REACT_APP_API_SERVER + "/file/1",
      "_blank"
    );
    if (newWindow) {
      newWindow.focus();
    } else {
      toast.error(
        "팝업이 차단되었습니다. 팝업 차단을 해제하고 다시 시도하세요."
      );
    }
  };

  return (
    <div className="option-area getCard col-lg-10 col-md-10">
      <div className="progress">
        <div className="inner">
          <h3>{id} 님의 카드</h3>
          <Button
            title={
              <>
                {" "}
                <i className="fa fa-history" aria-hidden="true"></i> 히스토리
              </>
            }
            href={"./history"}
          />
        </div>
      </div>
      <div className="option-body getCard">
        <div
          className="col-sm-12 mt-5"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {/* 나중에 db에 저장된 커스텀모드 불러오기 가능해야할듯 */}
          <LootCard
            img={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
            {...effectRef}
            size={{ height: 400, width: 300 }}
          />

          <LootCard
            img={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
            {...effectRef}
            size={{ height: 400, width: 300 }}
          />
        </div>

        <div style={{ position: "absolute", top: "-200%" }}>
          <div ref={cardRef} style={{ position: "absolute", display: "flex" }}>
            <img
              src={process.env.REACT_APP_API_SERVER + "/images/front/" + id}
              style={{ height: "800px", width: "600px" }}
            />
            <img
              src={process.env.REACT_APP_API_SERVER + "/images/back/" + id}
              style={{ height: "800px", width: "600px" }}
            />
          </div>
        </div>

        <h3>
          <i className="fa fa-download"></i> &nbsp;&nbsp; 카드 저장하기
        </h3>
        <div className="userRow">
          <div className="buttonCover">
            <Button
              title={"카드전체 저장"}
              onClick={() => {
                fullDown();
              }}
            />
            <Button title={"앞면저장"} onClick={handleFrontDownload} />
            <Button title={"뒷면저장"} onClick={handleBackDownload} />
          </div>
        </div>
        <h3>
          <i className="fa fa-share-nodes"></i> &nbsp;&nbsp; 카드 공유하기
        </h3>
        <div className="userRow">
          <div className="find-input">
            <input
              className="form-control"
              ref={copyLinkRef}
              value={process.env.REACT_APP_SERVER + "cards/" + id}
              onChange={() => {}}
            ></input>

            <Button
              title={
                <>
                  <i className="fa fa-clipboard" />
                  &nbsp;&nbsp;클립보드에 복사
                </>
              }
              onClick={copyLinkUrl}
            />
          </div>

          <div className="find-input">
            <input
              className="form-control"
              type="text"
              ref={copyHTMLRef}
              value={
                `<a href='${process.env.REACT_APP_SERVER}cards/${id}'> ` +
                `<img ` +
                `loading='lazy' ` +
                `src='${process.env.REACT_APP_API_SERVER}/images/front/${id}' ` +
                `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
                `/> ` +
                `<img ` +
                `loading='lazy' ` +
                `src='${process.env.REACT_APP_API_SERVER}/images/back/${id}' ` +
                `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
                `/> ` +
                `</a> ` +
                `<div> ` +
                `더많은 카드를 만들기 위해서 <a href='${process.env.REACT_APP_SERVER}'>ALOA</a> 방문 ` +
                `</div> `
              }
              onChange={() => {}}
            />

            <Button
              title={
                <>
                  <i className="fa fa-clipboard" />
                  &nbsp;&nbsp;HTML 태그 복사
                </>
              }
              onClick={copyHTMLUrl}
            />
          </div>
          <div className="find-input">
            <Button
              title={
                <>
                  <i className="fa fa-file-pdf" />
                  &nbsp;&nbsp; 설명서 보기
                </>
              }
              onClick={openPdfInNewTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Current;

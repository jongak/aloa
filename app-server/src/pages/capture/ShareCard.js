import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
import ToggleButton from "../../components/common/ToggleButton";

const ShareCard = function () {
  const {
    setPage,
    handleFrontDown,
    handleBackDown,
    handleServer,
    characterNameRef,
  } = useOutletContext();
  const navigate = useNavigate();

  const copyLinkRef = useRef({ value: "" });
  const copyHTMLRef = useRef({ value: "" });

  const frontURL = useRef({ value: "" });
  const backURL = useRef({ value: "" });

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("share");
  }, []);

  const openPdfInNewTab = () => {
    const newWindow = window.open(
      process.env.REACT_APP_API_SERVER + "/user/file/2",
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

  const newHTML = function (front, back) {
    const frontImgTag = front
      ? `<img ` +
        `loading='lazy' ` +
        `src='${front}' ` +
        `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
        `/> `
      : "";
    const backImgTag = back
      ? `<img ` +
        `loading='lazy' ` +
        `src='${back}' ` +
        `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
        `/> `
      : "";
    return (
      `<a href='${process.env.REACT_APP_SERVER}'> ` +
      frontImgTag +
      backImgTag +
      `</a> ` +
      `<div> ` +
      `더많은 카드를 만들기 위해서 <a href='${process.env.REACT_APP_SERVER}'>ALOA</a> 방문 ` +
      `</div> `
    );
  };

  const copyCardUrl = function () {
    navigator.clipboard
      .writeText(newHTML(frontURL.current.value, backURL.current.value))
      .then(() => {
        if (frontURL.current.value || backURL.current.value) {
          toast.success(`HTML 태그를 복사했습니다.`);
        } else {
          toast.error("URL을 입력해 주세요");
        }
      });
  };

  return (
    <div className="option-body share">
      <h3>04. 공유하기</h3>
      <div className="userRow">
        <div className="buttonCover">
          <Button
            title={
              <>
                <i className="fa fa-download" /> &nbsp;&nbsp; 앞면 저장
              </>
            }
            onClick={handleFrontDown}
          />
          <Button
            title={
              <>
                <i className="fa fa-download" /> &nbsp;&nbsp; 뒷면 저장
              </>
            }
            onClick={handleBackDown}
          />
        </div>

        <div className="find-input">
          <input
            className="form-control"
            ref={copyLinkRef}
            value={
              process.env.REACT_APP_SERVER + "cards/" + characterNameRef.current
            }
            onChange={() => {}}
          ></input>
          <CopyToClipboard
            text={copyLinkRef.current.value}
            onCopy={() => {
              toast.success(`링크를 복사했습니다.`);
            }}
          >
            <Button
              title={
                <>
                  <i className="fa fa-clipboard" />
                  &nbsp;&nbsp;클립보드에 복사
                </>
              }
            />
          </CopyToClipboard>
        </div>

        <div className="find-input">
          <input
            className="form-control"
            type="text"
            ref={copyHTMLRef}
            value={
              `<a href='${process.env.REACT_APP_SERVER}cards/${characterNameRef.current}'> ` +
              `<img ` +
              `loading='lazy' ` +
              `src='${process.env.REACT_APP_API_SERVER}/images/front/${characterNameRef.current}' ` +
              `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
              `/> ` +
              `<img ` +
              `loading='lazy' ` +
              `src='${process.env.REACT_APP_API_SERVER}/images/back/${characterNameRef.current}' ` +
              `style='height: 400px; width: 300px; aspect-ratio: 300 / 400' ` +
              `/> ` +
              `</a> ` +
              `<div> ` +
              `더많은 카드를 만들기 위해서 <a href='${process.env.REACT_APP_SERVER}'>ALOA</a> 방문 ` +
              `</div> `
            }
            onChange={() => {}}
          />
          <CopyToClipboard
            text={copyHTMLRef.current.value}
            onCopy={() => {
              toast.success(`HTML 태그를 복사했습니다.`);
            }}
          >
            <Button
              title={
                <>
                  <i className="fa fa-clipboard" />
                  &nbsp;&nbsp;HTML 태그 복사
                </>
              }
            />
          </CopyToClipboard>
        </div>

        <div className="find-input">
          <Button
            title={
              <>
                <i className="fa fa-cloud-upload" />
                &nbsp;&nbsp; 서버에 저장
              </>
            }
            onClick={handleServer}
          />
        </div>
        <div className="userbody">
          서버에 저장은 캐릭터당 하루에 한번만 가능합니다.
        </div>
      </div>
      <h3>
        <i className="fa fa-server"></i> 서버상태 확인
      </h3>
      <div className="userRow">
        <img
          src={process.env.REACT_APP_API_SERVER + "/images/front/abcd123456789"}
          style={{ width: "80%" }}
        />
        <div className="userbody">
          위에 사진이 없다면 이미지 서버에 문제가 생긴거에요.
          <br />
          아래설명서를 확인하시고 진행해 주세요.
        </div>
        <div className="find-input">
          <input
            className="form-control"
            ref={frontURL}
            placeholder="앞면 이미지 URL"
          ></input>
        </div>
        <div className="find-input">
          <input
            className="form-control"
            ref={backURL}
            placeholder="뒷면 이미지 URL"
          ></input>
        </div>
        <div className="buttonCover small">
          <Button
            title={
              <>
                <i className="fa fa-clipboard" />
                &nbsp;&nbsp; HTML 태그 복사
              </>
            }
            onClick={copyCardUrl}
          />
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
      <Button href="../set" title={"이전"} />
      <Button isClickable={false} title={"다음"} />
    </div>
  );
};

export default ShareCard;

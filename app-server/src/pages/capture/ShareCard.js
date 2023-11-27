import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import UserItem from "../../components/item/UserItem";
import { toast, ToastContainer } from "react-toastify";
import CopyToClipboard from "react-copy-to-clipboard";
const ShareCard = function () {
  const {
    setPage,
    handleFrontDown,
    handleBackDown,
    handleServer,
    characterNameRef,
  } = useOutletContext();
  const navigate = useNavigate();

  if (!characterNameRef.current) {
    navigate("../");
  }
  useEffect(() => {
    setPage("share");
  }, []);

  const copyLinkRef = useRef({ value: "" });
  const copyHTMLRef = useRef({ value: "" });

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
            onCopy={() => toast.success(`링크를 복사했습니다.`)}
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
              `<a href='${process.env.REACT_APP_SERVER}'> ` +
              `<img ` +
              `loading='lazy' ` +
              `src='${process.env.REACT_APP_API_SERVER}/images/front/${characterNameRef.current}' ` +
              `style='height: 400; width: 300; aspect-ratio: 300 / 400' ` +
              `/> ` +
              `<img ` +
              `loading='lazy' ` +
              `src='${process.env.REACT_APP_API_SERVER}/images/back/${characterNameRef.current}' ` +
              `style='height: 400; width: 300; aspect-ratio: 300 / 400' ` +
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
                <i className="fa fa-cloud-download" />
                &nbsp;&nbsp; 서버에 저장
              </>
            }
            onClick={handleServer}
          />
        </div>
      </div>
      <Button href="../set" title={"이전"} />
      <Button isClickable={false} title={"다음"} />
    </div>
  );
};

export default ShareCard;

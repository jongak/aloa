import { useNavigate, useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import UserItem from "../../components/item/UserItem";

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
  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      alert("링크를 복사했습니다.");
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
                <i className="fa fa-download" /> 앞면 저장
              </>
            }
            onClick={handleFrontDown}
          />
          <Button
            title={
              <>
                <i className="fa fa-download" /> 뒷면 저장
              </>
            }
            onClick={handleBackDown}
          />
        </div>

        <div className="find-input">
          <input
            className="form-control"
            ref={copyLinkRef}
            value={process.env.REACT_APP_API_SERVER}
            onChange={() => {}}
          ></input>
          <Button title={"클립보드에 복사"} onClick={copyTextUrl} />
        </div>

        <Button
          title={
            <>
              <i className="fa fa-download" /> 서버에 저장
            </>
          }
          onClick={handleServer}
        />
      </div>
      <Button href="../set" title={"이전"} />
      <Button isClickable={false} title={"다음"} />
    </div>
  );
};

export default ShareCard;

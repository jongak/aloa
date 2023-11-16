import { useOutletContext } from "react-router";
import Button from "../../components/common/Button";
import { useEffect, useRef } from "react";
import UserItem from "../../components/item/UserItem";

const ShareCard = function () {
  const { setPage, handleFrontDown, handleBackDown } = useOutletContext();

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
        <Button
          title={
            <>
              <i className="fa fa-download" /> 앞면 저장
            </>
          }
          onClick={handleFrontDown}
          style={{ padding: "10px 50px", fontSize: "20px" }}
        />
        <Button
          title={
            <>
              <i className="fa fa-download" /> 뒷면 저장
            </>
          }
          onClick={handleBackDown}
          style={{ padding: "10px 50px", fontSize: "20px" }}
        />

        <input type="text" ref={copyLinkRef} value={"http://localhost:3000"} />
        <Button title={"복사"} onClick={copyTextUrl} />
      </div>
      <Button href="../set" title={"이전"} />
      <Button isFixed title={"다음"} />
    </div>
  );
};

export default ShareCard;

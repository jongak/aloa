import { useRef } from "react";
import Button from "../../components/common/Button";
import { toast } from "react-toastify";

const Share = function (props) {
  const { handleBackDown, handleFrontDown, handleServer } = props;

  const copyLinkRef = useRef();

  const copyTextUrl = function () {
    copyLinkRef.current.focus();
    copyLinkRef.current.select();

    navigator.clipboard.writeText(copyLinkRef.current.value).then(() => {
      toast.success(`링크를 복사했습니다.`);
    });
  };
  return (
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
          value={process.env.REACT_APP_SERVER}
          onChange={() => {}}
        ></input>
        <Button title={"클립보드에 복사"} onClick={copyTextUrl} />
      </div>

      <div className="find-input">
        <Button
          title={
            <>
              <i className="fa fa-cloud-download" /> 서버에 저장
            </>
          }
          onClick={handleServer}
        />
      </div>
    </div>
  );
};
export default Share;

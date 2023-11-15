import { useNavigate } from "react-router";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="main-banner container">
        <div className="js-preloader">
          <div className="preloader-inner">
            <span className="dot"></span>
            <div className="dots">
              <span>
                <br />
                <br />
              </span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className="textCover">
          <div className="text-danger title">404</div>
          <div>존재하지 않는 페이지 입니다.</div>
        </div>
        <Button
          href="/"
          title="메인 페이지"
          divStyle={{ padding: "10px", marginTop: "50px" }}
          style={{ width: "100px", padding: "5px 20px", fontSize: "20px" }}
        />
      </div>
    </>
  );
}

export default NotFound;

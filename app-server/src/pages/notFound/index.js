import { useNavigate } from "react-router";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import LootCard from "../../components/common/LootCard";

function NotFound() {
  return (
    <>
      <div className="main-banner container">
        <div className="js-preloader">
          {/* <div className="preloader-inner">
            <span className="dot"></span>
            <div className="dots">
              <span>
                <br />
                <br />
              </span>
              <span></span>
              <span></span>
            </div>
          </div> */}
        </div>
        <div>
          {/* <img src="/assets/images/404_card.png" style={{ width: "400px" }} /> */}

          <LootCard
            img={"/assets/images/404_card.png"}
            size={{ height: 400, width: 300 }}
          />
        </div>
        <div
          className="textCover"
          style={{ padding: "10px", marginTop: "50px" }}
        >
          <div className="text-danger title">404</div>
          <div>준비중 입니다.</div>
        </div>
        <br />
        <Button
          href="/"
          title="메인 페이지로 가기"
          style={{ padding: "5px 20px", fontSize: "20px" }}
        />
      </div>
    </>
  );
}

export default NotFound;

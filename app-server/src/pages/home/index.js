import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/common/Card";
// import Tilt from "react-parallax-tilt";
import { Tilt } from "react-next-tilt";
// import "./holofoil.css";
import "./cards.css";
import { useRef } from "react";

function Home() {
  const queryRef = useRef("");
  const navigate = useNavigate();

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/character/${queryRef.current.value}`);
    }
  };

  const handleButtonClick = () => {
    navigate(`/character/${queryRef.current.value}`);
  };
  return (
    <>
      <div className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="caption header-text">
                <img src="/assets/images/logo2.png" />
                {/* <h6>aLoa에 오신 것을 환영합니다</h6>
                <h2>
                  로아를 더욱 편하게
                  <br /> 이용하세요!
                </h2> */}

                <div className="search-input">
                  <form>
                    <input
                      type="text"
                      placeholder="Type Something"
                      ref={queryRef}
                      onKeyPress={handleOnKeyPress}
                    />
                    <button onClick={handleButtonClick}>
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="features" style={{ margin: 0 }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <Link to="#">
                      <div className="item">
                        <div className="image">
                          <img
                            src="/assets/images/featured-04.png"
                            alt=""
                            style={{ maxWidth: "44px" }}
                          />
                          <div className="card__shine"></div>
                        </div>
                        <h4>나만의 로아카드를 만들어보세요</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 offset-lg-2">
              <div className="right-image">
                <Tilt>
                  <img src="/assets/images/card_example.png" alt="" />
                </Tilt>
                <Tilt>
                  <Card />
                </Tilt>

                <Tilt
                  lineGlareEnable={false}
                  tiltProps={{
                    [`className`]: "card dragon / masked",
                    [`data-rarity`]: "rare holo v",
                  }}
                  tiltStyle={{
                    "background-color": "#fff",
                    "--pointer-x": "50%",
                    "--pointer-y": "50%",
                    "--pointer-from-center": 0,
                    "--pointer-from-top": "0.5",
                    "--pointer-from-left": "0.5",
                    "--card-opacity": 0,
                    "--rotate-x": "0deg",
                    "--rotate-y": "0deg",
                    "--background-x": "50%",
                    "--background-y": "50%",
                    "--card-scale": "1",
                    "--translate-x": "0px",
                    "--translate-y": "0px",
                  }}
                  style={{ width: "150%" }}
                >
                  <div className="card__translater">
                    <button
                      className="card__rotator"
                      aria-label="Expand the Pokemon Card; Dragonite V."
                      tabIndex="0"
                    >
                      <div className="card__front">
                        <img
                          // src="https://images.pokemontcg.io/pgo/49_hires.png"
                          src="/assets/images/card_example.png"
                          className="inner-element"
                          alt="Front design of the Dragonite V Pokemon Card, with the stats and info around the edge"
                          loading="lazy"
                          width="660"
                          height="921"
                        />
                        <div className="card__shine"></div>{" "}
                        <div className="card__glare"></div>
                      </div>
                    </button>
                  </div>
                </Tilt>
                {/* <span className="price">$22</span>
                <span className="offer">-40%</span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

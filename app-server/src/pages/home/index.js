import { Link } from "react-router-dom";
import Card from "../../components/common/Card";

function Home() {
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
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                    />
                    <button role="button">Search Now</button>
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
                <img src="/assets/images/card_example.png" alt="" />
                {/* <span className="price">$22</span>
                <span className="offer">-40%</span> */}
              </div>
            </div>

            <section>
              <Card />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

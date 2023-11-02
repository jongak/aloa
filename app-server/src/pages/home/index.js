import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import LootCardItem from "../../components/common/LootCardItem";
import Button from "../../components/common/Button";

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
            <div className="col-lg-12 align-self-center">
              <div className="caption header-text">
                <img src="/assets/images/logo2.png" />
                <div className="search-input">
                  <form>
                    <input
                      type="text"
                      placeholder="Type Something"
                      ref={queryRef}
                      onKeyPress={handleOnKeyPress}
                    />
                    <Button
                      onClick={handleButtonClick}
                      title={<i className="fa fa-search"></i>}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="myCards row">
              <div className="col-xl-4 col-lg-6 col-sm-12 mb-5">
                <LootCardItem />
              </div>
              <div className="col-xl-4  col-lg-6 mb-5">
                <LootCardItem />
              </div>
              <div className="col-xl-4  col-lg-6 mb-5">
                <LootCardItem />
              </div>
              <div className="col-xl-4 col-lg-6 mb-5">
                <LootCardItem />
              </div>
              <div className="col-xl-4  col-lg-6 mb-5">
                <LootCardItem />
              </div>
              <div className="col-xl-4  col-lg-6 mb-5">
                <LootCardItem />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

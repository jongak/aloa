import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import LootCardItem from "../../components/item/LootCardItem";

function Home() {
  const queryRef = useRef("");
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.mainSlice.isDark);

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      navigate(`/cards/${queryRef.current.value}`);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    navigate(`/character/${queryRef.current.value}`);
  };
  return (
    <>
      <div className="main-banner container">
        <div className="row">
          <div className="col-lg-12 align-self-center">
            <div className="caption header-text">
              <div className="logo" style={{ display: "flex" }}>
                <img src={`/assets/images/logo/logo_mark_${isDark}.png`} />
                <img src={`/assets/images/logo/logo_name_${isDark}.png`} />
              </div>
              <div className="search-input">
                <form>
                  <input
                    type="text"
                    placeholder="닉네임을 입력해 주세요."
                    ref={queryRef}
                    onKeyPress={handleOnKeyPress}
                  />
                  <Button
                    onClick={handleButtonClick}
                    isFixed={true}
                    isRev={true}
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
    </>
  );
}

export default Home;

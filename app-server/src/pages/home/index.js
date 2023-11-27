import { useNavigate } from "react-router-dom";

import { useRef } from "react";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import LootCard from "../../components/common/LootCard";

const getData = async function (id) {
  try {
    const res = await axios.get(`/character/characters/${id}`);
    if (res.data.ok) {
      return res.data.data;
    }
    return;
  } catch (err) {
    console.error(err);
  }
};

function Home() {
  const queryRef = useRef("");
  const navigate = useNavigate();
  const isDark = useSelector((state) => state.mainSlice.isDark);

  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      handleButtonClick(e);
    }
  };

  const handleButtonClick = async (e) => {
    e.preventDefault();

    if (queryRef.current.value) {
      var tmp = await getData(queryRef.current.value);
      console.log(tmp);
      if (tmp) {
        navigate(`/cards/${queryRef.current.value}`);
      } else {
        toast.error(`잘못된 아이디 입니다.`);
        queryRef.current.value = "";
        queryRef.current.focus();
      }
    } else {
      toast.error(`아이디를 입력해 주세요`);
      queryRef.current.value = "";
      queryRef.current.focus();
    }
  };
  return (
    <>
      <div className="main-banner container">
        <div className="row justify-content-center">
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
              <LootCard
                img={"/assets/images/sample1.png"}
                size={{ height: 400, width: 300 }}
              />
            </div>
            <div className="col-xl-4  col-lg-6 mb-5">
              <LootCard
                img={"/assets/images/sample2.png"}
                size={{ height: 400, width: 300 }}
              />
            </div>
            <div className="col-xl-4  col-lg-6 mb-5">
              <LootCard
                img={"/assets/images/sample3.png"}
                rarityPreset="legendary"
                size={{ height: 400, width: 300 }}
              />
            </div>
            <div className="col-xl-4 col-lg-6 mb-5">
              <LootCard
                img={"/assets/images/sample4.png"}
                holographicOptions={{
                  glow: true,
                  color1: "#0077be",
                  color2: "#0087b3",
                  color3: "#0097a8",
                  color4: "#00a799",
                  color5: "#00b78e",
                }}
                shineOptions={{
                  color1: "#6dd5ed",
                  color2: "#2193b0",
                }}
                shadowOptions={{
                  default: {
                    color1: "#6dd5ed",
                    color2: "#2193b0",
                  },
                  hover: {
                    color1: "#6dd5ed",
                    color2: "#2193b0",
                  },
                }}
                size={{ height: 400, width: 300 }}
              />
            </div>
            <div className="col-xl-4  col-lg-6 mb-5">
              <LootCard
                img={"/assets/images/sample5.png"}
                size={{ height: 400, width: 300 }}
              />
            </div>
            <div className="col-xl-4  col-lg-6 mb-5">
              <LootCard
                img={"/assets/images/sample6.png"}
                rarityPreset="holographic"
                size={{ height: 400, width: 300 }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

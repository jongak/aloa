import axios from "axios";
import "./holofoil.css";
import { useEffect, useRef } from "react";

const imgurl = [
  "https://img.lostark.co.kr/armory/7/20b6dbe15f97e00ed8a1e38bc65661f7ae6ba10d06e6071852f25ca6d3c6b05d.png",
  "https://img.lostark.co.kr/armory/7/eb6148f94d92abe15db50db40380bd9e1c9fd93e5fa874002df5a11dae9713cb.png",
  "https://img.lostark.co.kr/armory/0/ab436ac6397b67e6a5f48651c2dc8de9b416ee00d328bbfa6744f348ae55c773.png",
];

const CardImgP = function ({
  setIsLoading,
  divRef,
  bgImgSrc = "https://cdn-lostark.game.onstove.com/uploadfiles/banner/a4bcb45671d44e938c2f7e0efccf7e54.jpg",
}) {
  const imgRef = useRef([{}, {}, {}]);
  const getData = async function (url) {
    try {
      const res = await axios.get(`/?url=${url}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    imgurl.map(async (url, i) => {
      const base64Data = await getData(url);
      imgRef.current[i].src = base64Data;
      // imgRef.current[i].src = url;
    });
    setTimeout(() => {
      setIsLoading(true);
    }, 300);
  }, []);
  return (
    <div
      className="cardImg"
      ref={divRef}
      style={{ margin: "100px", width: "600px", height: "800px" }}
    >
      <div
        className="cardBody"
        style={{
          backgroundImage: `url(${bgImgSrc})`,
          backgroundSize: "cover",
          display: "inline-block",
          width: "600px",
          height: "800px",
        }}
      >
        <div
          className="cardTop"
          style={{
            // backgroundColor: "yellow",
            width: "100%",
            height: "10%",
          }}
        >
          <img
            className="cardLogo"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "10px",
              border: "3px solid white",
            }}
            src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSylObVvIpNu_ftQLq2m5wxKpcmZJCej42XOoaXO-DbA8wEboSp"
          />
          <span style={{ color: "white" }}>로스트 아크</span>
          <span
            style={{
              color: "white",
              borderRadius: "10px",
              border: "3px solid white",
              padding: "5px",
            }}
          >
            KR
          </span>
        </div>
        <div
          className="cardMiddle"
          style={{
            // backgroundColor: "yellow",
            width: "100%",
            height: "50%",
            position: "relative",
          }}
        >
          <div
            className="cardImgs"
            style={{
              // backgroundColor: "green",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {[0, 1, 2].map((item) => (
              <div
                className="imgCrop"
                key={item}
                style={{
                  width: "30%",
                  height: "90%",
                  overflow: "hidden",
                }}
              >
                <img
                  className="cardCharacter"
                  ref={(ref) => (imgRef.current[item] = ref)}
                  style={{
                    transform: "scale(2,2) translate(-0%,30%)",
                  }}
                />
              </div>
            ))}
          </div>
          <div
            className="ImgTitles"
            style={{
              backgroundColor: "#cccccc",
              opacity: 0.5,
              width: "100%",
              height: "50%",
              position: "absolute",
              top: "80%",
              left: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div
              className="ImgTitle"
              style={{
                margin: "50px",
              }}
            >
              <div>송도나봉선</div>
              <div>1560</div>
              <div>질병군단장</div>
            </div>
            <div
              className="ImgTitle"
              style={{
                margin: "50px",
              }}
            >
              <div>송도나봉선</div>
              <div>1560</div>
              <div>질병군단장</div>
            </div>
            <div
              className="ImgTitle"
              style={{
                margin: "50px",
              }}
            >
              <div>송도나봉선</div>
              <div>1560</div>
              <div>질병군단장</div>
            </div>
          </div>
        </div>
        <div
          className="cardBlank"
          style={{
            width: "100%",
            height: "15%",
          }}
        ></div>
        <div
          className="cardBottom"
          style={{
            // backgroundColor: "blue",
            width: "100%",
            height: "25%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div className="cardBottomItem">
            <img
              className="cardLogo"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
                border: "3px solid white",
              }}
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSylObVvIpNu_ftQLq2m5wxKpcmZJCej42XOoaXO-DbA8wEboSp"
            />
            <div>원정대 레벨</div>
          </div>
          <div className="cardBottomItem">
            <img
              className="cardLogo"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
                border: "3px solid white",
              }}
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSylObVvIpNu_ftQLq2m5wxKpcmZJCej42XOoaXO-DbA8wEboSp"
            />
            <div>원정대 레벨</div>
          </div>
          <div className="cardBottomItem">
            <img
              className="cardLogo"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50px",
                border: "3px solid white",
              }}
              src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSylObVvIpNu_ftQLq2m5wxKpcmZJCej42XOoaXO-DbA8wEboSp"
            />
            <div>원정대 레벨</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardImgP;

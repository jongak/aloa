import axios from "axios";
import { useEffect, useRef, useState } from "react";

const getData = async function (url) {
  try {
    const res = await axios.get(`/?url=${url}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const getDataCard = async function (id) {
  try {
    const res = await axios.get(`/character/carddata/${id}`);
    if (res.data.ok) {
      return res.data.data;
    }
    return;
  } catch (err) {
    console.error(err);
  }
};

const CardFront = function ({
  characterNameRef,
  setIsLoading,
  style,
  divRef,
  bgImgSrc = "/assets/images/card_bg.png",
  bgFrame = "/assets/images/card_frame.png",
}) {
  const imgRef = useRef();
  const [userData, setUserData] = useState();
  const engraving = [
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_71.png",
      Name: "원한 Lv. 3",
      Description:
        "보스 등급 이상 몬스터에게 주는 피해가 20% 증가하지만, 받는 피해가 20% 증가한다.",
    },
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_237.png",
      Name: "저주받은 인형 Lv. 3",
      Description:
        "공격력이 16% 증가하지만, 받는 생명력 회복 효과가 25% 감소한다. (자연 회복 제외)",
    },
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_148.png",
      Name: "기습의 대가 Lv. 3",
      Description: "백어택 성공 시 피해량이 추가로 25% 증가한다.",
    },
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/buff/buff_210.png",
      Name: "돌격대장 Lv. 3",
      Description:
        "기본 이동 속도 증가량 % 의 45% 만큼 적에게 주는 피해량이 증가한다.",
    },
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/ability/ability_207.png",
      Name: "절정 Lv. 3",
      Description:
        "스탠스를 전환할 때 획득하는 난무/집중 효과에 추가로 반대 스탠스 효과의 100%를 획득한다.",
    },
    {
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/ability/ability_235.png",
      Name: "아드레날린 Lv. 1",
      Description:
        "이동기 및 기본공격을 제외한 스킬 사용 시 6초 동안 공격력이 0.3% 증가하며 (최대 6중첩) 해당 효과가 최대 중첩 도달 시 치명타 적중률이 추가로 5% 증가한다. 해당 효과는 스킬 취소에 따른 재사용 대기시간 감소가 적용되는 경우, 스킬 종료 후 적용된다.",
    },
  ];

  useEffect(() => {
    if (characterNameRef.current) {
      getDataCard(characterNameRef.current).then((res) => {
        setUserData(res);
        console.log(res);
      });
    }
  }, [characterNameRef.current]);

  useEffect(() => {
    if (characterNameRef.current) {
      getData(userData["ArmoryProfile"]["CharacterImage"]).then((res) => {
        imgRef.current = res;
      });
      setTimeout(() => {
        setIsLoading(true);
      }, 500);
    }
  }, [userData]);
  // console.log(userData.ArmoryProfile.CharacterName);
  return (
    <div
      className="cardImg"
      ref={divRef}
      style={{ ...style, margin: "100px", width: "600px", height: "800px" }}
    >
      <div
        className="cardBody"
        style={{
          background: "#15181D",
          backgroundSize: "cover",
          display: "inline-block",
          width: "600px",
          height: "800px",
          position: "relative",
        }}
      >
        <img
          src={bgFrame}
          style={{ position: "absolute", zIndex: "10", right: 0 }}
        />

        <div
          className="cardTop"
          style={{
            // width: "89px",
            height: "40px",
            position: "absolute",
            zIndex: "999",
            top: "46px",
            right: "60px",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              backgroundColor: "#80808038",
              borderRadius: "15px",

              opacity: "1",
              fontSize: "20px",
              fontWeight: "800",
              padding: "14px",
              lineHeight: "40px",
              color: "#fff",
            }}
          >
            {userData ? userData.ArmoryProfile.ServerName : "서버명"}
          </span>
        </div>
        <div
          className="cardMiddle"
          style={{
            // backgroundColor: "yellow",
            width: "100%",
            height: "100%",
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
            <div
              className="cardCharacter"
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${imgRef.current})`,
                backgroundRepeat: "no-repeat",
                opacity: 1,
                backgroundPositionY: "40px",
              }}
            ></div>
          </div>
          <div
            className="engraves"
            style={{ position: "absolute", top: "120px", right: "60px" }}
          >
            <ul>
              {engraving.map((item) => (
                <li key={item.Icon} style={{ width: "40px" }}>
                  <img
                    src={item.Icon}
                    style={{
                      borderRadius: "50%",
                      overflow: "hidden",
                      marginBottom: "4px",
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div
            className="ImgTitles"
            style={{
              background:
                "linear-gradient(0deg, rgba(70,69,69,0.7) 40%, rgba(70,69,69,0.0) 100%)",
              width: "100%",
              height: "400px",
              position: "absolute",
              bottom: "0",
              left: "0px",
              alignItems: "center",
              textAlign: "center",
              paddingTop: "116px",
            }}
          >
            <div className="class_mark">
              <img
                src="/assets/images/class_mark/mark-lancemaster-border.png"
                style={{
                  paddingLeft: "10px",
                  width: "88px",
                  position: "absolute",
                  top: "32px",
                  left: "56px",
                }}
              />
            </div>

            <div className="row justify-content-center">
              <div className="col align-self-center">
                <h3
                  style={{
                    color: "#fff",
                    fontWeight: "800",
                    textShadow: "2px 3px 4px #15181D",
                    marginBottom: "20px",
                    paddingRight: "16px",
                  }}
                >
                  {userData ? userData.ArmoryProfile.CharacterName : "닉네임"}
                </h3>
              </div>
            </div>
            <div
              className="lvl"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "-21px",
                textShadow: "2px 3px 4px #15181D",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              <div
                className="ImgTitle"
                style={{
                  color: "#fff",
                  display: "flex",
                  padding: "0 10px",
                }}
              >
                <div>
                  <img src="/assets/images/power.png" />
                </div>
                <div>
                  {userData ? userData.ArmoryProfile.ItemAvgLevel : "-"}
                </div>
              </div>
              <div
                className="ImgTitle"
                style={{
                  color: "#fff",
                  display: "flex",
                  padding: "0 10px",
                }}
              >
                <div>
                  <img src="/assets/images/team.png" />
                </div>
                <div>
                  Lv {userData ? userData.ArmoryProfile.ExpeditionLevel : "-"}
                </div>
              </div>
            </div>

            <div className="container" style={{ marginTop: "10px" }}>
              <div
                className="row justify-content-center"
                style={{
                  color: "#fff",
                  textShadow: "2px 3px 4px #15181D",
                  fontSize: "18px",
                  padding: "0 48px",
                }}
              >
                <div className="col-2">
                  <div>세트</div>
                  <div style={{ fontSize: "22px", fontWeight: "600" }}>
                    사멸
                  </div>
                </div>
                <div className="col-2">
                  <div>보석</div>
                  <div style={{ fontSize: "22px", fontWeight: "600" }}>
                    Lv 9.7
                  </div>
                </div>
                <div className="col-2">
                  <div>엘릭서</div>
                  <div style={{ fontSize: "22px", fontWeight: "600" }}>
                    달인
                  </div>
                </div>
                <div className="col-2">
                  <div>카드</div>
                  <div style={{ fontSize: "20px", fontWeight: "600" }}>
                    세구빛
                  </div>
                </div>
                <div className="col-2">
                  <div>악추피</div>
                  <div style={{ fontSize: "22px", fontWeight: "600" }}>
                    6.78%
                  </div>
                </div>
              </div>
            </div>

            <div
              className="container"
              style={{ marginTop: "32px", width: "85%" }}
            >
              <div
                className="row justify-content-center"
                style={{ color: "#fff" }}
              >
                <div className="col-2">
                  <div>
                    <img src="https://cdn-lostark.game.onstove.com/efui_iconatlas/lm_item/lm_item_01_145.png" />
                  </div>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                    }}
                  >
                    +25
                  </span>
                </div>
                <div className="col-2">
                  <div>
                    <img src="https://cdn-lostark.game.onstove.com/efui_iconatlas/ability/ability_257.png" />
                  </div>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                      left: "230px",
                    }}
                  >
                    9
                  </span>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                      left: "254px",
                    }}
                  >
                    7
                  </span>
                </div>

                <div className="col-2" style={{ marginLeft: "-16px" }}>
                  <div>
                    <img src="/assets/images/exlixer.webp" />
                  </div>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                    }}
                  >
                    40
                  </span>
                </div>
                <div className="col-2" style={{ marginLeft: "-16px" }}>
                  <div>
                    <img
                      src="/assets/images/card2.png"
                      style={{
                        width: "40px",
                        height: "58px",
                        boxShadow:
                          "#FFF 0 -1px 4px, #ff0 0 -2px 10px, #ff8000 0 -10px 20px, 44px -38px 17px 50px rgba(0,0,0,0)",
                      }}
                    />
                  </div>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                    }}
                  >
                    30
                  </span>
                </div>
                <div className="col-2" style={{ marginLeft: "-16px" }}>
                  <div>
                    <img src="/assets/images/cho.png" />
                  </div>
                  <span
                    style={{
                      borderRadius: "10px",
                      backgroundColor: "blue",
                      padding: "2px 5px",
                      fontWeight: "700",
                      position: "absolute",
                      top: "330px",
                    }}
                  >
                    40
                  </span>
                </div>
              </div>
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
      </div>
    </div>
  );
};
export default CardFront;

import axios from "axios";
import "./cardBack.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const CardBack = function ({
  characterNameRef,
  setIsLoading,
  style,
  divRef,
  bgImgSrc = "/assets/images/card_back.png",
  bgFrame = "/assets/images/card_frame.png",
}) {
  const userData = useSelector((state) => state.captureSlice.userData);

  const cardGrade = {
    일반: 1,
    고급: 2,
    희귀: 3,
    영웅: 4,
    전설: 5,
  };

  const equipQuality = function (qualityValue) {
    if (qualityValue == 100) return "orange";
    else if (qualityValue > 89) return "hotpink";
    else if (qualityValue > 69) return "blue";
    else if (qualityValue > 29) return "green";
    else if (qualityValue > 9) return "yello";
    else return "red";
  };

  const equipGrade = {
    고대: "#bca37d",
    유물: "#e25041",
    전설: "#fba026",
    영웅: "#7504fb",
    희귀: "#2d82c9",
    고급: "#60db6d",
    일반: "#475577",
  };
  if (!userData["ArmoryProfile"]) {
    return;
  }
  return (
    <div className="cardImg_b" ref={divRef} style={{ ...style }}>
      <div
        className="cardBody"
        style={{
          backgroundImage: `url(${bgImgSrc})`,
        }}
      >
        <div className="cardTop container">
          <div className="row justify-content-start">
            <div className="col-2 class_mark">
              <img id="back_logo" src="/assets/images/logo_back3.png" />
            </div>
            <div className="col-7 back_nickname align-self-center d-flex">
              <h3>
                {userData && userData["ArmoryProfile"]["CharacterName"]
                  ? userData["ArmoryProfile"]["CharacterName"]
                  : "열두자까지가능한닉네임임"}
              </h3>
            </div>

            <div className="col-3 align-self-center back_servername">
              <span>
                {userData && userData["ArmoryProfile"]["ServerName"]
                  ? userData["ArmoryProfile"]["ServerName"]
                  : "서버명여기"}
              </span>
            </div>
          </div>
        </div>
        <div className="cardMiddle">
          <div className="container back_options">
            <div className="row">
              <div className="col-7 back_options_left">
                <div className="row elixNcho">
                  <div className="col-7 align-items-center elixir">
                    <img src="/assets/images/exlixer.webp" />
                    <div>
                      {userData &&
                      userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                        ? "Lv" +
                          userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                        : "-"}
                      {/* Lv 47 (27.68%) */}
                    </div>
                  </div>
                  <div className="col-4 align-items-center trans">
                    <img src="/assets/images/cho.png" />
                    <div>
                      {userData &&
                      userData["ArmoryEquipment"]["option"]["TransLevel"]
                        ? userData["ArmoryEquipment"]["option"]["TransLevel"]
                        : "-"}
                    </div>
                  </div>
                </div>
                <div className="row gems">
                  <div className="col-8 gem">
                    <img src="/assets/images/gem.webp" />
                    <span>
                      {" "}
                      {userData && userData["ArmoryGem"]["option"]["MeulNum"]
                        ? userData["ArmoryGem"]["option"]["MeulNum"] + "멸"
                        : "-"}{" "}
                      {userData && userData["ArmoryGem"]["option"]["HongNum"]
                        ? userData["ArmoryGem"]["option"]["HongNum"] + "홍"
                        : ""}
                      {"  "}
                      {userData && userData["ArmoryGem"]["option"]["Level"]
                        ? "Lv " + userData["ArmoryGem"]["option"]["Level"]
                        : ""}
                      {/* 5멸 6홍 평균Lv 10 */}
                    </span>
                  </div>
                </div>
                <div className="row plusDamage">
                  <div className="col-3">악마</div>
                  <div className="col-3 plusDamage_td">6.98%</div>
                  <div className="col-3">인간</div>
                  <div className="col-3 plusDamage_td">5.32%</div>
                  <div className="col-3">야수</div>
                  <div className="col-3 plusDamage_td">3.47%</div>
                  <div className="col-3">식물</div>
                  <div className="col-3 plusDamage_td">4.67%</div>
                  <div className="col-3">불사</div>
                  <div className="col-3 plusDamage_td">4.23%</div>
                </div>

                <div className="row stats">
                  <div className="col-10 back_stats_bg">
                    <span id="back_characterlevel">
                      {userData && userData["ArmoryProfile"]["CharacterLevel"]
                        ? "Lv " + userData["ArmoryProfile"]["CharacterLevel"]
                        : "Lv 60"}
                    </span>
                    <span>
                      {userData &&
                      userData["ArmoryProfile"]["CharacterClassName"]
                        ? userData["ArmoryProfile"]["CharacterClassName"]
                        : "디스트로이어"}
                    </span>
                  </div>
                  <div className="col-10 back_stats_bg">
                    <span>특화</span>
                    <span>
                      {userData && userData["ArmoryProfile"]["Stats"]["특화"]
                        ? userData["ArmoryProfile"]["Stats"]["특화"]
                        : "1673"}
                    </span>
                  </div>
                  <div className="col-10 back_stats_bg">
                    <span>치명</span>
                    <span>
                      {userData && userData["ArmoryProfile"]["Stats"]["치명"]
                        ? userData["ArmoryProfile"]["Stats"]["치명"]
                        : "675"}
                    </span>
                  </div>
                  <div className="col-10 back_stats_bg">
                    <span>길드</span>
                    <span className="back_guildname">
                      {userData && userData["ArmoryProfile"]["GuildName"]
                        ? userData["ArmoryProfile"]["GuildName"]
                        : "길드명도열두자까지가능함"}
                    </span>
                  </div>
                </div>

                <div className="engravings">
                  <ul>
                    {userData ? (
                      userData["ArmoryEngraving"]["fullEffects"].map((item) => (
                        <li key={item.Icon}>
                          <img className="engraving full" src={item.Icon} />
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                        <li className="engraving empty">
                          <div></div>
                        </li>
                      </>
                    )}
                    {userData
                      ? userData["ArmoryEngraving"]["Effects"].map((item) => (
                          <li key={item.Icon}>
                            <img className="engraving" src={item.Icon} />
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-2 back_options_right">
                <div className="equipments">
                  <ul>
                    {userData && userData["ArmoryEquipment"]
                      ? [
                          userData["ArmoryEquipment"]["무기"],
                          userData["ArmoryEquipment"]["투구"],
                          userData["ArmoryEquipment"]["상의"],
                          userData["ArmoryEquipment"]["하의"],
                          userData["ArmoryEquipment"]["어깨"],
                          userData["ArmoryEquipment"]["장갑"],
                        ].map((item) => (
                          <li key={item._key}>
                            <span
                              className="equipments_badge"
                              style={{
                                backgroundColor: `${equipGrade[item["Grade"]]}`,
                              }}
                            >
                              +{item["ItemGrade"]}
                            </span>
                            <img
                              id="back_equipment_trans"
                              src={
                                `/assets/images/cho/cho_${item["TransGrade"]}.png` ||
                                ""
                              }
                            />
                            <img src={item["Icon"]} />
                            <div>
                              <div
                                className="back_equipment_quality"
                                style={{
                                  width: `${item["qualityValue"]}%`,
                                  backgroundColor: `${equipQuality(
                                    item["qualityValue"]
                                  )}`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))
                      : ""}
                  </ul>
                </div>
              </div>
              <div className="col-2 back_options_right">
                <div className="accessory">
                  <ul>
                    {userData && userData["ArmoryEquipment"]
                      ? [
                          userData["ArmoryEquipment"]["목걸이"],
                          userData["ArmoryEquipment"]["귀걸이"][0],
                          userData["ArmoryEquipment"]["귀걸이"][1],
                          userData["ArmoryEquipment"]["반지"][0],
                          userData["ArmoryEquipment"]["반지"][1],
                        ].map((item) => (
                          <li key={item._key}>
                            {/* <span className="accessory_badge">+25</span> */}

                            <img src={item["Icon"]} />
                            <div>
                              <div
                                className="back_accessory_quality"
                                style={{
                                  width: `${item["qualityValue"]}%`,
                                  backgroundColor: `${equipQuality(
                                    item["qualityValue"]
                                  )}`,
                                }}
                              ></div>
                            </div>
                          </li>
                        ))
                      : ""}
                    <li>
                      <span className="accessory_badge">
                        {userData &&
                        userData["ArmoryEquipment"]["어빌리티 스톤"]
                          ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                              "engravings00"
                            ]["level"]
                          : ""}
                      </span>
                      <span className="accessory_badge">
                        {userData &&
                        userData["ArmoryEquipment"]["어빌리티 스톤"]
                          ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                              "engravings01"
                            ]["level"]
                          : ""}
                      </span>
                      <span className="accessory_badge">
                        {userData &&
                        userData["ArmoryEquipment"]["어빌리티 스톤"]
                          ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                              "engravings02"
                            ]["level"]
                          : ""}
                      </span>

                      <img
                        src={
                          userData &&
                          userData["ArmoryEquipment"]["어빌리티 스톤"]
                            ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                                "Icon"
                              ]
                            : ""
                        }
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cardBottom">
          <div className="col back_card_awakename">세구빛 30</div>

          <div className="container back_card_container">
            <div className="row align-items-end">
              {/* {cards.map((item) => (
                <div key={item._key} className="col-2 back_card_slot">
                  <img
                    className="back_card_grade"
                    src="/assets/images/card/card_grade_3.png"
                  />
                  <img
                    className="back_card_awake"
                    src="/assets/images/card/card_awake_5.png"
                  />

                  <img src={item.Icon} />
                </div>
              ))} */}
              {userData && userData["ArmoryCard"]["Cards"] ? (
                userData["ArmoryCard"]["Cards"].map((item) => (
                  <div key={item.slot} className="col-2 back_card_slot">
                    <img
                      className="back_card_grade"
                      src={`/assets/images/card/card_grade_${
                        cardGrade[item.Grade]
                      }.png`}
                    />
                    <img
                      className="back_card_awake"
                      src={`/assets/images/card/card_awake_${item.AwakeCount}.png`}
                    />

                    <img src={item.Icon} />
                  </div>
                ))
              ) : (
                <div className="col-2 back_card_slot">
                  <div id="back_card_none"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardBack;

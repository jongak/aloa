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
  const isName = useSelector((state) => state.captureSlice.isName);
  const isLevel = useSelector((state) => state.captureSlice.isLevel);
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
  if (!userData || !userData["ArmoryProfile"]) {
    return;
  }
  return (
    <div className="cardCover back" ref={divRef} style={{ ...style }}>
      <div
        className="cardBody"
        style={{
          backgroundImage: `url(${bgImgSrc})`,
        }}
      >
        <div className="cardTop">
          <img id="back_logo" src="/assets/images/logo_back3.png" />
          <h3>{isName ? userData["ArmoryProfile"]["CharacterName"] : "-"}</h3>
          <span className="servername">
            {userData["ArmoryProfile"]["ServerName"]}
          </span>
        </div>
        <div className="cardMiddle container">
          <div className="options row">
            <div className="options_left col-7">
              <div className="option_box">
                <div className="option_item">
                  <img src="/assets/images/icons/exlixer.webp" />
                  <div>
                    {"Lv" +
                      userData["ArmoryEquipment"]["option"]["ElixirLevel"]}
                  </div>
                </div>
                <div className="option_item">
                  <img src="/assets/images/cho/cho_5.png" />
                  <div>
                    {userData["ArmoryEquipment"]["option"]["TransLevel"]}
                  </div>
                </div>
                <div className="option_item">
                  <img src="/assets/images/icons/10meol.webp" />
                  <div>
                    {" "}
                    {userData["ArmoryGem"]["option"]["MeulNum"]}
                    {"멸 "}
                    {userData["ArmoryGem"]["option"]["HongNum"]}
                    {"홍  "}
                    {"Lv " +
                      (userData["ArmoryGem"]["option"]["Level"]
                        ? userData["ArmoryGem"]["option"]["Level"]
                        : "0")}
                  </div>
                </div>
                {/* <div className="col-3">악마</div>
                <div className="col-3 plusDamage_td">6.98%</div>
                <div className="col-3">인간</div>
                <div className="col-3 plusDamage_td">5.32%</div>
                <div className="col-3">야수</div>
                <div className="col-3 plusDamage_td">3.47%</div>
                <div className="col-3">식물</div>
                <div className="col-3 plusDamage_td">4.67%</div>
                <div className="col-3">불사</div>
                <div className="col-3 plusDamage_td">4.23%</div> */}
              </div>

              <div className="row stats">
                <div className="col-10 back_stats_bg">
                  <span id="back_characterlevel">
                    {userData && userData["ArmoryEngraving"]["JobEffects"][0]
                      ? userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
                      : ""}
                  </span>
                  <span>
                    {userData && userData["ArmoryProfile"]["CharacterClassName"]
                      ? userData["ArmoryProfile"]["CharacterClassName"]
                      : "소드마스터"}
                  </span>
                </div>
                <div className="col-10 back_stats_bg">
                  <span>{userData["MainStat"]["statName"]}</span>
                  <span>{userData["MainStat"]["statValue"]}</span>
                </div>
                <div className="col-10 back_stats_bg">
                  <span>{userData["SubStat"]["statName"]}</span>
                  <span>{userData["SubStat"]["statValue"]}</span>
                </div>
                <div className="col-10 back_stats_bg">
                  <span>길드</span>
                  <span className="back_guildname">
                    {isName ? userData["ArmoryProfile"]["GuildName"] : "-"}
                  </span>
                </div>
              </div>

              <div className="row engravings">
                <ul>
                  {userData
                    ? userData["ArmoryEngraving"]["JobEffects"].map((item) => (
                        <li key={item.Name + Math.floor(Math.random() * 10000)}>
                          <img className="engraving" src={item.Icon} />
                        </li>
                      ))
                    : ""}
                  {userData ? (
                    userData["ArmoryEngraving"]["fullEffects"].map((item) => (
                      <li key={item.Name + Math.floor(Math.random() * 10000)}>
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
                        <li key={item.Name + Math.floor(Math.random() * 10000)}>
                          <img className="engraving" src={item.Icon} />
                        </li>
                      ))
                    : ""}
                </ul>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="options_right col-2 ">
              <div className="equipments">
                <ul>
                  {[
                    userData["ArmoryEquipment"]["무기"],
                    userData["ArmoryEquipment"]["투구"],
                    userData["ArmoryEquipment"]["상의"],
                    userData["ArmoryEquipment"]["하의"],
                    userData["ArmoryEquipment"]["어깨"],
                    userData["ArmoryEquipment"]["장갑"],
                  ].map((item) => (
                    <li key={item.Name + Math.floor(Math.random() * 10000)}>
                      {isLevel ? (
                        ""
                      ) : (
                        <span
                          className="equipments_badge"
                          style={{
                            backgroundColor: `${equipGrade[item["Grade"]]}`,
                          }}
                        >
                          +{item["ItemGrade"]}
                        </span>
                      )}
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
                      {item["TransGrade"] ? (
                        <img
                          id="back_equipment_trans"
                          src={`/assets/images/cho/cho_${item["TransGrade"]}.png`}
                        />
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="options_right col-2 ">
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
                        <li key={item.Name + Math.floor(Math.random() * 10000)}>
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
                    <span
                      className="accessory_badge"
                      style={{
                        backgroundColor:
                          equipGrade[
                            userData["ArmoryEquipment"]["어빌리티 스톤"][
                              "Grade"
                            ]
                          ],
                      }}
                    >
                      {userData["ArmoryEquipment"]["어빌리티 스톤"]
                        ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                            "engravings00"
                          ]["level"]
                        : ""}
                    </span>
                    <span
                      className="accessory_badge"
                      style={{
                        backgroundColor:
                          equipGrade[
                            userData["ArmoryEquipment"]["어빌리티 스톤"][
                              "Grade"
                            ]
                          ],
                      }}
                    >
                      {userData["ArmoryEquipment"]["어빌리티 스톤"]
                        ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                            "engravings01"
                          ]["level"]
                        : ""}
                    </span>

                    <img
                      src={
                        userData && userData["ArmoryEquipment"]["어빌리티 스톤"]
                          ? userData["ArmoryEquipment"]["어빌리티 스톤"]["Icon"]
                          : ""
                      }
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="cardBottom">
          <div className="card_awakename col">
            {userData["ArmoryCard"]["AwakeName"] +
              " " +
              userData["ArmoryCard"]["AwakeCount"]}
          </div>

          <div className="card_container container">
            <div className="row align-items-end">
              {userData && userData["ArmoryCard"]["Cards"] ? (
                userData["ArmoryCard"]["Cards"].map((item) => (
                  <div
                    key={item.Name + Math.floor(Math.random() * 10000)}
                    className="card_slot col-2"
                  >
                    <img
                      className="card_grade"
                      src={`/assets/images/card/card_grade_${
                        cardGrade[item.Grade]
                      }.png`}
                    />
                    <img
                      className="card_awake"
                      src={`/assets/images/card/card_awake_${item.AwakeCount}.png`}
                    />

                    <img src={item.Icon} />
                  </div>
                ))
              ) : (
                <div className="col-2 card_slot">
                  <div id="card_none"></div>
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

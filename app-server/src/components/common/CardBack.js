import { useSelector } from "react-redux";
import OptionBox from "../item/OptionBox";

const cardGrade = {
  일반: 1,
  고급: 2,
  희귀: 3,
  영웅: 4,
  전설: 5,
};

const changeJobEng = {
  "광전사의 비기": "비기",
  광기: "광기",
  "분노의 망치": "분망",
  "중력 수련": "중수",
  "고독한 기사": "고기",
  "전투 태세": "전태",
  "축복의 오라": "축오",
  심판자: "심판자",
  처단자: "처단자",
  포식자: "포식자",
  초심: "초심",
  "오의 강화": "오의",
  "충격 단련": "충단",
  "극의: 체술": "체술",
  역천지체: "역천",
  세맥타통: "세맥",
  절정: "절정",
  절제: "절제",
  일격필살: "일격",
  오의난무: "오의",
  "강화 무기": "강무",
  핸드거너: "핸건",
  "포격 강화": "포강",
  "화력 강화": "화강",
  "죽음의 습격": "죽습",
  "두 번째 동료": "두동",
  "아르데타인의 기술": "기술",
  "진화의 유산": "유산",
  피스메이커: "피메",
  "사냥의 시간": "사시",
  "황후의 은총": "황후",
  "황제의 칙령": "황제",
  "상급 소환사": "상소",
  "넘치는 교감": "교감",
  "절실한 구원": "절구",
  "진실된 용맹": "용맹",
  점화: "점화",
  환류: "환류",
  "완벽한 억제": "억제",
  "멈출 수 없는 충동": "충동",
  "잔재된 기운": "잔재",
  버스트: "버스트",
  "달의 소리": "달소",
  갈증: "갈증",
  "만월의 집행자": "만월",
  "그믐의 경계": "그믐",
  만개: "만개",
  회귀: "회귀",
  이슬비: "이슬비",
  질풍노도: "질풍",
  "수라의 길": "수라",
  권왕파천무: "권왕",
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

const CardBack = function ({
  characterNameRef,
  setIsLoading,
  style,
  divRef,
  bgImgSrc = "/assets/images/card_back.png",
  bgFrame = "/assets/images/card_frame.png",
}) {
  const userData = useSelector((state) => state.itemSlice.userData);
  const isName = useSelector((state) => state.itemSlice.isName);
  const isLevel = useSelector((state) => state.itemSlice.isLevel);
  const optionItems = useSelector((state) => state.itemSlice.optionItems);
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
              <OptionBox elements={optionItems["done"]} />

              <div className="row stats">
                <div className="col-10 back_stats_bg">
                  <span id="back_characterlevel">
                    {userData && userData["ArmoryEngraving"]["JobEffects"][0]
                      ? changeJobEng[
                          userData["ArmoryEngraving"]["JobEffects"][0]["Name"]
                        ]
                      : "-"}
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

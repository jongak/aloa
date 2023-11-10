import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./cardFront.css";
import { useSelector } from "react-redux";

const change = {
  기상술사: "aeromancer",
  아르카나: "arcana",
  도화가: "artist",
  바드: "bard",
  배틀마스터: "battlemaster",
  버서커: "berserker",
  블레이드: "blade",
  블래스터: "blaster",
  데모닉: "demonic",
  디스트로이어: "destroyer",
  데빌헌터: "devilhunter",
  건슬링어: "gunslinger",
  호크아이: "hawkeye",
  홀리나이트: "holyknight",
  인파이터: "infighter",
  창술사: "lancemaster",
  리퍼: "reaper",
  스카우터: "scouter",
  슬레이어: "slayer",
  소서리스: "sorceress",
  소울이터: "soulEater",
  기공사: "soulmaster",
  스트라이커: "striker",
  서머너: "summoner",
  워로드: "warlord",
  암살자: "assassin",
  "무도가(여)": "fighter_female",
  "무도가(남)": "fighter-male",
  "헌터(남)": "hunter_male",
  "헌터(여)": "hunter-female",
  마법사: "magician",
  스페셜리스트: "specialist",
  "전사(여)": "warrior-female",
  "전사(남)": "warrior-male",
};

const getData = async function (url) {
  try {
    const res = await axios.get(`/?url=${url}`);
    return res.data;
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
  const userData = useSelector((state) => state.captureSlice.userData);

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

  if (!userData["ArmoryProfile"]) {
    return;
  }
  return (
    <div className="cardCover front" ref={divRef} style={{ ...style }}>
      <div className="cardBody">
        <img id="cardFrame" src={bgFrame} />

        <div className="cardTop">
          <span className="servername">
            {userData["ArmoryProfile"]["ServerName"]}
          </span>
          <div className="class_mark">
            <img
              src={
                userData
                  ? `/assets/images/class_mark/mark-${
                      change[userData["ArmoryProfile"]["CharacterClassName"]]
                    }-border.png`
                  : ""
              }
            />
          </div>
        </div>
        <div className="cardMiddle">
          <div className="cardImgs">
            <div
              className={`cardCharacter ${
                change[userData["ArmoryProfile"]["CharacterClassName"]]
              }`}
              style={{
                backgroundImage: `url(${imgRef.current})`,
              }}
            ></div>
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
          <div className="title">
            <div className="row justify-content-center">
              <div className="titlename col align-self-center">
                <h2>
                  {userData ? userData["ArmoryProfile"]["Title"] : "칭호"}
                </h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="nickname col align-self-center">
                <h2>
                  {userData
                    ? userData["ArmoryProfile"]["CharacterName"]
                    : "열두자까지가능한닉네임임"}
                </h2>
              </div>
            </div>
            <div className="lvl">
              <div className="equipments_lvl">
                <div>
                  <img src="/assets/images/power.png" />
                </div>
                <span>
                  {userData
                    ? userData["ArmoryProfile"]["ItemAvgLevel"].substring(0, 5)
                    : " -"}
                </span>
                <sub>
                  {userData
                    ? userData["ArmoryProfile"]["ItemAvgLevel"].substring(5, 8)
                    : " "}
                </sub>
              </div>
              <div className="expedition_lvl">
                <div>
                  <img src="/assets/images/team.png" />
                </div>
                <div>
                  Lv{" "}
                  {userData
                    ? userData["ArmoryProfile"]["ExpeditionLevel"]
                    : "-"}
                </div>
              </div>
            </div>

            <div className="info container">
              <div className="info_table row justify-content-center">
                <div className="info_table_tr col-2">
                  <div className="info_table_th">세트</div>
                  <div className="info_table_td">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["SetOption"]
                      ? userData["ArmoryEquipment"]["option"]["SetOption"]
                      : "-"}
                  </div>
                </div>
                <div className="info_table_tr col-2">
                  <div className="info_table_th">보석</div>
                  <div className="info_table_td">
                    <span style={{ letterSpacing: 0 }}>
                      {userData && userData["ArmoryGem"]["option"]["Level"]
                        ? "Lv" +
                          userData["ArmoryGem"]["option"]["Level"].toPrecision(
                            2
                          )
                        : "-"}
                    </span>
                  </div>
                </div>
                <div className="info_table_tr col-2">
                  <div className="info_table_th">엘릭서</div>
                  <div className="info_table_td">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["ElixirName"]
                      ? userData["ArmoryEquipment"]["option"]["ElixirName"]
                      : "-"}
                  </div>
                </div>
                <div className="info_table_tr col-3">
                  <div className="info_table_th">카드</div>
                  <div className="info_table_td">
                    {userData && userData["ArmoryCard"]["AwakeName"]
                      ? userData["ArmoryCard"]["AwakeName"]
                      : "-"}
                  </div>
                </div>
                <div className="info_table_tr col-2">
                  <div className="info_table_th">악추피</div>
                  <div className="info_table_td">6.78%</div>
                </div>
              </div>
            </div>

            <div className="info_icons container">
              <div className="icons_table row justify-content-center">
                <div className="icons_table_tr col-2">
                  <div>
                    <img
                      src={
                        userData
                          ? userData.ArmoryEquipment.무기.Icon
                          : "/assets/images/default_slot/weapon.png"
                      }
                    />
                  </div>
                  <span className="icons_table_badge">
                    {userData
                      ? "+" + userData.ArmoryEquipment.무기.ItemGrade
                      : ""}
                  </span>
                </div>
                <div className="icons_table_tr col-2">
                  <div>
                    <img
                      src={
                        userData &&
                        userData["ArmoryEquipment"]["어빌리티 스톤"]["Icon"]
                          ? userData["ArmoryEquipment"]["어빌리티 스톤"]["Icon"]
                          : "/assets/images/default_slot/stone.png"
                      }
                    />
                  </div>
                  <span className="icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["어빌리티 스톤"][
                      "engravings00"
                    ]["level"] &&
                    userData["ArmoryEquipment"]["어빌리티 스톤"][
                      "engravings01"
                    ]["level"] &&
                    userData["ArmoryEquipment"]["어빌리티 스톤"][
                      "engravings02"
                    ]["level"]
                      ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                          "engravings00"
                        ]["level"] +
                        " " +
                        userData["ArmoryEquipment"]["어빌리티 스톤"][
                          "engravings01"
                        ]["level"] +
                        " " +
                        userData["ArmoryEquipment"]["어빌리티 스톤"][
                          "engravings02"
                        ]["level"]
                      : ""}
                  </span>
                </div>

                <div className="icons_table_tr col-2">
                  <div>
                    <img src="/assets/images/exlixer.webp" />
                  </div>
                  <span className="icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                      ? userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                      : "-"}
                  </span>
                </div>
                <div className="icons_table_tr col-2">
                  <div>
                    <img id="icons_card" src="/assets/images/card.png" />
                  </div>
                  <span className="icons_table_badge">
                    {userData && userData["ArmoryCard"]["AwakeCount"]
                      ? userData["ArmoryCard"]["AwakeCount"]
                      : ""}
                  </span>
                </div>
                <div className="icons_table_tr col-2">
                  <div>
                    <img src="/assets/images/cho.png" />
                  </div>
                  <span className="icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["TransLevel"]
                      ? userData["ArmoryEquipment"]["option"]["TransLevel"]
                      : "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardFront;

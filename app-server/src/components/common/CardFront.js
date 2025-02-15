import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./cardFront.css";
import { useSelector } from "react-redux";
import InfoTableItem from "../item/InfoTableItem";
import InfoIconItem from "../item/InfoIconItem";

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
  브레이커: "breaker",
};

const engravingGradeColor = {
  // TODO:색찾아서 넣기
  유물: "#e25041",
  전설: "#fba026",
  영웅: "#7504fb",
};

const getData = async function (url) {
  try {
    console.log(url);
    const res = await axios.get(`?url=${url}`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

const CardFront = function ({ setIsLoading, style, divRef }) {
  const userData = useSelector((state) => state.itemSlice.userData);
  const frontItems = useSelector((state) => state.itemSlice.frontItems);
  const frontIcons = useSelector((state) => state.itemSlice.frontIcons);
  const isName = useSelector((state) => state.itemSlice.isName);
  const isTitle = useSelector((state) => state.itemSlice.isTitle);
  const isLevel = useSelector((state) => state.itemSlice.isLevel);
  const framePreset = useSelector((state) => state.captureSlice.framePreset);
  const frameColor = useSelector((state) => state.captureSlice.frameColor);
  const [characterImage, setCharacterImage] = useState("");

  useEffect(() => {
    if (userData && userData["ArmoryProfile"]) {
      setIsLoading(false);
      getData(userData["ArmoryProfile"]["CharacterImage"]).then((res) => {
        setCharacterImage(res);
      });
      setTimeout(() => {
        setIsLoading(true);
      }, 500);
    }
  }, [userData]);

  if (!userData || !userData["ArmoryProfile"]) {
    return;
  }

  return (
    <div className="cardCover front" ref={divRef} style={{ ...style }}>
      <img
        id="cardFrame"
        src={`/assets/images/card_frame/${framePreset}/${frameColor}.png`}
      />
      <div className="cardBody">
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
                backgroundImage: characterImage ? `url(${characterImage})` : "",
              }}
            ></div>
          </div>
          <div className="engravings">
            <ul>
              {userData ? (
                userData["ArmoryEngraving"]["ArkPassiveEffects"]?.map(
                  (item) => (
                    <li
                      className="engraving_item"
                      key={item.Name}
                      style={{ marginBottom: "8px" }}
                    >
                      <img src={`/img/engraving/${item.Name}.png`} />
                      <div className="engraving_grade">
                        <div
                          style={{
                            background: engravingGradeColor[item.Grade],
                            transform: `scaleY(${item.Level / 4})`,
                          }}
                        />
                      </div>
                    </li>
                  )
                )
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
            </ul>
          </div>
          <div className="title">
            <div className="row justify-content-center">
              <div className="titlename col align-self-center">
                <h2>{isTitle ? userData["ArmoryProfile"]["Title"] : ""}</h2>
              </div>
            </div>
            <div className="row justify-content-center">
              <div className="nickname col align-self-center">
                <h2>
                  {isName ? userData["ArmoryProfile"]["CharacterName"] : "-"}
                </h2>
              </div>
            </div>
            <div className="lvl">
              <div className="equipments_lvl">
                <div>
                  <img src="/assets/images/icons/power.png" />
                </div>
                <span>
                  {isLevel
                    ? userData["ArmoryProfile"]["ItemAvgLevel"].substring(
                        0,
                        4
                      ) + "0+"
                    : userData["ArmoryProfile"]["ItemAvgLevel"].substring(0, 5)}
                </span>
                {isLevel ? undefined : (
                  <sub>
                    {userData["ArmoryProfile"]["ItemAvgLevel"].substring(5, 8)}
                  </sub>
                )}
              </div>
              <div className="expedition_lvl">
                <div>
                  <img src="/assets/images/icons/team.png" />
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
                {frontItems["done"]?.map((element) => (
                  <InfoTableItem key={element.id} element={element} />
                ))}
              </div>
            </div>

            <div className="info_icons container">
              <div className="icons_table row justify-content-center">
                {frontIcons["done"]?.map((element) => (
                  <InfoIconItem key={element.id} element={element} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardFront;

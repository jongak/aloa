import axios from "axios";
import { useEffect, useRef, useState } from "react";
import "./card.css";

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
  return (
    <div className="cardImg" ref={divRef} style={{ ...style }}>
      <div className="cardBody">
        <img id="cardFrame" src={bgFrame} />

        <div className="cardTop">
          <span className="card_front_servername">
            {userData ? userData.ArmoryProfile.ServerName : "서버명"}
          </span>
        </div>
        <div className="cardMiddle">
          <div className="cardImgs">
            <div
              className="cardCharacter"
              style={{
                backgroundImage: `url(${imgRef.current})`,
              }}
            ></div>
          </div>
          <div className="engraves">
            <ul>
              {userData ? (
                userData["ArmoryEngraving"]["fullEffects"].map((item) => (
                  <li key={item.Icon}>
                    <img className="card_front_engraves" src={item.Icon} />
                  </li>
                ))
              ) : (
                <li className="empty_engraving">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </li>
              )}
              {userData
                ? userData.ArmoryEngraving.Effects.map((item) => (
                    <li key={item.Icon}>
                      <img className="card_front_engraves" src={item.Icon} />
                    </li>
                  ))
                : ""}
            </ul>
          </div>
          <div className="card_front_title">
            <div className="class_mark">
              <img
                id="class_mark"
                src={
                  userData
                    ? `/assets/images/class_mark/mark-${
                        change[userData["ArmoryProfile"]["CharacterClassName"]]
                      }-border.png`
                    : ""
                }
              />
            </div>

            <div className="row justify-content-center">
              <div className="col align-self-center nickname">
                <h3>
                  {userData
                    ? userData.ArmoryProfile.CharacterName
                    : "열두자까지가능한닉네임임"}
                </h3>
              </div>
            </div>
            <div className="lvl">
              <div className="card_front_equipments_lvl">
                <div>
                  <img src="/assets/images/power.png" />
                </div>
                <div>
                  {userData
                    ? userData["ArmoryProfile"]["ItemAvgLevel"].substring(0, 6)
                    : " -"}
                </div>
                <div id="card_front_equipments_lvl_decimal">
                  {userData
                    ? userData["ArmoryProfile"]["ItemAvgLevel"].substring(6, 8)
                    : " "}
                </div>
              </div>
              <div className="card_front_expedition_lvl">
                <div>
                  <img src="/assets/images/team.png" />
                </div>
                <div>
                  Lv {userData ? userData.ArmoryProfile.ExpeditionLevel : " -"}
                </div>
              </div>
            </div>

            <div className="container card_front_info">
              <div className="row justify-content-center card_front_info_table">
                <div className="col-2 card_front_info_table_tr">
                  <div className="card_front_info_table_th">세트</div>
                  <div className="card_front_info_table_td">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["SetOption"]
                      ? userData.ArmoryEquipment.option.SetOption
                      : "-"}
                  </div>
                </div>
                <div className="col-2 card_front_info_table_tr">
                  <div className="card_front_info_table_th">보석</div>
                  <div className="card_front_info_table_td">
                    <span style={{ letterSpacing: 0 }}>
                      {userData && userData["ArmoryGem"]["option"]["Level"]
                        ? "Lv" +
                          userData["ArmoryGem"]["option"]["Level"].toPrecision(
                            2
                          )
                        : "-"}
                    </span>
                    <span style={{ fontSize: "12px", alignSelf: "center" }}>
                      {/* {userData &&
                      userData["ArmoryGem"]["option"]["Level"]
                        ? " " +
                          userData["ArmoryGem"]["option"]["Level"]
                            .toPrecision(2)
                            .substring(1, 3)
                        : " -"} */}
                    </span>
                  </div>
                </div>
                <div className="col-2 card_front_info_table_tr">
                  <div className="card_front_info_table_th">엘릭서</div>
                  <div className="card_front_info_table_td">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["ElixirName"]
                      ? userData.ArmoryEquipment.option.ElixirName
                      : "-"}
                  </div>
                </div>
                <div className="col-2 card_front_info_table_tr">
                  <div className="card_front_info_table_th">카드</div>
                  <div className="card_front_info_table_td">
                    {userData && userData["ArmoryCard"]["AwakeName"]
                      ? userData.ArmoryCard.AwakeName
                      : "-"}
                  </div>
                </div>
                <div className="col-2 card_front_info_table_tr">
                  <div className="card_front_info_table_th">악추피</div>
                  <div className="card_front_info_table_td">6.78%</div>
                </div>
              </div>
            </div>

            <div className="container card_front_icons">
              <div className="row justify-content-center card_front_icons_table">
                <div className="col-2 card_front_icons_table_tr">
                  <div>
                    <img
                      src={
                        userData
                          ? userData.ArmoryEquipment.무기.Icon
                          : "/assets/images/default_slot/weapon.png"
                      }
                    />
                  </div>
                  <span className="card_front_icons_table_badge">
                    {userData
                      ? "+" + userData.ArmoryEquipment.무기.ItemGrade
                      : ""}
                  </span>
                </div>
                <div className="col-2 card_front_icons_table_tr">
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
                  <span className="card_front_icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["어빌리티 스톤"][
                      "engravings00"
                    ]["level"]
                      ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                          "engravings00"
                        ]["level"]
                      : ""}
                  </span>
                  <span className="card_front_icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["어빌리티 스톤"][
                      "engravings01"
                    ]["level"]
                      ? userData["ArmoryEquipment"]["어빌리티 스톤"][
                          "engravings01"
                        ]["level"]
                      : ""}
                  </span>
                </div>

                <div className="col-2 card_front_icons_table_tr2">
                  <div>
                    <img src="/assets/images/exlixer.webp" />
                  </div>
                  <span className="card_front_icons_table_badge">
                    {userData &&
                    userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                      ? userData["ArmoryEquipment"]["option"]["ElixirLevel"]
                      : "-"}
                  </span>
                </div>
                <div className="col-2 card_front_icons_table_tr2">
                  <div>
                    <img
                      id="card_front_icons_card"
                      src="/assets/images/card.png"
                    />
                  </div>
                  <span className="card_front_icons_table_badge">
                    {userData && userData["ArmoryCard"]["AwakeCount"]
                      ? userData["ArmoryCard"]["AwakeCount"]
                      : ""}
                  </span>
                </div>
                <div className="col-2 card_front_icons_table_tr2">
                  <div>
                    <img src="/assets/images/cho.png" />
                  </div>
                  <span className="card_front_icons_table_badge">
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

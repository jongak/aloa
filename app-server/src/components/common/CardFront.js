import axios from "axios";
import { useEffect, useRef } from "react";
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
  // TODO:색찾ㅇ서 ㄶ기
  유물: "red",
  전설: "orange",
  영웅: "purple",
};

const getData = async function (url) {
  try {
    const res = await axios.get(`/?url=${url}`);
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
  /**
  const userData = {
    ArmoryProfile: {
      CharacterImage:
        "https://img.lostark.co.kr/armory/9/3DCFFECA51AC8843BACCA6F77034E1D986DB5F3012F7157D0F0819DC2545F35E.jpg?v=20241025112418",
      ExpeditionLevel: 324,
      PvpGradeName: "3단",
      TownLevel: 70,
      TownName: "포서린",
      Title: "카멘 The TOP10",
      GuildMemberGrade: "일반 길드원",
      GuildName: "X0",
      UsingSkillPoint: 476,
      TotalSkillPoint: 480,
      Stats: {
        치명: "1485",
        특화: "72",
        제압: "79",
        신속: "1049",
        인내: "69",
        숙련: "75",
        "최대 생명력": "308658",
        공격력: "151349",
      },
      Tendencies: {
        지성: 658,
        담력: 674,
        매력: 588,
        친절: 655,
      },
      ServerName: "루페온",
      CharacterName: "필례",
      CharacterLevel: 70,
      CharacterClassName: "배틀마스터",
      ItemAvgLevel: "1,735.83",
      ItemMaxLevel: "1,735.83",
    },
    ArmoryEquipment: {
      전체_초월_등급: 42,
      전체_초월_레벨: 126,
      엘릭서_효과: "회심",
      엘릭서_레벨: 50,
      방어구_품질: 500,
      악세_품질: 415,
      악세: {
        목걸이: [
          {
            Name: "도래한 결전의 목걸이",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_215.png",
            Grade: "고대",
            qualityValue: 88,
            연마_효과: [
              {
                Name: "적에게 주는 피해 +",
                Value: "2.00%",
              },
              {
                Name: "최대 마나 +",
                Value: "6",
              },
              {
                Name: "추가 피해 +",
                Value: "2.60%",
              },
            ],
          },
        ],
        귀걸이: [
          {
            Name: "도래한 결전의 귀걸이",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png",
            Grade: "고대",
            qualityValue: 74,
            연마_효과: [
              {
                Name: "무기 공격력 +",
                Value: "3.00%",
              },
              {
                Name: "공격력 +",
                Value: "1.55%",
              },
              {
                Name: "파티원 회복 효과 +",
                Value: "0.95%",
              },
            ],
          },
          {
            Name: "도래한 결전의 귀걸이",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_115.png",
            Grade: "고대",
            qualityValue: 99,
            연마_효과: [
              {
                Name: "상태이상 공격 지속시간 +",
                Value: "0.50%",
              },
              {
                Name: "무기 공격력 +",
                Value: "3.00%",
              },
              {
                Name: "공격력 +",
                Value: "1.55%",
              },
            ],
          },
        ],
        반지: [
          {
            Name: "도래한 결전의 반지",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png",
            Grade: "고대",
            qualityValue: 74,
            연마_효과: [
              {
                Name: "치명타 적중률 +",
                Value: "1.55%",
              },
              {
                Name: "최대 생명력 +",
                Value: "3250",
              },
              {
                Name: "치명타 피해 +",
                Value: "4.00%",
              },
            ],
          },
          {
            Name: "도래한 결전의 반지",
            Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_22.png",
            Grade: "고대",
            qualityValue: 80,
            연마_효과: [
              {
                Name: "치명타 적중률 +",
                Value: "1.55%",
              },
              {
                Name: "상태이상 공격 지속시간 +",
                Value: "0.50%",
              },
              {
                Name: "치명타 피해 +",
                Value: "4.00%",
              },
            ],
          },
        ],
      },
      장비: {
        무기: {
          Type: "무기",
          Name: "+9 용아 : 극",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_152.png",
          Grade: "에스더",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "",
            레벨: "",
          },
          Elixir01: {
            효과: "",
            레벨: "",
          },
          아이템_레벨: 1765,
        },
        투구: {
          Type: "투구",
          Name: "+24 화려한 환각의 미소 머리장식",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_182.png",
          Grade: "고대",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "힘",
            레벨: 5,
          },
          Elixir01: {
            효과: "회심 (질서)",
            레벨: 5,
          },
          아이템_레벨: 1730,
        },
        상의: {
          Type: "상의",
          Name: "+23 화려한 환각의 미소 상의",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_179.png",
          Grade: "고대",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "힘",
            레벨: 5,
          },
          Elixir01: {
            효과: "공격력",
            레벨: 5,
          },
          아이템_레벨: 1725,
        },
        하의: {
          Type: "하의",
          Name: "+23 화려한 환각의 미소 하의",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_180.png",
          Grade: "고대",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "공격력",
            레벨: 5,
          },
          Elixir01: {
            효과: "치명타 피해",
            레벨: 5,
          },
          아이템_레벨: 1725,
        },
        장갑: {
          Type: "장갑",
          Name: "+25 화려한 환각의 미소 장갑",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_181.png",
          Grade: "고대",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "공격력",
            레벨: 5,
          },
          Elixir01: {
            효과: "회심 (혼돈)",
            레벨: 5,
          },
          아이템_레벨: 1735,
        },
        어깨: {
          Type: "어깨",
          Name: "+25 화려한 환각의 미소 견갑",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_176.png",
          Grade: "고대",
          qualityValue: 100,
          상급_재련: 20,
          초월_등급: 7,
          초월_레벨: 21,
          Elixir00: {
            효과: "공격력",
            레벨: 5,
          },
          Elixir01: {
            효과: "보스 피해",
            레벨: 5,
          },
          아이템_레벨: 1735,
        },
      },
    },
    ArmoryEngraving: {
      ArkPassiveEffects: [
        {
          AbilityStoneLevel: 4,
          Grade: "유물",
          Level: 4,
          Name: "아드레날린",
        },
        {
          AbilityStoneLevel: null,
          Grade: "유물",
          Level: 4,
          Name: "예리한 둔기",
        },
        {
          AbilityStoneLevel: null,
          Grade: "유물",
          Level: 4,
          Name: "질량 증가",
        },
        {
          AbilityStoneLevel: 1,
          Grade: "유물",
          Level: 4,
          Name: "원한",
        },
        {
          AbilityStoneLevel: null,
          Grade: "유물",
          Level: 4,
          Name: "돌격대장",
        },
      ],
    },
    ArmoryGem: {
      option: {
        TenGup: 5,
        TenJak: 6,
        GupLevel: "10.00",
        GupNum: 5,
        JakLevel: "10.00",
        JakNum: 6,
        level: "10.00",
        num: 11,
      },
      Gems: [
        {
          name: "10레벨 겁화의 보석",
          isGup: true,
          isMeul: false,
          isJak: false,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 겁화의 보석",
          isGup: true,
          isMeul: false,
          isJak: false,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 겁화의 보석",
          isGup: true,
          isMeul: false,
          isJak: false,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 겁화의 보석",
          isGup: true,
          isMeul: false,
          isJak: false,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 겁화의 보석",
          isGup: true,
          isMeul: false,
          isJak: false,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
        {
          name: "10레벨 작열의 보석",
          isGup: false,
          isMeul: false,
          isJak: true,
          isHong: false,
          level: 10,
        },
      ],
    },
    ArmoryCard: {
      Cards: [
        {
          Name: "웨이",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_01_0.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
        {
          Name: "실리안",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_1.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
        {
          Name: "바훈투르",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_1.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
        {
          Name: "니나브",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_6.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
        {
          Name: "카단",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_7.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
        {
          Name: "샨디",
          Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_4.png",
          AwakeCount: 5,
          AwakeTotal: 5,
          Grade: "전설",
        },
      ],
      AwakeCount: 30,
      AwakeName: "세구빛",
    },
    ArkPassive: {
      진화: 120,
      깨달음: 98,
      도약: 60,
    },
  }; */

  useEffect(() => {
    if (userData && userData["ArmoryProfile"]) {
      setIsLoading(false);
      // getData(userData["ArmoryProfile"]["CharacterImage"]).then((res) => {
      //   imgRef.current = res;
      // });
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
                backgroundImage: `url(${getData(
                  userData["ArmoryProfile"]["CharacterImage"]
                )})`,
              }}
            ></div>
          </div>
          <div className="engravings">
            <ul>
              {userData ? (
                userData["ArmoryEngraving"]["ArkPassiveEffects"]?.map(
                  (item) => (
                    <li key={item.Name} style={{ position: "relative" }}>
                      <img
                        className="engraving"
                        src={`/img/engraving/${item.Name}.png`}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          right: "-5px",
                          color: engravingGradeColor[item.Grade],
                        }}
                      >
                        {item.Level}
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

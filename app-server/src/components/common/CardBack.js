import axios from "axios";
// import "./holofoil.css";
import { useEffect, useRef } from "react";

const imgurl = [
  "https://img.lostark.co.kr/armory/7/20b6dbe15f97e00ed8a1e38bc65661f7ae6ba10d06e6071852f25ca6d3c6b05d.png",
  "https://img.lostark.co.kr/armory/7/eb6148f94d92abe15db50db40380bd9e1c9fd93e5fa874002df5a11dae9713cb.png",
  "https://img.lostark.co.kr/armory/0/ab436ac6397b67e6a5f48651c2dc8de9b416ee00d328bbfa6744f348ae55c773.png",
];

const CardBack = function ({
  setIsLoading,
  style,
  divRef,
  bgImgSrc = "/assets/images/card_back.png",
  bgFrame = "/assets/images/card_frame.png",
}) {
  const getData = async function (url) {
    try {
      const res = await axios.get(`/?url=${url}`);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

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
  const equipments = [
    {
      Type: "무기",
      Name: "+8 용아 : 진",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_152.png",
      Grade: "에스더",
    },
    {
      Type: "투구",
      Name: "+25 고요한 광기의 지배 머리장식",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_168.png",
      Grade: "고대",
    },
    {
      Type: "상의",
      Name: "+25 고요한 광기의 지배 상의",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_171.png",
      Grade: "고대",
    },
    {
      Type: "하의",
      Name: "+25 고요한 광기의 지배 하의",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_172.png",
      Grade: "고대",
    },
    {
      Type: "장갑",
      Name: "+25 고요한 광기의 지배 장갑",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_170.png",
      Grade: "고대",
    },
    {
      Type: "어깨",
      Name: "+25 고요한 광기의 지배 견갑",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/bm_item/bm_item_01_169.png",
      Grade: "고대",
    },
    {
      Type: "목걸이",
      Name: "거룩한 선지자의 목걸이",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_204.png",
      Grade: "고대",
    },
    {
      Type: "귀걸이",
      Name: "참혹한 몰락의 귀걸이",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_113.png",
      Grade: "고대",
    },
    {
      Type: "귀걸이",
      Name: "참혹한 몰락의 귀걸이",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_113.png",
      Grade: "고대",
    },
    {
      Type: "반지",
      Name: "공허한 미래의 반지",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_11.png",
      Grade: "고대",
    },
    {
      Type: "반지",
      Name: "참혹한 몰락의 반지",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_20.png",
      Grade: "고대",
    },
    {
      Type: "어빌리티 스톤",
      Name: "준엄한 비상의 돌 IV",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/ability/ability_257.png",
      Grade: "고대",
    },
    {
      Type: "팔찌",
      Name: "찬란한 영웅의 팔찌",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_304.png",
      Grade: "고대",
    },
    {
      Type: "나침반",
      Name: "특제 성운 나침반",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_312.png",
      Grade: "유물",
    },
    {
      Type: "부적",
      Name: "광휘의 별무리 부적",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_308.png",
      Grade: "유물",
    },
    {
      Type: "문장",
      Name: "백금 용사의 문장",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/acc/acc_320.png",
      Grade: "유물",
    },
  ];
  const equip1 = equipments.slice(0, 6);
  const equip2 = equipments.slice(6, 12);
  const cards = [
    {
      Slot: 0,
      Name: "아제나&이난나",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_0.png",
      AwakeCount: 3,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>아제나&이난나</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 3,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_0.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "에스더의 일원으로, 실린들을 다스리는 실린여왕. 하나의 몸에 두 개의 영혼을 지니고 있다."\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[어비스 던전] </font><BR><Font color=\'#5FD3F1\'>[호감도] 로아룬 - 아제나</font><BR>"\r\n  }\r\n}',
    },
    {
      Slot: 1,
      Name: "니나브",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_6.png",
      AwakeCount: 3,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>니나브</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 3,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_6.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "에스더의 일원인 라제니스. 만물과 소통할 수 있는 능력을 지니고 있다."\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[어비스 던전] </font><BR><Font color=\'#5FD3F1\'>[호감도] 속삭이는 작은 섬 - 니나브</font><BR>"\r\n  }\r\n}',
    },
    {
      Slot: 2,
      Name: "카단",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_7.png",
      AwakeCount: 3,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>카단</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 3,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_7.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "모든 것이 비밀에 감춰져 있는 에스더의 일원. 최초의 가디언 슬레이어로 불린다."\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[퀘스트] 이스테르 - 상처 입은 새의 눈물</font><BR><Font color=\'#5FD3F1\'>[어비스 던전] 카양겔</font><BR>"\r\n  }\r\n}',
    },
    {
      Slot: 3,
      Name: "바훈투르",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_1.png",
      AwakeCount: 2,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>바훈투르</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 2,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_02_1.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "에스더 갈라투르의 후계자. 유쾌하고 허세 많지만, 의리 넘치는 성격."\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[어비스 던전] </font><BR><Font color=\'#5FD3F1\'>[업적] 모험 - 쇼는 계속되어야 한다!</font><BR><Font color=\'#5FD3F1\'>[물물교환] 욘 - 떠돌이 상인</font><BR>"\r\n  }\r\n}',
    },
    {
      Slot: 4,
      Name: "실리안",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_1.png",
      AwakeCount: 2,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>실리안</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 2,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_00_1.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "루테란의 왕자. 강직하고 올곧은 성품을 지니고 있다. "\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[어비스 던전] </font><BR><Font color=\'#5FD3F1\'>[모험의 서] 루테란 동부</font><BR>"\r\n  }\r\n}',
    },
    {
      Slot: 5,
      Name: "웨이",
      Icon: "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_01_0.png",
      AwakeCount: 3,
      AwakeTotal: 5,
      Grade: "전설",
      Tooltip:
        '{\r\n  "Element_000": {\r\n    "type": "NameTagBox",\r\n    "value": "<FONT COLOR=\'#F99200\'>웨이</FONT>"\r\n  },\r\n  "Element_001": {\r\n    "type": "Card",\r\n    "value": {\r\n      "awakeCount": 3,\r\n      "awakeTotal": 5,\r\n      "cardStack": "",\r\n      "iconData": {\r\n        "iconPath": "https://cdn-lostark.game.onstove.com/efui_iconatlas/card_legend/card_legend_01_0.png"\r\n      },\r\n      "isBookMark": false,\r\n      "tierGrade": 5\r\n    }\r\n  },\r\n  "Element_002": {\r\n    "type": "SingleTextBox",\r\n    "value": "에스더의 이름을 이어받은 무인. 스승을 죽인 불사귀 도철을 제압하여, 세상을 구하기 위해 나선다."\r\n  },\r\n  "Element_003": {\r\n    "type": "SingleTextBox",\r\n    "value": "<Font color=\'#5FD3F1\'>[물물교환] 애니츠 - 떠돌이 상인</font><BR><Font color=\'#5FD3F1\'>[업적] 모험 - 보스 헌터 : 고급</font><BR>"\r\n  }\r\n}',
    },
  ];
  return (
    <div
      className="cardImg"
      ref={divRef}
      style={{ ...style, margin: "100px", width: "600px", height: "800px" }}
    >
      <div
        className="cardBody"
        style={{
          backgroundImage: `url(${bgImgSrc})`,
          backgroundSize: "cover",
          display: "inline-block",
          width: "600px",
          height: "800px",
          position: "relative",
        }}
      >
        <div
          className="cardTop container"
          style={{
            // backgroundColor: "#80808038",
            position: "absolute",
            padding: "30px 20px",
          }}
        >
          <div className="row justify-content-start">
            <div className="col-2 class_mark">
              <img
                src="/assets/images/logo_back3.png"
                style={{ paddingLeft: "10px" }}
              />
            </div>
            <div className="col-8 align-self-center d-flex">
              <h3
                style={{
                  color: "#fff",
                  fontWeight: "800",
                  textShadow: "2px 3px 4px #15181D",
                  letterSpacing: "-2.3px",
                  marginLeft: "-12px",
                }}
              >
                부먹펩시파인애플피자지코
              </h3>
            </div>

            <div
              className="col-2 align-self-center"
              style={{
                backgroundColor: "#80808038",
                borderRadius: "15px",
                marginLeft: "-24px",
              }}
            >
              <span
                style={{
                  opacity: "1",
                  fontSize: "20px",
                  fontWeight: "800",
                  lineHeight: "40px",
                  color: "#fff",
                }}
              >
                실리안
              </span>
            </div>
          </div>
        </div>
        <div
          className="cardMiddle"
          style={{
            // backgroundColor: "yellow",
            width: "100%",
            height: "100%",
            position: "relative",
            paddingTop: "104px",
            color: "#fff",
          }}
        >
          <div className="container" style={{ padding: "0 40px" }}>
            <div className="row">
              <div className="col-7">
                <div className="row elixNcho">
                  <div
                    className="col-7 align-items-center"
                    style={{
                      display: "inline-flex",
                      margin: "8px 0",
                    }}
                  >
                    <img
                      src="/assets/images/exlixer.webp"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <div style={{ paddingLeft: "8px", fontWeight: "650" }}>
                      Lv 47 (27.68%)
                    </div>
                  </div>
                  <div
                    className="col-4 align-items-center"
                    style={{
                      display: "inline-flex",
                    }}
                  >
                    <img
                      src="/assets/images/cho.png"
                      style={{
                        width: "40px",
                        height: "40px",
                      }}
                    />
                    <div style={{ paddingLeft: "8px", fontWeight: "650" }}>
                      75
                    </div>
                  </div>
                </div>
                <div className="row gems">
                  <div className="col-8">
                    <img
                      src="/assets/images/gem.webp"
                      style={{ width: "32px" }}
                    />
                    <span style={{ fontWeight: "650", marginLeft: "10px" }}>
                      {" "}
                      5멸 6홍 평균Lv 10
                    </span>
                  </div>
                </div>
                <div
                  className="row plusDamage"
                  style={{
                    background: "#80808038",
                    borderRadius: "6px",
                    padding: "10px 0",
                    margin: "12px 0",
                  }}
                >
                  <div className="col-3">악마</div>
                  <div className="col-3">6.98%</div>
                  <div className="col-3">인간</div>
                  <div className="col-3">5.32%</div>
                  <div className="col-3">야수</div>
                  <div className="col-3">3.47%</div>
                  <div className="col-3">식물</div>
                  <div className="col-3">4.67%</div>
                  <div className="col-3">불사</div>
                  <div className="col-3">4.23%</div>
                </div>

                <div
                  className="row stat"
                  style={{ fontSize: "22px", fontWeight: "700" }}
                >
                  <div
                    className="col-10 align-self-center"
                    style={{
                      backgroundImage:
                        "url('/assets/images/card_back_stat_bg.png')",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "40px",
                      width: "100%",
                      lineHeight: "38px",
                      marginBottom: "4px",
                      marginLeft: "12px",
                      padding: "0 44px",
                    }}
                  >
                    <span style={{ float: "left" }}>직업</span>
                    <span>디스트로이어</span>
                  </div>
                  <div
                    className="col-10"
                    style={{
                      backgroundImage:
                        "url('/assets/images/card_back_stat_bg.png')",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "40px",
                      width: "100%",
                      lineHeight: "38px",
                      marginBottom: "4px",
                      marginLeft: "12px",
                      padding: "0 44px",
                    }}
                  >
                    <span style={{ float: "left" }}>추가</span>
                  </div>
                  <div
                    className="col-10"
                    style={{
                      backgroundImage:
                        "url('/assets/images/card_back_stat_bg.png')",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "40px",
                      width: "100%",
                      lineHeight: "38px",
                      marginBottom: "4px",
                      marginLeft: "12px",
                      padding: "0 44px",
                    }}
                  >
                    <span style={{ float: "left" }}>치명</span>
                    <span>698</span>
                  </div>
                  <div
                    className="col-10"
                    style={{
                      backgroundImage:
                        "url('/assets/images/card_back_stat_bg.png')",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      height: "40px",
                      width: "100%",
                      lineHeight: "38px",
                      marginBottom: "4px",
                      marginLeft: "12px",
                      padding: "0 44px",
                    }}
                  >
                    <span style={{ float: "left" }}>특화</span>
                    <span>1673</span>
                  </div>
                </div>

                <div className="engraves">
                  <ul style={{ display: "inline-flex", marginTop: "12px" }}>
                    {engraving.map((item) => (
                      <li
                        key={item._key}
                        style={{ width: "50px", marginRight: "4px" }}
                      >
                        <img
                          src={item.Icon}
                          style={{
                            borderRadius: "50%",
                            overflow: "hidden",
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-1"></div>
              <div className="col-2">
                <div className="equipments">
                  <ul>
                    {equip1.map((item) => (
                      <li
                        key={item._key}
                        style={{ marginBottom: "8px", position: "relative" }}
                      >
                        <span
                          style={{
                            background: "#f3ba26",
                            borderRadius: "8px",
                            padding: "0 4px",
                            position: "absolute",
                            right: "-20%",
                            fontWeight: "700",
                          }}
                        >
                          +25
                        </span>
                        <img
                          src="/assets/images/cho/cho_5.png"
                          style={{
                            width: "32px",
                            height: "28px",
                            position: "absolute",
                            top: "36px",
                            left: "40px",
                          }}
                        />
                        <img src={item.Icon} />
                        <div
                          style={{
                            background: "#82786E",
                            width: "100%",
                            height: "8px",
                          }}
                        >
                          <div
                            style={{
                              background: "orange",
                              width: "80%",
                              height: "8px",
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="col-2">
                <div className="equipments">
                  <ul>
                    {equip2.map((item) => (
                      <li key={item._key} style={{ marginBottom: "8px" }}>
                        <span
                          style={{
                            background: "#f3ba26",
                            borderRadius: "8px",
                            padding: "0 4px",
                            position: "absolute",
                            right: "5%",
                            fontWeight: "700",
                          }}
                        >
                          +25
                        </span>

                        <img src={item.Icon} />
                        <div
                          style={{
                            background: "#82786E",
                            width: "100%",
                            height: "8px",
                          }}
                        >
                          <div
                            style={{
                              background: "orange",
                              width: "80%",
                              height: "8px",
                            }}
                          ></div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col"
            style={{
              padding: "8px 16px",
              background: "#80808038",
              borderRadius: "12px",
              position: "absolute",
              left: "5%",
              bottom: "172px",
              fontWeight: "800",
              fontSize: "18px",
            }}
          >
            세구빛 30
          </div>

          <div
            className="container"
            style={{
              width: "90%",
              padding: "10px 20px",
              background: "#80808038",
              borderRadius: "8px",
              position: "absolute",
              left: "5%",
              bottom: "32px",
            }}
          >
            <div className="row align-items-end">
              {cards.map((item) => (
                <div
                  key={item._key}
                  className="col-2"
                  style={{ padding: "0 4px", position: "relative" }}
                >
                  <img
                    src="/assets/images/card/card_grade_6.png"
                    style={{
                      position: "absolute",
                      width: "91%",
                      height: "100%",
                    }}
                  />
                  <img
                    src="/assets/images/card/card_awake_5.png"
                    style={{
                      position: "absolute",
                      width: "80%",
                      left: "12%",
                      bottom: "6%",
                    }}
                  />

                  <img src={item.Icon} />
                </div>
              ))}
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
export default CardBack;

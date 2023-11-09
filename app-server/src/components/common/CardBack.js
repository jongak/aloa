import axios from "axios";
import "./cardBack.css";
import { useEffect, useRef, useState } from "react";

const imgurl = [
  "https://img.lostark.co.kr/armory/7/20b6dbe15f97e00ed8a1e38bc65661f7ae6ba10d06e6071852f25ca6d3c6b05d.png",
  "https://img.lostark.co.kr/armory/7/eb6148f94d92abe15db50db40380bd9e1c9fd93e5fa874002df5a11dae9713cb.png",
  "https://img.lostark.co.kr/armory/0/ab436ac6397b67e6a5f48651c2dc8de9b416ee00d328bbfa6744f348ae55c773.png",
];

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

const CardBack = function ({
  characterNameRef,
  setIsLoading,
  style,
  divRef,
  bgImgSrc = "/assets/images/card_back.png",
  bgFrame = "/assets/images/card_frame.png",
}) {
  const imgRef = useRef();
  const [userData, setUserData] = useState();

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
  const cardGrade = {
    일반: 1,
    고급: 2,
    희귀: 3,
    영웅: 4,
    전설: 5,
  };
  const equipQuality = {
    100: "orange",
    99: "hotpink",
    98: "hotpink",
    97: "hotpink",
    96: "hotpink",
    95: "hotpink",
    94: "hotpink",
    93: "hotpink",
    92: "hotpink",
    91: "hotpink",
    90: "hotpink",
    89: "blue",
    88: "blue",
    87: "blue",
    86: "blue",
    85: "blue",
    84: "blue",
    83: "blue",
    82: "blue",
    81: "blue",
    80: "blue",
    79: "blue",
    78: "blue",
    77: "blue",
    76: "blue",
    75: "blue",
    74: "blue",
    73: "blue",
    72: "blue",
    71: "blue",
    70: "blue",
    69: "green",
    68: "green",
    67: "green",
    66: "green",
    65: "green",
    64: "green",
    63: "green",
    62: "green",
    61: "green",
    60: "green",
    59: "green",
    58: "green",
    57: "green",
    56: "green",
    55: "green",
    54: "green",
    53: "green",
    52: "green",
    51: "green",
    50: "green",
    49: "green",
    48: "green",
    47: "green",
    46: "green",
    45: "green",
    44: "green",
    43: "green",
    42: "green",
    41: "green",
    40: "green",
    39: "green",
    38: "green",
    37: "green",
    36: "green",
    35: "green",
    34: "green",
    33: "green",
    32: "green",
    31: "green",
    30: "green",
    29: "yellow",
    28: "yellow",
    27: "yellow",
    26: "yellow",
    25: "yellow",
    24: "yellow",
    23: "yellow",
    22: "yellow",
    21: "yellow",
    20: "yellow",
    19: "yellow",
    18: "yellow",
    17: "yellow",
    16: "yellow",
    15: "yellow",
    14: "yellow",
    13: "yellow",
    12: "yellow",
    11: "yellow",
    10: "yellow",
    9: "red",
    8: "red",
    7: "red",
    6: "red",
    5: "red",
    4: "red",
    3: "red",
    2: "red",
    1: "red",
    0: "red",
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

                <div className="back_engraves">
                  <ul>
                    {engraving.map((item) => (
                      <li key={item._key}>
                        <img src={item.Icon} />
                      </li>
                    ))}
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
                                  backgroundColor: `${
                                    equipQuality[item["qualityValue"]]
                                  }`,
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
                                  backgroundColor: `${
                                    equipQuality[item["qualityValue"]]
                                  }`,
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

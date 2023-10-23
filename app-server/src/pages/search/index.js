import axios from "axios";
import { useRef } from "react";
axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

const bestReview = async function () {
  const res = await axios.get("/review/best");
  return res.data;
};

const Search = function () {
  const query = useRef();
  function enterkey() {
    if (query.current.value) {
      var url_profiles =
        "https://developer-lostark.game.onstove.com/armories/characters/" +
        query.current.value +
        "/profiles";
      var url_equipment =
        "https://developer-lostark.game.onstove.com/armories/characters/" +
        query.current.value +
        "/equipment";
      var url_skills =
        "https://developer-lostark.game.onstove.com/armories/characters/" +
        query.current.value +
        "/combat-skills";
      var url_engravings =
        "https://developer-lostark.game.onstove.com/armories/characters/" +
        query.current.value +
        "/engravings";
    } else {
      return;
    }

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        authorization: "bearer " + process.env.REACT_APP_LOSTARK_API_KEY,
      },
    };

    let DB = new Object();
    DB["error"] = true;
    DB["get_engravings"] = false;
    DB["get_profiles"] = false;
    DB["get_equipment"] = false;
    DB["get_skills"] = false;
    DB["get_engravings"] = false;
    DB["error_code"] = "";
    DB["engraving_job"] = "";
    DB["engraving_one"] = "X";
    DB["engravings_initial"] = [];
    DB["level"] = "";
    DB["stats"] = [0, 0, 0]; //치 특 신
    DB["set"] = "";
    DB["set_eng"] = "";
    DB["nan_skills"] = [];
    DB["jeap_skills"] = [];
    DB["tripods"] = [-1, -1, -1, -1, -1, -1, -1];
    //반월(0:돌베,1:강베) 맹룡(0:추베,1:우베,2:정베) 풍진(0:대회전,1:내려치기) 굉열(0:파창,1:약포) 유성(0:강마,1:지폭) 적룡(0:단창,1:진창,2:파창) 청룡(0:치명적인창)
    DB["chaos"] = [0, 0, 0, 0, 0, 0];
    //0맹룡(냉기) 1풍진(대회전) 2질풍(강화된일격) 3유성(넓은공격) 4유성(화력) 5절룡세(화력)
    DB["pvp1"] = [0, 0, 0, 0, 0, 0];
    //0일섬각(기절) 1철량(퍼올리기) 2반월섬(회전올려치기) 3회선(강인함) 4공의연무(신속한대응) 5질풍참(신속강화)
    DB["pvp2"] = [0, 0, 0, 0, 0];
    //0청룡진(7렙) 1유성(넓은공격) 2절룡세(정신파괴) 3절룡세(절대방어) 4적룡포(치명적인조준)

    if (query.current.value) {
      DB["name"] = query.current.value;
    }

    fetch(url_profiles, options)
      .then((response) => response.json())
      .then((data) => {
        if (!data) {
          DB["error"] = false;
          DB["error_code"] = "없는닉네임";
        }
        //여기다가 429에러 추가
        else if (data && DB["error"]) {
          DB["name"] = data["CharacterName"];
          if (data["CharacterClassName"] != "창술사") {
            DB["error"] = false;
            DB["error_code"] = "창술사아님";
            //alert("창술사아님")
          }

          if (
            parseInt(data["Stats"][0]["Value"]) +
              parseInt(data["Stats"][1]["Value"]) +
              parseInt(data["Stats"][3]["Value"]) <
            2000
          ) {
            DB["eroor"] = false;
            DB["error_code"] = "특성낮음";
          } else {
            DB["get_profiles"] = true;
            DB["level"] = data["ItemMaxLevel"];
            DB["stats"][0] = data["Stats"][0]["Value"];
            DB["stats"][1] = data["Stats"][1]["Value"];
            DB["stats"][2] = data["Stats"][3]["Value"];
          }
        }
      });

    // fetch(url_engravings, options)
    //   .then((response1) => response1.json())
    //   .then((data) => {
    //     if (data && DB["error"]) {
    //       DB["get_engravings"] = true;
    //       for (i = 0; i < data["Effects"].length; i++) {
    //         initial = data["Effects"][i]["Name"].split(" ");
    //         if (
    //           initial[0] != "공격속도" &&
    //           initial[0] != "공격력" &&
    //           initial[0] != "이동속도" &&
    //           initial[0] != "방어력"
    //         ) {
    //           if (initial[initial.length - 1] == "3") {
    //             DB["engravings_initial"].push(initial[0]);
    //             if (initial[0] === "절정") {
    //               DB["engraving_job"] = "절정3";
    //             } else if (initial[0] === "절제") {
    //               DB["engraving_job"] = "절제3";
    //             }
    //           } else {
    //             if (DB["engraving_one"] && DB["engraving_one"] != "X") {
    //               DB["error"] = false;
    //               DB["error_code"] = "1각인두개";
    //               break;
    //             }
    //             if (initial[0] === "절정") {
    //               DB["engraving_job"] = "절정" + initial[initial.length - 1];
    //               DB["engraving_one"] = "절정" + initial[initial.length - 1];
    //             } else if (initial[0] === "절제") {
    //               DB["engraving_job"] = "절제" + initial[initial.length - 1];
    //               DB["engraving_one"] = "절제" + initial[initial.length - 1];
    //             } else {
    //               DB["engraving_one"] =
    //                 initial[0] + initial[initial.length - 1];
    //             }
    //           }
    //         }
    //       }
    //       if (!DB["engraving_job"]) {
    //         DB["error"] = false;
    //         DB["error_code"] = "직각없음";
    //       }
    //       if (DB["engravings_initial"].length < 5) {
    //         DB["error"] = false;
    //         DB["error_code"] = "3x5미만";
    //       }
    //     }
    //   });

    // fetch(url_equipment, options)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (data && DB["error"]) {
    //       DB["get_equipment"] = true;
    //       tmp = data[1]["Name"].split(" ");
    //       sets = [
    //         "악몽",
    //         "사멸",
    //         "환각",
    //         "구원",
    //         "지배",
    //         "악몽의",
    //         "사멸의",
    //         "환각의",
    //         "구원의",
    //         "지배의",
    //       ];
    //       ch = false;
    //       for (i = 0; i < sets.length; i++) {
    //         if (tmp.indexOf(sets[i]) > -1) {
    //           DB["set_eng"] = sets[i];
    //           ch = true;
    //           break;
    //         }
    //       }
    //       if (!ch) {
    //         DB["error"] = false;
    //         DB["error_code"] = "없는세트옵션";
    //         //alert("없는세트옵션")
    //       } else {
    //         for (i = 0; i < 6; i++) {
    //           if (
    //             data[i]["Name"].split(" ").indexOf(DB["set_eng"]) === -1 &&
    //             data[i]["Name"].split(" ").indexOf("참월") === -1
    //           ) {
    //             DB["error"] = false;
    //             DB["error_code"] = "6셋아님";
    //             //alert("6셋아님")
    //             break;
    //           }
    //         }
    //       }
    //     }
    //   });

    fetch(url_skills, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && DB["error"]) {
          //console.log(data)
          DB["get_skills"] = true;
          for (let i = 0; i < 20; i++) {
            if (i === 13 && data[i]["Level"] > 6) {
              DB["nan_skills"].push(data[i]["Name"]);
            } else if (data[i]["Level"] > 9) {
              if (i < 14) {
                DB["nan_skills"].push(data[i]["Name"]);
              } else {
                DB["jeap_skills"].push(data[i]["Name"]);
              }
            }
          }
          if (DB["nan_skills"].length + DB["jeap_skills"].length < 6) {
            DB["error"] = false;
            DB["error_code"] = "적은스킬";
          }
          if (
            DB["engraving_job"].indexOf("절정") != -1 &&
            DB["jeap_skills"].length < 2
          ) {
            DB["error"] = false;
            DB["error_code"] = "절정적은스킬";
          }

          //0반월(0:돌베,1:강베) 1맹룡(0:추베,1:우베,2:정베) 2풍진(0:대회전,1:내려치기) 3굉열(0:파창,1:약포) 4유성(0:강마,1:지폭) 5적룡(0:단창,1:진창,2:파창) 6청룡(0:치명적인창)
          if (data[6]["Level"] > 9) {
            if (data[6]["Tripods"][6]["IsSelected"]) {
              DB["tripods"][0] = 0;
            } else if (data[6]["Tripods"][7]["IsSelected"]) {
              DB["tripods"][0] = 1;
            }
          }

          if (data[7]["Level"] > 9) {
            if (data[7]["Tripods"][3]["IsSelected"]) {
              DB["tripods"][1] = 0;
            } else if (data[7]["Tripods"][4]["IsSelected"]) {
              DB["tripods"][1] = 1;
            } else if (data[7]["Tripods"][5]["IsSelected"]) {
              DB["tripods"][1] = 2;
            }
          }

          if (data[11]["Level"] > 9) {
            if (data[11]["Tripods"][6]["IsSelected"]) {
              DB["tripods"][2] = 0;
            } else if (data[11]["Tripods"][7]["IsSelected"]) {
              DB["tripods"][2] = 1;
            }
          }

          if (data[16]["Level"] > 9) {
            if (data[16]["Tripods"][3]["IsSelected"]) {
              DB["tripods"][3] = 0;
            } else if (data[16]["Tripods"][4]["IsSelected"]) {
              DB["tripods"][3] = 1;
            }
          }
          if (data[17]["Level"] > 9) {
            if (data[17]["Tripods"][6]["IsSelected"]) {
              DB["tripods"][4] = 0;
            } else if (data[17]["Tripods"][7]["IsSelected"]) {
              DB["tripods"][4] = 1;
            }
          }

          if (data[19]["Level"] > 9) {
            if (data[19]["Tripods"][3]["IsSelected"]) {
              DB["tripods"][5] = 0;
            } else if (data[19]["Tripods"][4]["IsSelected"]) {
              DB["tripods"][5] = 1;
            } else if (data[19]["Tripods"][5]["IsSelected"]) {
              DB["tripods"][5] = 2;
            }
          }

          if (data[13]["Level"] > 9) {
            DB["tripods"][6] = 0;
          }

          //0맹룡(냉기) 1풍진(대회전) 2질풍(강화된일격) 3유성(넓은공격) 4유성(화력) 5절룡세(화력)

          if (data[7]["Tripods"][1]["IsSelected"]) {
            //맹룡열파 냉기참
            DB["chaos"][0] = 2;
          }
          if (data[11]["Tripods"][6]["IsSelected"]) {
            //풍진격 대회전
            DB["chaos"][1] = 1;
          }
          if (data[12]["Tripods"][6]["IsSelected"]) {
            //질풍참 강화된일격
            DB["chaos"][2] = 2;
          }
          if (data[17]["Tripods"][1]["IsSelected"]) {
            //유성강천 넓은공격
            DB["chaos"][3] = 1;
          }
          if (data[17]["Tripods"][4]["IsSelected"]) {
            //유성강천 화력조절
            DB["chaos"][4] = 1;
          }
          if (data[18]["Tripods"][2]["IsSelected"]) {
            //절룡세 화력조절
            DB["chaos"][5] = 1;
          }
          if (
            DB["chaos"][0] +
              DB["chaos"][1] +
              DB["chaos"][2] +
              DB["chaos"][3] +
              DB["chaos"][4] +
              DB["chaos"][5] >
            1
          ) {
            DB["error"] = false;
            DB["error_code"] = "카던스킬";
          }

          //0일섬각(기절) 1철량(퍼올리기) 2반월섬(회전올려치기) 3회선(강인함) 4공의연무(신속한대응) 5질풍참(신속강화)
          //0청룡진(7렙) 1유성(넓은공격) 2절룡세(정신파괴) 3절룡세(절대방어)

          if (data[4]["Tripods"][3]["IsSelected"]) {
            //일섬각 기절효과
            DB["pvp1"][0] = 1;
          }
          if (data[5]["Tripods"][6]["IsSelected"]) {
            //철량추 퍼올리기
            DB["pvp1"][1] = 1;
          }
          if (data[6]["Tripods"][2]["IsSelected"]) {
            //반월섬 회전올려치기
            DB["pvp1"][2] = 2;
          }
          if (data[8]["Tripods"][5]["IsSelected"]) {
            //회선창 강인함
            DB["pvp1"][3] = 1;
          }
          if (data[9]["Tripods"][6]["IsSelected"]) {
            //공의연무 신속한대응
            DB["pvp1"][4] = 1;
          }
          if (data[12]["Tripods"][5]["IsSelected"]) {
            //질풍참 신속강화
            DB["pvp1"][5] = 1;
          }
          if (!data[13]["Tripods"][6]["IsSelected"]) {
            //청룡진 치명적인창 안찍음
            DB["pvp2"][0] = 2;
          }
          if (data[17]["Tripods"][1]["IsSelected"]) {
            //유성강천 넓은공격
            DB["pvp2"][1] = 1;
          }
          if (data[18]["Tripods"][3]["IsSelected"]) {
            //절룡세 정신파괴
            DB["pvp2"][2] = 1;
          }
          if (data[18]["Tripods"][5]["IsSelected"]) {
            //절룡세 절대방어
            DB["pvp2"][3] = 1;
          }
          if (data[19]["Tripods"][7]["IsSelected"]) {
            //적룡포 치명적인조준
            DB["pvp2"][4] = 2;
          }
          if (
            DB["pvp1"][0] +
              DB["pvp1"][1] +
              DB["pvp1"][2] +
              DB["pvp1"][3] +
              DB["pvp1"][4] +
              DB["pvp1"][5] +
              DB["pvp2"][0] +
              DB["pvp2"][1] +
              DB["pvp2"][2] +
              DB["pvp2"][3] +
              DB["pvp2"][4] >
            2
          ) {
            DB["error"] = false;
            DB["error_code"] = "pvp스킬";
          }
        }
      });
    // setTimeout(() => prints(DB), 1999);
    console.log(DB);
    query.current.value = "";
  }
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      enterkey(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  // function prints(DB) {
  //   console.log(DB);
  //   if (
  //     DB["error"] &&
  //     DB["get_engravings"] &&
  //     DB["get_profiles"] &&
  //     DB["get_equipment"] &&
  //     DB["get_skills"] &&
  //     DB["get_engravings"]
  //   ) {
  //     var Character_tr = document.createElement("tr");
  //     var CharacterName_td = document.createElement("td");
  //     var ItemMaxLevel_td = document.createElement("td");
  //     var Stats_td = document.createElement("td");
  //     var Job_td = document.createElement("td");
  //     var set_td = document.createElement("td");
  //     var set_eng_td = document.createElement("td");
  //     var One_td = document.createElement("td");
  //     var Skill_td = document.createElement("td");
  //     var Maeng_td = document.createElement("td");
  //     var Ban_td = document.createElement("td");
  //     var Jeok_td = document.createElement("td");
  //     var Yu_td = document.createElement("td");
  //     var Goeng_td = document.createElement("td");
  //     var Pung_td = document.createElement("td");
  //     var Chung_td = document.createElement("td");

  //     CharacterName_td.innerText = DB["name"];
  //     ItemMaxLevel_td.innerText = DB["level"];

  //     if (DB["engraving_job"].indexOf("절정") > -1) {
  //       // 치 특 신
  //       if (DB["stats"][0] < 110 && DB["stats"][1] / DB["stats"][2] > 2.7) {
  //         Stats_td.innerText = "극특신";
  //       } else if (
  //         DB["stats"][0] < 110 &&
  //         DB["stats"][1] / DB["stats"][2] <= 2.7
  //       ) {
  //         Stats_td.innerText = "특신";
  //       } else if (
  //         DB["stats"][2] < 110 &&
  //         DB["stats"][1] / DB["stats"][0] > 2.7
  //       ) {
  //         Stats_td.innerText = "극특치";
  //       } else if (
  //         DB["stats"][2] < 110 &&
  //         DB["stats"][1] / DB["stats"][0] <= 2.7
  //       ) {
  //         Stats_td.innerText = "특치";
  //       } else {
  //         Stats_td.innerText = "특치신";
  //       }
  //       Job_td.innerText = DB["engraving_job"];
  //       Skill_td.innerText =
  //         String(DB["nan_skills"].length) +
  //         "난 " +
  //         String(DB["jeap_skills"].length) +
  //         "집";
  //     } else if (DB["engraving_job"].indexOf("절제") > -1) {
  //       if (DB["stats"][2] > 1630 && DB["stats"][0] < 690) {
  //         Stats_td.innerText = "극신치";
  //       } else if (DB["stats"][1] < 900) {
  //         Stats_td.innerText = "신치";
  //       } else {
  //         Stats_td.innerText = "치신";
  //       }
  //       Job_td.innerText = DB["engraving_job"];
  //       Skill_td.innerText = String(DB["nan_skills"].length) + "난 ";
  //     }

  //     if (DB["set_eng"].indexOf("악몽") > -1) {
  //       set_td.innerText = "악몽";
  //       if (
  //         DB["engraving_job"].indexOf("절제") > -1 &&
  //         DB["engravings_initial"].indexOf("아드레날린") > -1
  //       ) {
  //         set_eng_td.innerText = "아드악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("기습의") > -1 ||
  //         DB["engraving_one"] === "기습의2"
  //       ) {
  //         set_eng_td.innerText = "기습악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("속전속결") > -1 ||
  //         DB["engraving_one"] === "속전속결2"
  //       ) {
  //         set_eng_td.innerText = "속속악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("질량") > -1 ||
  //         DB["engraving_one"] === "질량2"
  //       ) {
  //         set_eng_td.innerText = "질증악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("돌격대장") > -1 ||
  //         DB["engraving_one"] === "돌격대장2"
  //       ) {
  //         set_eng_td.innerText = "돌대악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("슈퍼") > -1 ||
  //         DB["engraving_one"] === "슈퍼2"
  //       ) {
  //         set_eng_td.innerText = "슈차악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("안정된") > -1 ||
  //         DB["engraving_one"] === "안정된2"
  //       ) {
  //         set_eng_td.innerText = "안상악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("각성") > -1 ||
  //         DB["engraving_one"] === "각성2"
  //       ) {
  //         set_eng_td.innerText = "각성악몽";
  //       } else if (
  //         DB["engravings_initial"].indexOf("아드레날린") > -1 ||
  //         DB["engraving_one"] === "아드레날린2"
  //       ) {
  //         set_eng_td.innerText = "아드악몽";
  //       } else {
  //         set_eng_td.innerText = "악몽";
  //       }
  //     } else if (DB["set_eng"].indexOf("사멸") > -1) {
  //       set_td.innerText = "사멸";
  //       if (
  //         DB["engraving_job"].indexOf("절제") > -1 &&
  //         DB["engravings_initial"].indexOf("아드레날린") > -1
  //       ) {
  //         set_eng_td.innerText = "아드사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("속전속결") > -1 ||
  //         DB["engraving_one"] === "속전속결2"
  //       ) {
  //         set_eng_td.innerText = "속속사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("질량") > -1 ||
  //         DB["engraving_one"] === "질량2"
  //       ) {
  //         set_eng_td.innerText = "질증사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("예리한") > -1 ||
  //         DB["engraving_one"] === "예리한2"
  //       ) {
  //         set_eng_td.innerText = "예둔사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("돌격대장") > -1 ||
  //         DB["engraving_one"] === "돌격대장2"
  //       ) {
  //         set_eng_td.innerText = "돌대사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("아드레날린") > -1 ||
  //         DB["engraving_one"] === "아드레날린2"
  //       ) {
  //         set_eng_td.innerText = "아드사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("정밀") > -1 ||
  //         DB["engraving_one"] === "정밀2"
  //       ) {
  //         set_eng_td.innerText = "정단사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("슈퍼") > -1 ||
  //         DB["engraving_one"] === "슈퍼2"
  //       ) {
  //         set_eng_td.innerText = "슈차사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("안정된") > -1 ||
  //         DB["engraving_one"] === "안정된2"
  //       ) {
  //         set_eng_td.innerText = "안상사멸";
  //       } else if (
  //         DB["engravings_initial"].indexOf("각성") > -1 ||
  //         DB["engraving_one"] === "각성2"
  //       ) {
  //         set_eng_td.innerText = "각성사멸";
  //       } else {
  //         set_eng_td.innerText = "사멸";
  //       }
  //     } else if (DB["set_eng"].indexOf("환각") > -1) {
  //       set_td.innerText = "환각";
  //       if (
  //         DB["engraving_job"].indexOf("절제") > -1 &&
  //         DB["engravings_initial"].indexOf("아드레날린") > -1
  //       ) {
  //         set_eng_td.innerText = "아드환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("기습의") > -1 ||
  //         DB["engraving_one"] === "기습의2"
  //       ) {
  //         set_eng_td.innerText = "기습환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("속전속결") > -1 ||
  //         DB["engraving_one"] === "속전속결2"
  //       ) {
  //         set_eng_td.innerText = "속속환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("질량") > -1 ||
  //         DB["engraving_one"] === "질량2"
  //       ) {
  //         set_eng_td.innerText = "질증환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("예리한") > -1 ||
  //         DB["engraving_one"] === "예리한2"
  //       ) {
  //         set_eng_td.innerText = "예둔환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("돌격대장") > -1 ||
  //         DB["engraving_one"] === "돌격대장2"
  //       ) {
  //         set_eng_td.innerText = "돌대환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("아드레날린") > -1 ||
  //         DB["engraving_one"] === "아드레날린2"
  //       ) {
  //         set_eng_td.innerText = "아드환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("슈퍼") > -1 ||
  //         DB["engraving_one"] === "슈퍼2"
  //       ) {
  //         set_eng_td.innerText = "슈차환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("안정된") > -1 ||
  //         DB["engraving_one"] === "안정된2"
  //       ) {
  //         set_eng_td.innerText = "안상환각";
  //       } else if (
  //         DB["engravings_initial"].indexOf("각성") > -1 ||
  //         DB["engraving_one"] === "각성2"
  //       ) {
  //         set_eng_td.innerText = "각성환각";
  //       } else {
  //         set_eng_td.innerText = "환각";
  //       }
  //     } else if (DB["set_eng"].indexOf("지배") > -1) {
  //       set_td.innerText = "지배";
  //       if (
  //         DB["engraving_job"].indexOf("절제") > -1 &&
  //         DB["engravings_initial"].indexOf("아드레날린") > -1
  //       ) {
  //         set_eng_td.innerText = "아드지배";
  //       } else if (DB["engravings_initial"].indexOf("각성") > -1) {
  //         set_eng_td.innerText = "각성지배";
  //       } else if (DB["engraving_one"] === "각성2") {
  //         set_eng_td.innerText = "각2지배";
  //       } else if (DB["engraving_one"] === "각성1") {
  //         set_eng_td.innerText = "각1지배";
  //       } else {
  //         set_eng_td.innerText = "노각지배";
  //       }
  //     } else if (DB["set_eng"].indexOf("구원") > -1) {
  //       set_td.innerText = "구원";
  //       if (
  //         DB["engraving_job"].indexOf("절제") > -1 &&
  //         DB["engravings_initial"].indexOf("아드레날린") > -1
  //       ) {
  //         set_eng_td.innerText = "아드구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("기습의") > -1 ||
  //         DB["engraving_one"] === "기습의2"
  //       ) {
  //         set_eng_td.innerText = "기습구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("속전속결") > -1 ||
  //         DB["engraving_one"] === "속전속결2"
  //       ) {
  //         set_eng_td.innerText = "속속구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("질량") > -1 ||
  //         DB["engraving_one"] === "질량2"
  //       ) {
  //         set_eng_td.innerText = "질증구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("돌격대장") > -1 ||
  //         DB["engraving_one"] === "돌격대장2"
  //       ) {
  //         set_eng_td.innerText = "돌대구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("아드레날린") > -1 ||
  //         DB["engraving_one"] === "아드레날린2"
  //       ) {
  //         set_eng_td.innerText = "아드구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("정밀") > -1 ||
  //         DB["engraving_one"] === "정밀2"
  //       ) {
  //         set_eng_td.innerText = "정단구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("슈퍼") > -1 ||
  //         DB["engraving_one"] === "슈퍼2"
  //       ) {
  //         set_eng_td.innerText = "슈차구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("안정된") > -1 ||
  //         DB["engraving_one"] === "안정된2"
  //       ) {
  //         set_eng_td.innerText = "안상구원";
  //       } else if (
  //         DB["engravings_initial"].indexOf("각성") > -1 ||
  //         DB["engraving_one"] === "각성2"
  //       ) {
  //         set_eng_td.innerText = "각성구원";
  //       } else {
  //         set_eng_td.innerText = "구원";
  //       }
  //     }

  //     One_td.innerText = DB["engraving_one"];

  //     switch (DB["tripods"][0]) {
  //       case 0:
  //         Ban_td.innerText = "돌베";
  //         break;
  //       case 1:
  //         Ban_td.innerText = "강베";
  //         break;
  //       default:
  //         Ban_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][1]) {
  //       case 0:
  //         Maeng_td.innerText = "추베";
  //         break;
  //       case 1:
  //         Maeng_td.innerText = "우베";
  //         break;
  //       case 2:
  //         Maeng_td.innerText = "정베";
  //         break;
  //       default:
  //         Maeng_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][2]) {
  //       case 0:
  //         Pung_td.innerText = "대회전";
  //         break;
  //       case 1:
  //         Pung_td.innerText = "내려치기";
  //         break;
  //       default:
  //         Pung_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][3]) {
  //       case 0:
  //         Goeng_td.innerText = "파창";
  //         break;
  //       case 1:
  //         Goeng_td.innerText = "약포";
  //         break;
  //       default:
  //         Goeng_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][4]) {
  //       case 0:
  //         Yu_td.innerText = "강마";
  //         break;
  //       case 1:
  //         Yu_td.innerText = "지폭";
  //         break;
  //       default:
  //         Yu_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][5]) {
  //       case 0:
  //         Jeok_td.innerText = "단창";
  //         break;
  //       case 1:
  //         Jeok_td.innerText = "진창";
  //         break;
  //       case 2:
  //         Jeok_td.innerText = "파창";
  //         break;
  //       default:
  //         Jeok_td.innerText = "X";
  //         break;
  //     }

  //     switch (DB["tripods"][6]) {
  //       case 0:
  //         Chung_td.innerText = "O";
  //         break;
  //       default:
  //         Chung_td.innerText = "X";
  //         break;
  //     }

  //     //0반월(0:돌베,1:강베) 1맹룡(0:추베,1:우베,2:정베) 2풍진(0:대회전,1:내려치기) 3굉열(0:파창,1:약포) 4유성(0:강마,1:지폭) 5적룡(0:단창,1:진창,2:파창)

  //     Character_tr.appendChild(CharacterName_td);
  //     Character_tr.appendChild(ItemMaxLevel_td);
  //     Character_tr.appendChild(Stats_td);
  //     Character_tr.appendChild(Job_td);
  //     Character_tr.appendChild(set_td);
  //     Character_tr.appendChild(set_eng_td);
  //     Character_tr.appendChild(One_td);
  //     Character_tr.appendChild(Skill_td);
  //     Character_tr.appendChild(Maeng_td);
  //     Character_tr.appendChild(Ban_td);
  //     Character_tr.appendChild(Jeok_td);
  //     Character_tr.appendChild(Yu_td);
  //     Character_tr.appendChild(Goeng_td);
  //     Character_tr.appendChild(Pung_td);
  //     Character_tr.appendChild(Chung_td);

  //     CharactersTable.appendChild(Character_tr);
  //   } else {
  //     //console.log(DB['name'] + ": " + DB['error_code'])
  //     if (!DB["error_code"]) {
  //       console.log(DB["name"] + ": " + DB["error_code"]);
  //       console.log(DB);
  //     }
  //     //console.log(DB)
  //     error_DB.push([DB["name"], DB["error_code"]]);
  //   }
  // }

  return (
    <div className="container">
      <div className="row">
        <h4 className="col-lg-3">축제 찾기: </h4>
        <div className="col-lg-5">
          {/* TODO: 여기서 onkeyup fillter() 정의해서 데이터 유효성 챙기기*/}
          <input
            className="form-control"
            type="text"
            placeholder="검색"
            ref={query}
            onKeyPress={handleOnKeyPress}
          />
        </div>

        <div className="col-lg-2">
          <button className="border-button">
            <i className="fa fa-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Search;

const pool = require("../models/pool");
const CharacterModel = require("../models/character.model");

// {
//   Name: "", //이름
//   Icon: "", //아이콘
//   Grade: "", //등급(고대)
//   ItemGrade: "", //아이템강화단계
//   ItemLevel: "", //아이템레벨
//   qualityValue: "", //품질
//   MainPower: {}, //기본효과
//   PlusPower: {}, //추가효과
//   TransGrade: "", //초월단계
//   TransLevel: "", //초월레벨
//   IsCommon01: "", //공용엘릭서
//   Option01: "", //엘릭서옵션
//   Level01: "", //엘릭서레벨
//   IsCommon02: "", //공용엘릭서
//   Option02: "", //엘릭서옵션
//   Level02: "", //엘릭서레벨
//   IsCommon03: "", //공용엘릭서
//   Option03: "", //엘릭서옵션
//   Level03: "", //엘릭서레벨
//   SetOption: "", //세트옵션
//   SetOptionLevel: "", //옵션레벨
// },

const NumberRegex = /[^0-9]/g;
const CharacterCardService = {
  async getCardData(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const res = await CharacterModel.getCharacter(characterName);

      const data = {
        ArmoryProfile: {
          CharacterImage: "",
          ExpeditionLevel: "",
          PvpGradeName: "",
          TownLevel: "",
          TownName: "",
          Title: "",
          GuildMemberGrade: "",
          GuildName: "",
          UsingSkillPoint: "",
          TotalSkillPoint: "",
          Stats: {
            치명: "",
            특화: "",
            제압: "",
            신속: "",
            인내: "",
            숙련: "",
            "최대 생명력": "",
            공격력: "",
          },
          Tendencies: { 지성: "", 담력: "", 매력: "", 친절: "" },
          ServerName: "",
          CharacterName: "",
          CharacterLevel: "",
          CharacterClassName: "",
          ItemAvgLevel: "",
          ItemMaxLevel: "",
        },
        ArmoryEquipment: {
          무기: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
          },
          투구: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir01: { name: "", level: "" },
            Elixir02: { name: "", level: "" },
          },
          상의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir01: { name: "", level: "" },
            Elixir02: { name: "", level: "" },
          },
          하의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir01: { name: "", level: "" },
            Elixir02: { name: "", level: "" },
          },
          장갑: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir01: { name: "", level: "" },
            Elixir02: { name: "", level: "" },
          },
          어깨: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            qualityValue: "", //품질
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            Elixir01: { name: "", level: "" },
            Elixir02: { name: "", level: "" },
          },
          목걸이: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            qualityValue: "", //품질
            Stats: {},
            engravings01: { name: "", level: "" },
            engravings02: { name: "", level: "" },
            engravings03: { name: "", level: "" },
          },
          귀걸이: [
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
              engravings03: { name: "", level: "" },
            },
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
              engravings03: { name: "", level: "" },
            },
          ],
          반지: [
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
              engravings03: { name: "", level: "" },
            },
            {
              Name: "", //이름
              Icon: "", //아이콘
              Grade: "", //등급(고대)
              qualityValue: "", //품질
              Stats: {},
              engravings01: { name: "", level: "" },
              engravings02: { name: "", level: "" },
              engravings03: { name: "", level: "" },
            },
          ],
          "어빌리티 스톤": {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            engravings01: { name: "", level: "" },
            engravings02: { name: "", level: "" },
            engravings03: { name: "", level: "" },
          },
          팔찌: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            Stats: {},
            OptionName1: { name: "", effect: "" },
            OptionName2: { name: "", effect: "" },
            OptionName3: { name: "", effect: "" },
            OptionName4: { name: "", effect: "" },
          },
          나침반: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
          부적: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
          문장: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
          },
        },
      };

      Object.keys(data).forEach((sub) => {
        if (sub == "ArmoryProfile") {
          Object.keys(data[sub]).forEach((key) => {
            if (typeof data[sub][key] == "object") {
              res[sub][key].forEach((element) => {
                data[sub][key][element["Type"]] = element["Value"]
                  ? element["Value"]
                  : element["Point"];
              });
            } else {
              data[sub][key] = res[sub][key];
            }
          });
        } else if (sub == "ArmoryEquipment") {
          Object.keys(res[sub]).forEach((element, i) => {
            const Type = res[sub][element]["Type"];

            data[sub][Type]["Name"] = res[sub][element]["Name"];
            data[sub][Type]["Icon"] = res[sub][element]["Icon"];
            data[sub][Type]["Grade"] = res[sub][element]["Grade"];
            const dat = JSON.parse(res[sub][i]["Tooltip"]);

            if (
              ["무기", "투구", "상의", "하의", "장갑", "어깨"].includes(Type)
            ) {
              data[sub][Type]["ItemGrade"] = parseInt(
                res[sub][element]["Name"].replace(NumberRegex, "")
              );
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
            } else if (Type == "목걸이") {
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
            } else if (["귀걸이", "반지"].includes(Type)) {
              data[sub][Type]["qualityValue"] =
                dat["Element_001"]["value"]["qualityValue"];
            }
            if (Type == "투구") {
              // console.log(res[sub][i]["Tooltip"]);
            }

            if (["투구", "상의", "하의", "장갑", "어깨"].includes(Type)) {
              console.log(dat["Element_008"]["value"]["Element_000"]["topStr"]);
              data[sub][Type]["TransGrade"] =
                dat["Element_008"]["value"]["Element_000"]["topStr"];
            }
          });
        }
      });

      // DB에 작업 반영
      await conn.commit();
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
};
module.exports = CharacterCardService;

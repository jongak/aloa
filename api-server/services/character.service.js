const pool = require("../models/pool");
const CharacterModel = require("../models/character.model");

const CharacterService = {
  async getCharacter(characterName) {
    const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      await conn.beginTransaction();
      const data = await CharacterModel.getCharacter(characterName);
      // DB에 작업 반영
      await conn.commit();
      return { ...data, ok: true };
      // return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      pool.releaseConnection(conn);
    }
  },
  async capture(characterName) {
    // const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      // await conn.beginTransaction();
      const data = await CharacterModel.getCharacter(characterName);
      // DB에 작업 반영
      // await conn.commit();
      // return { ...data, ok: true };
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      // await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      // pool.releaseConnection(conn);
    }
  },
  async getCharacters(characterName) {
    // const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      // await conn.beginTransaction();
      const res = await CharacterModel.getCharacters(characterName);
      const data = {
        server: "",
        Lupeon: [],
        Kadan: [],
        Karmian: [],
        Silian: [],
        Aman: [],
        Kazeros: [],
        Avrelsud: [],
        Ninave: [],
      };

      const ServerName = {
        루페온: "Lupeon",
        카단: "Kadan",
        카마인: "Karmian",
        실리안: "Silian",
        아만: "Aman",
        카제로스: "Kazeros",
        아브렐슈드: "Avrelsud",
        니나브: "Ninave",
      };
      res.forEach((element) => {
        if (element["CharacterName"] == characterName) {
          data["server"] = ServerName[element["ServerName"]];
        }
        data[ServerName[element["ServerName"]]].push(element);
      });

      Object.keys(data).forEach((server) => {
        if (server == "server") return;

        data[server].sort((a, b) => {
          if (a["ItemMaxLevel"] < b["ItemMaxLevel"]) return 1;
          if (a["ItemMaxLevel"] > b["ItemMaxLevel"]) return -1;
          if (a["CharacterName"] > b["CharacterName"]) return 1;
          return -1;
        });
      });

      var my;
      data[data["server"]].forEach((element, i) => {
        if (element["CharacterName"] == characterName) {
          my = element;
          data[data["server"]].splice(i, 1);
        }
      });

      data[data["server"]].unshift(my);
      // DB에 작업 반영
      // await conn.commit();
      // return { ...data, ok: true };
      return { ok: true, data: data };
    } catch (err) {
      // DB 작업 취소
      // await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      // pool.releaseConnection(conn);
    }
  },
  async getCardData(characterName) {
    // const conn = await pool.getConnection();
    try {
      // 트랜젝션 작업 시작
      // await conn.beginTransaction();
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
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          투구: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          상의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          하의: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          장갑: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          어깨: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          목걸이: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
            ItemGrade: "", //아이템강화단계
            ItemLevel: "", //아이템레벨
            qualityValue: "", //품질
            MainPower: {}, //기본효과
            PlusPower: {}, //추가효과
            TransGrade: "", //초월단계
            TransLevel: "", //초월레벨
            IsCommon01: "", //공용엘릭서
            Option01: "", //엘릭서옵션
            Level01: "", //엘릭서레벨
            IsCommon02: "", //공용엘릭서
            Option02: "", //엘릭서옵션
            Level02: "", //엘릭서레벨
            IsCommon03: "", //공용엘릭서
            Option03: "", //엘릭서옵션
            Level03: "", //엘릭서레벨
            SetOption: "", //세트옵션
            SetOptionLevel: "", //옵션레벨
          },
          팔찌: {
            Name: "", //이름
            Icon: "", //아이콘
            Grade: "", //등급(고대)
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
            OptionName1: "",
            OptionName2: "",
            OptionName3: "",
            OptionName4: "",
          },
        },
      };

      // Object.keys(data).forEach((sub) => {
      //   Object.keys(data[sub]).forEach((key) => {
      //     if (typeof data[sub][key] == "object") {
      //       res[sub][key].forEach((element) => {
      //         data[sub][key][element["Type"]] = element["Value"]
      //           ? element["Value"]
      //           : element["Point"];
      //       });
      //     } else {
      //       data[sub][key] = res[sub][key];
      //     }
      //   });
      // });

      // const dat = JSON.parse(res["ArmoryEquipment"][0]);
      console.log(res["ArmoryEquipment"][12]["Tooltip"]);

      // DB에 작업 반영
      // await conn.commit();
      return { ok: true, data: res };
    } catch (err) {
      // DB 작업 취소
      // await conn.rollback();
      throw new Error("Service Error", { cause: err });
    } finally {
      // 커넥션 반납
      // pool.releaseConnection(conn);
    }
  },
};

module.exports = CharacterService;

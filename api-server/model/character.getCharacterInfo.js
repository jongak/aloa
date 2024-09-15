const Copyable = require("./copyable");

class CharacterGetCharacterInfoModel extends Copyable {
  constructor(data) {
    super();
    this.ArmoryProfile = new ArmoryProfile(data.ArmoryProfile);
    this.ArmoryEquipment = new ArmoryEquipment(data.parseArmoryEquipment);
    this.ArmoryEngraving = new ArmoryEngraving(data.parseArmoryEngraving);
    this.ArmoryGem = new ArmoryGem(data.parseArmoryGem);
    this.ArmoryCard = new ArmoryCard(data.parseArmoryCard);
    this.ArkPassive = new ArkPassive(data.parseArkPassive);
  }
}

class ArmoryProfile extends Copyable {
  constructor(data) {
    super();
    this.CharacterImage = data.CharacterImage || "";
    this.ExpeditionLevel = data.ExpeditionLevel || "";
    this.PvpGradeName = data.PvpGradeName || "";
    this.TownLevel = data.TownLevel || "";
    this.TownName = data.TownName || "";
    this.Title = data.Title || "";
    this.GuildMemberGrade = data.GuildMemberGrade || "";
    this.GuildName = data.GuildName || "";
    this.UsingSkillPoint = data.UsingSkillPoint || "";
    this.TotalSkillPoint = data.TotalSkillPoint || "";
    this.Stats = this._parseStats(data.Stats || []);
    this.Tendencies = this._parseTendencies(data.Tendencies || []);
    this.ServerName = data.ServerName || "";
    this.CharacterName = data.CharacterName || "";
    this.CharacterLevel = data.CharacterLevel || "";
    this.CharacterClassName = data.CharacterClassName || "";
    this.ItemAvgLevel = data.ItemAvgLevel || "";
    this.ItemMaxLevel = data.ItemMaxLevel || "";
  }

  _parseStats(arr) {
    const ret = {
      치명: "",
      특화: "",
      제압: "",
      신속: "",
      인내: "",
      숙련: "",
      "최대 생명력": "",
      공격력: "",
    };

    arr.forEach((element) => {
      if (Object.prototype.hasOwnProperty.call(ret, element.Type)) {
        ret[element.Type] = element.Value || "";
      }
    });

    return ret;
  }
  _parseTendencies(arr) {
    const ret = {
      지성: "",
      담력: "",
      매력: "",
      친절: "",
    };

    arr.forEach((element) => {
      if (Object.prototype.hasOwnProperty.call(ret, element.Type)) {
        ret[element.Type] = element.Point || "";
      }
    });

    return ret;
  }
}

class ArmoryEquipment extends Copyable {
  constructor(data) {
    super();
    this.전체_초월_등급 = data.전체_초월_등급;
    this.전체_초월_레벨 = data.전체_초월_레벨;
    this.엘릭서_효과 = data.엘릭서_효과;
    this.엘릭서_레벨 = data.엘릭서_레벨;
    this.방어구_품질 = data.방어구_품질;
    this.악세_품질 = data.악세_품질;
    this.악세 = data.악세;
    this.장비 = data.장비;
  }
}

class ArmoryEngraving extends Copyable {
  constructor(data) {
    super();
    this.ArkPassiveEffects = this._parseArkPassiveEffects(data);
  }

  _parseArkPassiveEffects(arr) {
    const ret = [];
    arr.forEach((element) => {
      const { Description, ...filtered } = element;
      ret.push(filtered);
    });

    return ret;
  }
}

class ArmoryGem extends Copyable {
  constructor(data) {
    super();
    this.option = data.option;
    // option: {
    //       TenGup: 0,
    //       TenJak: 0,
    //       GupLevel: 0,
    //       MeulNum: 0,
    //       HongLevel: 0,
    //       HongNum: 0,
    //       level: 0,
    //       num: 0,
    //     }
    this.Gems = data.Gems;
    // Gems: [{ name: 0, isGup: 0, isMeul: 0, isJak: 0, isHong: 0, level: 0 }];
  }
}

class ArmoryCard extends Copyable {
  constructor(data) {
    super();
    this.Cards = data.Cards;
    this.AwakeCount = data.AwakeCount;
    this.AwakeName = data.AwakeName;
  }
}

class ArkPassive extends Copyable {
  constructor(data) {
    super();
    this.진화 = data.진화;
    this.깨달음 = data.깨달음;
    this.도약 = data.도약;
  }
}

module.exports = CharacterGetCharacterInfoModel;

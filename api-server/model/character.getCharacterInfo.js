const Copyable = require("./copyable");

class CharacterGetCharacterInfoModel extends Copyable {
  constructor(data) {
    super();
    this.ArmoryProfile = new ArmoryProfile(data.ArmoryProfile);
    this.ArmoryEquipment = new ArmoryEquipment(data.ArmoryEquipment);
    this.ArmoryEngraving = new ArmoryEngraving(data.ArmoryEngraving);
    this.ArmoryCard = new ArmoryCard(data.parseArmoryCard);
    this.ArmoryGem = new ArmoryGem(data.ArmoryGem);
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
  }
}

class ArmoryEngraving extends Copyable {
  constructor(data) {
    super();
    this.ArkPassiveEffects = this._parseArkPassiveEffects(
      data.ArkPassiveEffects
    );
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

class ArmoryCard extends Copyable {
  constructor(data) {
    super();
    this.Cards = data.Cards;
    this.AwakeCount = data.AwakeCount;
    this.AwakeName = data.AwakeName;
  }
}

class ArmoryGem extends Copyable {
  constructor(data) {
    super();
    this.Cards = data.Cards;
    this.AwakeCount = data.AwakeCount;
    this.AwakeName = data.AwakeName;
  }
}

module.exports = CharacterGetCharacterInfoModel;

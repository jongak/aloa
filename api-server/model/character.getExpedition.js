const Copyable = require("./copyable");

class CharacterGetExpeditionModel extends Copyable {
  constructor(data) {
    super();
    this.server = data.server;
    this.루페온 = data.루페온;
    this.카단 = data.카단;
    this.카마인 = data.카마인;
    this.실리안 = data.실리안;
    this.아만 = data.아만;
    this.카제로스 = data.카제로스;
    this.아브렐슈드 = data.아브렐슈드;
    this.니나브 = data.니나브;
  }
}

module.exports = CharacterGetExpeditionModel;

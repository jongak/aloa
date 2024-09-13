class Copyable {
  constructor() {}

  copyWith(properties) {
    const prototype = Object.getPrototypeOf(this);
    const copied = Object.assign(Object.create(prototype), this);

    for (const property in properties) {
      if (Object.prototype.hasOwnProperty.call(copied, property)) {
        copied[property] = properties[property];
      }
    }

    return copied;
  }
}

module.exports = Copyable;

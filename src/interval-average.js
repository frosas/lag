/* eslint-env browser, node */

module.exports = class {
  constructor({interval}) {
    this._valuesSum = 0;
    this._valuesCount = 0;
    this._interval = interval;
  }

  add(value) {
    this._valuesSum += value;
    this._valuesCount++;
    setTimeout(() => {
      this._valuesSum -= value;
      this._valuesCount--;
    }, this._interval);
  }

  toString() {
    return this._valuesCount ?
      `${(this._valuesSum / this._valuesCount).toFixed(1)} ms` :
      'N/A';
  }
};

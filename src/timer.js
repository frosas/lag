module.exports = class {
  constructor() {
    this._start = this._now;
  }

  get elapsed() {
    return this._now - this._start;
  }

  get _now() {
    return Date.now(); // TODO Increase resolution
  }
};

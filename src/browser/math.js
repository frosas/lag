module.exports = {
  equal: (a, b, decimals) => {
    if (decimals == null) decimals = 0;
    a *= Math.pow(10, decimals); // eslint-disable-line no-restricted-properties
    b *= Math.pow(10, decimals); // eslint-disable-line no-restricted-properties
    return !(parseInt(a, 10) - parseInt(b, 10));
  },

  polarity: number => (number >= 0 ? 1 : -1),
};

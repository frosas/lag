module.exports = {
  /**
   * @param {number} amount
   * @return {string} An easy to read lag
   */
  humanize: amount => {
    let unit = 'ms';
    if (amount > 1000) {
      amount = (amount / 1000).toFixed(1);
      unit = 's';
    }
    return `${amount} ${unit}`;
  },
};

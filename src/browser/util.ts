export const humanizeLag = (amount: number): string => {
  let fractionDigits = 0;
  let unit = "ms";
  if (amount > 1000) {
    amount = amount / 1000;
    fractionDigits = 1;
    unit = "s";
  }
  return `${amount.toFixed(fractionDigits)} ${unit}`;
};

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

// TODO Is there a way to achieve the same without using any function?
export const assertType = <T>(value: any): T => {
  // TODO Is there a way to mention the type (T) we were expecting?
  if (value == null) throw new Error(`Expected a type but got ${value}`);
  return value;
};

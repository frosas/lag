// TODO Extract into their own files

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

// TODO If isType() is wrong, assertType() won't complain with invald values. Is
// there any way to avoid this?
export const assertType = <T>(
  value: any,
  isType: (isTypeValue: typeof value) => isTypeValue is T
): T => {
  if (isType(value)) return value as T;
  // TODO Is there a way to mention the type (T) we were expecting?
  throw new Error(`Couldn't assert type for value '${value}'`);
};

export const assertNotNullable = <T>(value: T | null | undefined): T => {
  if (value == null) throw new Error("Unexpected nullable value");
  return value;
};

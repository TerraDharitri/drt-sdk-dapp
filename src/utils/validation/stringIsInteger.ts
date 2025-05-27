import BigNumber from 'bignumber.js';

export const stringIsInteger = (
  integer: string,
  positiveNumbersOnly = true
): boolean => {
  const stringInteger = String(integer);

  if (!stringInteger.match(/^[-]?\d+$/)) {
    return false;
  }

  const bNparsed = new BigNumber(stringInteger);

  // Return false if the number is NaN
  if (bNparsed.isNaN()) {
    return false;
  }

  const limit = positiveNumbersOnly ? 0 : -1;
  const comparison = bNparsed.comparedTo(0);

  // If comparison is null (meaning NaN), return false
  if (comparison === null) {
    return false;
  }

  return bNparsed.toString(10) === stringInteger && comparison >= limit;
};

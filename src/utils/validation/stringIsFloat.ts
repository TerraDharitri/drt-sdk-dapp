import BigNumber from 'bignumber.js';
import { ZERO } from 'constants/index';

export const stringIsFloat = (amount: string): boolean => {
  if (amount == null) return false;

  const strAmount = String(amount); // <-- Coerce to string safely

  if (isNaN(Number(strAmount))) return false;
  if (strAmount.includes('Infinity')) return false;

  let [wholes, decimals] = strAmount.split('.');
  if (decimals) {
    while (decimals.length > 0 && decimals.charAt(decimals.length - 1) === ZERO) {
      decimals = decimals.slice(0, -1);
    }
  }

  const number = decimals ? `${wholes}.${decimals}` : wholes;
  const bNparsed = new BigNumber(number);

  if (bNparsed.isNaN()) return false;

  const comparison = bNparsed.comparedTo(0);
  if (comparison === null) return false;

  return bNparsed.toString(10) === number && comparison >= 0;
};

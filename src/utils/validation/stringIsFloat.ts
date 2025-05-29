import BigNumber from 'bignumber.js';
import { ZERO } from 'constants/index';

export const stringIsFloat = (amount: unknown): boolean => {
  if (typeof amount !== 'string' || amount.trim() === '') {
    return false;
  }

  if (!isFinite(Number(amount)) || amount.includes('Infinity') || amount.includes('NaN')) {
    return false;
  }

  let [wholes, decimals] = amount.split('.');
  if (decimals) {
    while (decimals.length > 0 && decimals.charAt(decimals.length - 1) === ZERO) {
      decimals = decimals.slice(0, -1);
    }
  }

  const number = decimals ? `${wholes}.${decimals}` : wholes;

  const bNparsed = new BigNumber(number);

  if (bNparsed.isNaN()) {
    return false;
  }

  const comparison = bNparsed.comparedTo(0);
  if (comparison === null) {
    return false;
  }

  return bNparsed.toString(10) === number && comparison >= 0;
};
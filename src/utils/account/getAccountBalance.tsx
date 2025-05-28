import { accountSelector } from "reduxStore/selectors";
import { store } from "reduxStore/store";
import { getAccount } from "./getAccount";

export async function getAccountBalance(address?: string) {
  let accountAddress = address;

  if (accountAddress == null) {
    const account = accountSelector(store.getState());
    accountAddress = account?.address;
  }

  // No address? Then user isn't logged in.
  if (!accountAddress) {
    console.warn('getAccountBalance: no address provided or user not logged in');
    return null; // or return 0, or throw — based on how you want to handle this case
  }

  try {
    const account = await getAccount(accountAddress);
    if (account == null) {
      console.warn('getAccountBalance: account not found for address', accountAddress);
      return null;
    }
    return account.balance;
  } catch (err) {
    console.error('getAccountBalance: error fetching account', err);
    return null;
  }
}

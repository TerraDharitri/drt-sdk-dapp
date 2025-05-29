import { createDeepEqualSelector } from 'reduxStore/selectors/helpers';
import {
  defaultTransactionErrorMessage,
  defaultTransactionProcessingMessage,
  defaultTransactionSuccessMessage
} from 'reduxStore/slices';
import { RootState } from 'reduxStore/store';
import { TransactionsDisplayInfoType } from 'types';

const defaultTransactionInfo: TransactionsDisplayInfoType = {
  errorMessage: defaultTransactionErrorMessage,
  successMessage: defaultTransactionSuccessMessage,
  processingMessage: defaultTransactionProcessingMessage
};

export const transactionsInfoSelectors = (state: RootState) =>
  state.transactionsInfo;


export const selectTransactionDisplayInfo = createDeepEqualSelector(
  transactionsInfoSelectors,
  (_: RootState, transactionSessionId: string | null) => transactionSessionId,
  (
    transactionsDisplayInfoMap: Record<string, TransactionsDisplayInfoType>,
    transactionSessionId: string | null
  ) =>
    transactionSessionId !== null
      ? transactionsDisplayInfoMap?.[transactionSessionId] || defaultTransactionInfo
      : defaultTransactionInfo
);

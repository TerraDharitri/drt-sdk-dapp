import { useSelector } from 'reduxStore/DappProviderContext';
import { transactionsInfoSelectors } from 'reduxStore/selectors';
import { RootState } from 'reduxStore/store';

export function useGetTransactionDisplayInfo(_toastId: string | null) {
  return useSelector((state: RootState) =>
    transactionsInfoSelectors(state)
  );
}

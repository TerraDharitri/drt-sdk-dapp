import React from 'react';
import {
  ServerTransactionType,
  SignedTransactionType,
  TransactionBatchStatusesEnum
} from 'types';
import { TransactionToast } from '../TransactionToast';
import { IconToast, SimpleToast, CustomComponentToast } from './components';
import { CustomToastPropsType } from './customToast.types';
import { useRemoveCustomToast } from './helpers';

export const CustomToast = (props: CustomToastPropsType) => {
  const { duration, onDelete } = props;
  useRemoveCustomToast({ duration, onDelete });

  if (props.component) {
    return <CustomComponentToast {...props} />;
  }
  if (props.transaction) {
    const serverTransaction = props.transaction as ServerTransactionType;
    const signedTransaction = props.transaction as unknown as SignedTransactionType;
  
    const transactionHash = serverTransaction.txHash || signedTransaction.hash;
  
    const statusKey = props.transaction.status;
  
    // Check if statusKey is a valid key of the enum before indexing
    const statusEnumValue = statusKey in TransactionBatchStatusesEnum
      ? TransactionBatchStatusesEnum[statusKey as keyof typeof TransactionBatchStatusesEnum]
      : undefined; // or provide a default status here if you want
  
    return (
      <TransactionToast
        {...props}
        status={statusEnumValue}
        transactions={[{ ...signedTransaction, hash: transactionHash }]}
      />
    );
  }
  

  if (props.icon) {
    return <IconToast {...props} />;
  }

  return <SimpleToast {...props} />;
};

import React from 'react';

import {
  TransactionDirectionEnum,
  TransactionOperationActionTypeEnum
} from 'types/serverTransactions.types';
import { getOperationDirection } from 'utils/transactions/transactionInfoHelpers/getOperationDirection';

import {
  WithOperationType,
  WithTransactionType
} from '../../../../../UI/types';
import { OperationBlock } from './OperationBlock';

// Allowed directions as array for validation
const allowedDirections = Object.values(TransactionDirectionEnum);

function isValidDirection(
  dir: string | undefined
): dir is TransactionDirectionEnum {
  return dir !== undefined && allowedDirections.includes(dir as TransactionDirectionEnum);
}

export const OperationText = ({
  operation,
  transaction
}: WithTransactionType & WithOperationType) => {
  const { direction } = getOperationDirection({
    operation,
    address: transaction.sender
  });

  // Use validated direction or undefined
  const safeDirection = isValidDirection(direction) ? direction : undefined;

  switch (operation.action) {
    case TransactionOperationActionTypeEnum.create:
    case TransactionOperationActionTypeEnum.localMint:
    case TransactionOperationActionTypeEnum.DCDTLocalMint:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.sender}
          action="Mint by"
          direction={TransactionDirectionEnum.INTERNAL} // ensure casing matches enum keys
        />
      );
    case TransactionOperationActionTypeEnum.addQuantity:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.sender}
          action="Add quantity by"
          direction={TransactionDirectionEnum.INTERNAL}
        />
      );
    case TransactionOperationActionTypeEnum.burn:
    case TransactionOperationActionTypeEnum.localBurn:
    case TransactionOperationActionTypeEnum.DCDTLocalBurn:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.sender}
          action="Burn by"
          direction={TransactionDirectionEnum.INTERNAL}
        />
      );
    case TransactionOperationActionTypeEnum.wipe:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.receiver}
          action="Wipe from"
          direction={TransactionDirectionEnum.INTERNAL}
        />
      );
    case TransactionOperationActionTypeEnum.multiTransfer:
      return (
        <>
          <OperationBlock
            transaction={transaction}
            address={operation.sender}
            action="Multi transfer from"
            direction={safeDirection}
          />{' '}
          <OperationBlock
            transaction={transaction}
            address={operation.receiver}
            action="To"
          />
        </>
      );
    case TransactionOperationActionTypeEnum.transfer:
      return (
        <>
          <OperationBlock
            transaction={transaction}
            address={operation.sender}
            action="Transfer from"
            direction={safeDirection}
          />{' '}
          <OperationBlock
            transaction={transaction}
            address={operation.receiver}
            action="To"
          />
        </>
      );
    case TransactionOperationActionTypeEnum.writeLog:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.sender}
          action="Write log by"
          direction={TransactionDirectionEnum.INTERNAL}
          isFullSize
        />
      );
    case TransactionOperationActionTypeEnum.signalError:
      return (
        <OperationBlock
          transaction={transaction}
          address={operation.sender}
          action="Signal error by"
          direction={TransactionDirectionEnum.INTERNAL}
          isFullSize
        />
      );
    default:
      return (
        <>
          <OperationBlock
            transaction={transaction}
            address={operation.sender}
            action="From"
            direction={safeDirection}
          />{' '}
          <OperationBlock
            transaction={transaction}
            address={operation.receiver}
            action="To"
          />
        </>
      );
  }
};

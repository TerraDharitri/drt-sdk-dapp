import React from 'react';

import globalStyles from 'assets/sass/main.scss';
import { VisibleTransactionOperationType } from 'types/serverTransactions.types';
import { NftEnumType } from 'types/tokens.types';
import { FormatAmount } from 'UI/FormatAmount';

import {
  WithOperationType,
  WithTransactionType
} from '../../../../../UI/types';
import { DetailedItem } from './DetailedItem';
import { OperationToken } from './OperationToken';

export const OperationRow = ({
  operation,
  transaction
}: WithTransactionType & WithOperationType) => {
  switch (operation.type) {
    case VisibleTransactionOperationType.nft:
    case VisibleTransactionOperationType.dcdt:
      return (
        <DetailedItem operation={operation} transaction={transaction}>
          <>
            {operation.dcdtType === NftEnumType.NonFungibleDCDT && (
              <div className={globalStyles.mr1}>NFT</div>
            )}

            {operation.dcdtType === NftEnumType.SemiFungibleDCDT && (
              <div className={globalStyles.mr1}>SFT quantity</div>
            )}

            <OperationToken operation={operation} />
          </>
        </DetailedItem>
      );

    case VisibleTransactionOperationType.rewa:
      return (
        <DetailedItem operation={operation} transaction={transaction}>
          <>
            <div className={globalStyles.mr2}>Value</div>

            <FormatAmount value={operation.value} showLastNonZeroDecimal />
          </>
        </DetailedItem>
      );

    default:
      return null;
  }
};

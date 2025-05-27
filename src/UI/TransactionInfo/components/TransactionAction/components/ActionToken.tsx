import React from 'react';

import globalStyles from 'assets/sass/main.scss';
import { TokenArgumentType } from 'types/serverTransactions.types';
import { NftEnumType } from 'types/tokens.types';
import { getTransactionActionNftText } from 'utils/transactions/transactionInfoHelpers/getTransactionActionNftText';
import { getTransactionActionTokenText } from 'utils/transactions/transactionInfoHelpers/getTransactionActionTokenText';

import styles from './styles.scss';
import { TransactionActionBlock } from './TransactionActionBlock/index';

export interface ActionTokenPropsType {
  token: TokenArgumentType;
  noValue?: boolean;
  showLastNonZeroDecimal?: boolean;
}

export const ActionToken = ({
  token,
  noValue,
  showLastNonZeroDecimal
}: ActionTokenPropsType) => {
  const isDCDT = [
    NftEnumType.MetaDCDT.toString(),
    NftEnumType.SemiFungibleDCDT,
    NftEnumType.NonFungibleDCDT
  ].includes(token.type);

  if (isDCDT) {
    switch (token.type) {
      case NftEnumType.SemiFungibleDCDT: {
        const props = getTransactionActionNftText({
          token,
          showLastNonZeroDecimal
        });

        return (
          <div className={styles.group}>
            <span className={globalStyles.mr1}>SFT quantity</span>
            <TransactionActionBlock.Nft {...props} badgeText={null} />

            <span className={globalStyles.mr1}>of collection</span>
            <TransactionActionBlock.Collection token={token} />
          </div>
        );
      }

      case NftEnumType.NonFungibleDCDT: {
        const props = getTransactionActionNftText({
          token,
          noValue,
          showLastNonZeroDecimal
        });

        return (
          <div className={styles.group}>
            <span className={globalStyles.mr1}>NFT</span>
            <TransactionActionBlock.Nft {...props} badgeText={null} />

            <span className={globalStyles.mr1}>of collection</span>
            <TransactionActionBlock.Collection token={token} />
          </div>
        );
      }

      case NftEnumType.MetaDCDT: {
        const props = getTransactionActionNftText({
          token,
          noValue,
          showLastNonZeroDecimal
        });

        return <TransactionActionBlock.Nft {...props} badgeText={null} />;
      }

      default:
        return null;
    }
  } else {
    const props = getTransactionActionTokenText({
      token,
      noValue,
      showLastNonZeroDecimal
    });

    return (
      <TransactionActionBlock.Token {...props} showLastNonZeroDecimal={true} />
    );
  }
};

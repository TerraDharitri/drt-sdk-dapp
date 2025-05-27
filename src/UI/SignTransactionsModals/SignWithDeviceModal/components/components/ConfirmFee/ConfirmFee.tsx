import React from 'react';
import { Transaction } from '@terradharitri/sdk-core/out';

import {
  DataTestIdsEnum,
  GAS_PER_DATA_BYTE,
  GAS_PRICE_MODIFIER
} from 'constants/index';
import { useGetRewaPrice } from 'hooks';
import { FormatAmount } from 'UI/FormatAmount';
import { LoadingDots } from 'UI/LoadingDots';
import { calculateFeeInFiat, calculateFeeLimit } from 'utils/operations';

import { TokenAvatar } from '../TokenAvatar';
import styles from './confirmFeeStyles.scss';

export interface FeePropsType {
  transaction: Transaction;
  rewaLabel: string;
  tokenAvatar?: string;
}

export const ConfirmFee = ({
  transaction,
  tokenAvatar,
  rewaLabel
}: FeePropsType) => {
  const { price } = useGetRewaPrice();

  const feeLimit = calculateFeeLimit({
    gasPerDataByte: String(GAS_PER_DATA_BYTE),
    gasPriceModifier: String(GAS_PRICE_MODIFIER),
    gasLimit: transaction.getGasLimit().valueOf().toString(),
    gasPrice: transaction.getGasPrice().valueOf().toString(),
    data: transaction.getData().toString(),
    chainId: transaction.getChainID().valueOf()
  });

  return (
    <div className={styles.fee}>
      <span className={styles.label}>Fee</span>

      <div className={styles.token}>
        <TokenAvatar type={rewaLabel} avatar={tokenAvatar} />

        <div className={styles.value}>
          <FormatAmount
            rewaLabel={rewaLabel}
            value={feeLimit}
            showLastNonZeroDecimal={true}
            data-testid={DataTestIdsEnum.confirmFee}
          />
        </div>
      </div>

      <span className={styles.price}>
        {price ? (
          calculateFeeInFiat({
            feeLimit,
            rewaPriceInUsd: price
          })
        ) : (
          <LoadingDots />
        )}
      </span>
    </div>
  );
};

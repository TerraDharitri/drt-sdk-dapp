import React from 'react';

import { N_A } from 'constants/index';
import { getUsdValue } from 'utils/operations/getUsdValue';

import {
  WithClassnameType,
  WithTransactionType
} from '../../../../../UI/types';
import { DetailItem } from '../../DetailItem';

import styles from './styles.scss';

export const TransactionInfoRewaPrice = ({
  className,
  transaction
}: WithTransactionType & WithClassnameType) => (
  <DetailItem className={className} title='REWA Price'>
    {transaction.price != null ? (
      getUsdValue({ amount: '1', usd: transaction.price })
    ) : (
      <span className={styles.price}>{N_A}</span>
    )}
  </DetailItem>
);

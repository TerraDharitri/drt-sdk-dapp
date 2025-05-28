import React from 'react';
import classNames from 'classnames';

import { ACCOUNTS_ENDPOINT } from 'apiCalls';
import DharitriIconSimple from 'assets/icons/drt-icon-simple.svg';
import { trimUsernameDomain } from 'hooks/account/helpers';
import { CopyButton } from 'UI/CopyButton';
import { ExplorerLink } from 'UI/ExplorerLink';
import { Trim } from 'UI/Trim';

import styles from './receiverValueStyles.scss';

export interface ReceiverValuePropsType {
  hasUsername: boolean;
  receiverValue: string;
  receiverAddress: string;
}

export const ReceiverValue = ({
  hasUsername,
  receiverValue,
  receiverAddress
}: ReceiverValuePropsType) => {
  if (hasUsername) {
    return (
      <span className={classNames(styles.receiverValue, styles.shrunk)}>
        <DharitriIconSimple className={styles.receiverValueIcon} />
        {trimUsernameDomain(receiverValue)}

        <ExplorerLink
          page={`/${ACCOUNTS_ENDPOINT}/${receiverAddress}`}
          className={styles.receiverValueExplorer}
        />
      </span>
    );
  }

  return (
    <span className={styles.receiverValue}>
      <Trim text={receiverAddress} />
      <CopyButton text={receiverAddress} className={styles.receiverValueCopy} />
    </span>
  );
};

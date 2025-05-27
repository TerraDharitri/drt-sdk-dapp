import React from 'react';
import { Address } from '@terradharitri/sdk-core/out';
import classNames from 'classnames';

import { useGetRewaPrice, useGetNetworkConfig } from 'hooks';
import { useGetTokenDetails } from 'hooks/transactions/useGetTokenDetails';
import { ActiveLedgerTransactionType, MultiSignTransactionType } from 'types';
import { NftEnumType } from 'types/tokens.types';
import { TransactionData } from 'UI/TransactionData';
import { getIdentifierType } from 'utils';
import { getRewaLabel } from 'utils/network/getRewaLabel';
import { formatAmount } from 'utils/operations/formatAmount';
import { isTokenTransfer } from 'utils/transactions/isTokenTransfer';

import { useSignStepsClasses } from '../hooks';
import { ConfirmAmount } from './components/ConfirmAmount';
import { ConfirmFee } from './components/ConfirmFee';
import { ConfirmReceiver } from './components/ConfirmReceiver';
import { NftSftPreviewComponent } from './components/NftSftPreviewComponent';
import styles from './signStepBodyStyles.scss';

export interface SignStepInnerClassesType {
  buttonsWrapperClassName?: string;
  inputGroupClassName?: string;
  inputLabelClassName?: string;
  inputValueClassName?: string;
  errorClassName?: string;
  scamAlertClassName?: string;
  buttonClassName?: string;
  progressClassName?: string;
}

export interface SignStepBodyPropsType {
  error: string | null;
  callbackRoute?: string;
  currentStep: number;
  currentTransaction: ActiveLedgerTransactionType | null;
  allTransactions: MultiSignTransactionType[];
  signStepInnerClasses?: SignStepInnerClassesType;
  isGuarded?: boolean;
}

export const SignStepBody = ({
  currentTransaction,
  error,
  signStepInnerClasses
}: SignStepBodyPropsType) => {
  const rewaLabel = getRewaLabel();

  if (!currentTransaction) {
    return null;
  }

  const { network } = useGetNetworkConfig();
  const {
    inputGroupClassName,
    inputLabelClassName,
    inputValueClassName,
    errorClassName
  } = signStepInnerClasses || {};

  const { tokenId, nonce, amount, multiTxData, receiver } =
    currentTransaction.transactionTokenInfo;

  const isTokenTransaction = Boolean(
    tokenId && isTokenTransfer({ tokenId, drtLabel: rewaLabel })
  );

  const { isNft, isRewa, isDcdt } = getIdentifierType(tokenId);

  // If the token has a nonce means that this is an NFT. Eg: TokenId=TOKEN-1hfr, nonce=123 => NFT id=TOKEN-1hfr-123
  const appendedNonce = nonce ? `-${nonce}` : '';
  const nftId = `${tokenId}${appendedNonce}`;

  const { tokenDecimals, tokenAvatar, tokenLabel, type, dcdtPrice } =
    useGetTokenDetails({
      tokenId: nonce && nonce?.length > 0 ? nftId : tokenId
    });

  const transactionReceiver = multiTxData
    ? new Address(receiver).bech32()
    : currentTransaction.transaction.getReceiver().toString();

  const getFormattedAmount = ({ addCommas }: { addCommas: boolean }) =>
    formatAmount({
      input: isTokenTransaction
        ? amount
        : currentTransaction.transaction.getValue().toString(),
      decimals: isTokenTransaction ? tokenDecimals : Number(network.decimals),
      digits: Number(network.digits),
      showLastNonZeroDecimal: false,
      addCommas
    });

  const formattedAmount = getFormattedAmount({ addCommas: true });
  const rawAmount = getFormattedAmount({ addCommas: false });

  const scamReport = currentTransaction.receiverScamInfo;
  const classes = useSignStepsClasses(scamReport);

  const token = isNft ? nftId : tokenId || rewaLabel;
  const shownAmount = isNft ? amount : formattedAmount;

  const { price: rewaPrice } = useGetRewaPrice();
  let tokenPrice;

  if (isRewa && rewaPrice) {
    tokenPrice = rewaPrice;
  }

  if (isNft) {
    tokenPrice = null;
  }

  if (isDcdt && type) {
    tokenPrice = dcdtPrice ?? null;
  }

  const shouldShowAmount =
    isRewa || isDcdt || (Boolean(type) && type !== NftEnumType.NonFungibleDCDT);

  return (
    <div className={styles.summary}>
      <div className={styles.fields}>
        {isNft && type && (
          <NftSftPreviewComponent
            txType={type}
            tokenLabel={tokenLabel}
            tokenId={tokenId}
            tokenAvatar={tokenAvatar}
          />
        )}

        <ConfirmReceiver
          scamReport={scamReport}
          receiver={transactionReceiver}
        />

        <div className={styles.columns}>
          {shouldShowAmount && (
            <div className={styles.column}>
              <ConfirmAmount
                tokenAvatar={tokenAvatar}
                formattedAmount={shownAmount}
                rawAmount={rawAmount}
                token={token}
                tokenType={isRewa ? rewaLabel : type}
                tokenPrice={tokenPrice}
              />
            </div>
          )}

          <div className={styles.column}>
            <ConfirmFee
              tokenAvatar={tokenAvatar}
              rewaLabel={rewaLabel}
              transaction={currentTransaction.transaction}
            />
          </div>
        </div>

        {currentTransaction.transaction.getData() && (
          <TransactionData
            isScCall={!tokenId}
            data={currentTransaction.transaction.getData().toString()}
            highlight={multiTxData}
            className={inputGroupClassName}
            innerTransactionDataClasses={{
              transactionDataInputLabelClassName: inputLabelClassName,
              transactionDataInputValueClassName: inputValueClassName
            }}
          />
        )}

        {error && (
          <p className={classNames(classes.errorMessage, errorClassName)}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

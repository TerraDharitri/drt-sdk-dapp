import React, { Component } from 'react';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import RewaIcon from 'assets/icons/REWA.svg';
import { getRewaLabel } from 'utils/network/getRewaLabel';

import { getIdentifierType } from 'utils/validation/getIdentifierType';
import { WithClassnameType } from '../types';
import styles from './tokenDetailsStyles.scss';
import { Combined, Simple } from './TokenSymbol';

const getIdentifierWithoutNonce = (identifier: string) => {
  const tokenParts = identifier.split('-');

  return identifier.includes('-')
    ? `${tokenParts[0]}-${tokenParts[1]}`
    : identifier;
};

export interface TokenIconPropsType {
  token: string;
  combined?: boolean | undefined;
  small?: boolean | undefined;
  tokenAvatar?: string;
}

export interface TokenIconType extends TokenIconPropsType {
  symbol: string;
  label: string;
  icon: () => JSX.Element;
}

function getIcon(isRewaTransfer: boolean, tokenAvatar?: string) {
  if (tokenAvatar && tokenAvatar !== 'undefined') {
    return <img className={styles.tokenSymbolCustomToken} src={tokenAvatar} />;
  }
  return isRewaTransfer ? <RewaIcon /> : <FontAwesomeIcon icon={faDiamond} />;
}

const getDetails = (token: string, tokenAvatar?: string): TokenIconType => {
  const rewaLabel = getRewaLabel();
  const isRewaTransfer = token === rewaLabel;

  return {
    token,
    symbol: token ? token.split('-')[0] : '',
    label: token,
    // eslint-disable-next-line react/display-name
    icon: () => getIcon(isRewaTransfer, tokenAvatar)
  };
};

const getTokenIdentifier = (token: string) => {
  const { isNft } = getIdentifierType(token);
  const identifier = isNft ? token : getIdentifierWithoutNonce(token);
  return identifier;
};

export class TokenDetails extends Component {
  static Token = (props: TokenIconPropsType) => <>{props.token}</>;
  static Symbol = (props: TokenIconPropsType) => (
    <>
      {
        getDetails(getIdentifierWithoutNonce(props.token), props.tokenAvatar)
          .symbol
      }
    </>
  );
  static Label = (props: TokenIconPropsType) => {
    return (
      <>
        {getDetails(getTokenIdentifier(props.token), props.tokenAvatar).label}
      </>
    );
  };
  static Icon = (props: TokenIconPropsType & WithClassnameType) => {
    const Component: any =
      process.env.NODE_ENV !== 'test'
        ? getDetails(getTokenIdentifier(props.token), props.tokenAvatar).icon
        : () => null;

    return (
      <div className={props.className ?? 'dapp-token-details-icon'}>
        {props.combined ? (
          <Combined small={props.small}>
            <Component />
          </Combined>
        ) : (
          <Simple>
            <Component />
          </Simple>
        )}
      </div>
    );
  };
  render() {
    return null;
  }
}

import React from 'react';
import { faDiamond } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';

import DharitriIcon from 'assets/icons/REWA.svg';
import { NftEnumType } from 'types/tokens.types';

import { getRewaLabel } from 'utils/network';
import styles from './tokenAvatarStyles.scss';

export interface TokenAvatarPropsType {
  type?: NftEnumType | string;
  avatar?: string;
}

export const TokenAvatar = (props: TokenAvatarPropsType) => {
  const { avatar, type } = props;

  const rewaLabel = getRewaLabel();
  const isNft = type === NftEnumType.NonFungibleDCDT;
  const isSft = type === NftEnumType.SemiFungibleDCDT;
  const isRewa = type === rewaLabel;

  const tokenIcon = avatar ? (
    <img src={avatar} alt={type} />
  ) : (
    <FontAwesomeIcon icon={faDiamond} />
  );

  if (isNft || isSft) {
    return (
      <div
        className={classNames(styles.tokenAvatar, {
          [styles.tokenAvatarNft]: isNft,
          [styles.tokenAvatarSft]: isSft
        })}
      >
        {isNft ? 'NFT' : 'SFT'}
      </div>
    );
  }

  return (
    <div className={styles.tokenAvatar}>
      {isRewa ? <DharitriIcon /> : tokenIcon}
    </div>
  );
};

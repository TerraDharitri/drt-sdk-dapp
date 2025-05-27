import { Address } from '@terradharitri/sdk-core/out';
import { UserPublicKey, UserVerifier } from '@terradharitri/sdk-wallet';

export const getVerifier = (address: string) => {
  const publicKey = new UserPublicKey(Address.fromString(address).pubkey());

  return new UserVerifier(publicKey);
};

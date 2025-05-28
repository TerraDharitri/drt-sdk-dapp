import { ExtensionProvider } from '@terradharitri/sdk-extension-provider';
import { HWProvider } from '@terradharitri/sdk-hw-provider';
import { MetamaskProvider } from '@terradharitri/sdk-metamask-provider/out/metamaskProvider';
import { OperaProvider } from '@terradharitri/sdk-opera-provider';
import { WalletProvider } from '@terradharitri/sdk-web-wallet-provider';
import { CrossWindowProvider } from 'lib/sdkWebWalletCrossWindowProvider';
import { IDappProvider } from 'types';
import { WalletConnectV2Provider } from 'utils/walletconnect/__sdkWalletconnectProvider';
import { emptyProvider } from './utils';

export type ProvidersType =
  | IDappProvider
  | ExtensionProvider
  | MetamaskProvider
  | WalletProvider
  | CrossWindowProvider
  | HWProvider
  | OperaProvider
  | WalletConnectV2Provider;

let accountProvider: ProvidersType = emptyProvider;

let externalProvider: IDappProvider | null = null;

export function setAccountProvider<TProvider extends ProvidersType>(
  provider: TProvider
) {
  accountProvider = provider;
}

export function setExternalProvider(provider: IDappProvider) {
  externalProvider = provider;
}

export function setExternalProviderAsAccountProvider() {
  if (externalProvider != null) {
    accountProvider = externalProvider;
  }
}

export function getAccountProvider(): IDappProvider {
  return (accountProvider as IDappProvider) || emptyProvider;
}

export function getExternalProvider() {
  return externalProvider;
}

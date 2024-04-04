import { DEFAULT_SEARCH_PARAMS, SORT_PARAMS } from './../../../../constant/index';

export const VAULT_SEARCH_PARAMS = {
  ...DEFAULT_SEARCH_PARAMS,
};

export enum VaultKey {
  KEYWORD = 'keyword',
  TYPE = 'type',
  VAULT = 'vault',
  APY = 'apy',
  RISK = 'riskEstimation',
  TVL = 'tvl',
  BALANCE = 'myBalance',
}

export const VAULT_FIELDS_TEXT = {
  [VaultKey.VAULT]: 'Vault',
  [VaultKey.APY]: 'APR',
  [VaultKey.RISK]: 'Risk estimation',
  [VaultKey.TVL]: 'TVL',
  [VaultKey.BALANCE]: 'My Balance',
};

export enum VaultType {
  ALL = 'ALL',
  STABLE = 'STABLE',
  CRYPTO = 'CRYPTO',
  SINGLE = 'SINGLE',
  HOLDING = 'HOLDING',
  LP = 'LP'
}

export type VAULT_SEARCH_PARAMS_TYPE = Partial<
  typeof VAULT_SEARCH_PARAMS &
    SORT_PARAMS & {
      [VaultKey.KEYWORD]: string | null;
      [VaultKey.TYPE]: VaultType;
    }
>;

export const FORM_DEFAULT_VALUE = {
  [VaultKey.KEYWORD]: null,
  [VaultKey.TYPE]: VaultType.ALL,
};

export type VaultDetailDTO = {
  id: string;
  vault: {
    img?: string;
    img2?: string;
    name: string;
  };
  apy?: string;
  riskEstimation?: string;
  tvl?: string;
  myBalance?: string;
  address: string;
  sharePrice: string;
  url: string;
};

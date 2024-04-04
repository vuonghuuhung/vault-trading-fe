export const VaultInfoTabs = {
  about: {
    name: 'About',
    key: 'about',
  },
  historical: {
    name: 'Historical Data',
    key: 'historical-data',
  },
  risk: {
    name: 'Risk estimation',
    key: 'risk-estimation',
  }
};

export const SwapTabs = {
  deposit: {
    name: 'Deposit',
    key: 'deposit',
  },
  withdraw: {
    name: 'Withdraw',
    key: 'withdraw',
  },
};

export enum DepositField {
  quantity = 'quantity',
}

export enum WithdrawField {
  quantity = 'quantity',
}

export const MAX_DEPOSIT_NUMBER = 9;
export const MAX_WITHDRAW_NUMBER = 9;

export type HistoricalData = {
  nextTimeRebalance: string,
  // maxApr: string,
  // maxTvl: string, 
  // maxSharePrice: string,
  aprData: {
    timestamp: string,
    value: string
  }[],
  tvlData: {
    timestamp: string,
    value: string
  }[],
  sharePriceData: {
    timestamp: string,
    value: string
  }[]
}

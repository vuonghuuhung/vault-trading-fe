import useVaultStore from './useVaultStore';

// Actions
export const useVaultActions = () => useVaultStore((state) => state.actions);

// [get]
export const useGetListVault = () => useVaultStore((state) => state.listVault);
export const useGetVaultDetail = () => useVaultStore((state) => state.detailVault);
export const useGetUSDTBalance = () => useVaultStore((state) => state.usdt);
export const useGetStakedAmount = () => useVaultStore((state) => state.staked);
export const useGetHistoricalData = () => useVaultStore((state) => state.historicalVaultData);
export const useGetDepositOrder = () => useVaultStore((state) => state.depositOrder);
export const useGetWithdrawOrder = () => useVaultStore((state) => state.withdrawOrder);

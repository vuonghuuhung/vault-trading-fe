import useAuthenticationStore from './useAuthenticationStore';

// Actions
export const useAuthActions = () => useAuthenticationStore((state) => state.actions);

// [get]
export const useGetCurrentChain = () => useAuthenticationStore((state) => state.currentChain);
export const useAuthWallet = () => useAuthenticationStore((state) => state.currentWallet);
export const useAuthAddress = () => useAuthenticationStore((state) => state.address);

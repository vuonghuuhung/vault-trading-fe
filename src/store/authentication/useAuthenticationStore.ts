import omit from 'lodash/omit';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export enum ChainType {
  ETHER = import.meta.env.VITE_ETHER_CHAINID,
  BSC = import.meta.env.VITE_BINANCE_CHAINID,
}

export const ChainList = {
  ether: {
    chainId: import.meta.env.VITE_ETHER_CHAINID,
    name: import.meta.env.VITE_ETHER_NAME,
    rpc: [import.meta.env.VITE_ETHER_RPC],
    controller: import.meta.env.VITE_ETHER_CONTROLLER,
    scan: import.meta.env.VITE_ETHER_SCAN,
  },
  bsc: {
    chainId: import.meta.env.VITE_BINANCE_CHAINID,
    name: import.meta.env.VITE_BINANCE_NAME,
    rpc: [import.meta.env.VITE_BINANCE_RPC],
    controller: import.meta.env.VITE_BINANCE_CONTROLLER,
    scan: import.meta.env.VITE_BINANCE_SCAN,
  },
};

interface Authentication {
  address: string;
  listAddress: any;
  authenticationToken: string;
  currentChain: ChainType;
  currentWallet: string;
}

export interface AuthenticationAction {
  handleSetAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleRemoveAddress: ({ address }: Pick<Authentication, 'address'>) => void;
  handleAddAddress: ({ address, signature }: Pick<Authentication, 'address'> & { signature: string }) => void;
  handleSetAuthenticationToken: (authenticationToken: Authentication['authenticationToken']) => void;
  handleSetChain: (currentChain: Authentication['currentChain']) => void;
  handleSetCurrentWallet: (currentWallet: Authentication['currentWallet']) => void;
}

const initialState = {
  address: '',
  listAddress: {},
  authenticationToken: '',
  currentChain: ChainType.BSC,
  currentWallet: '',
};

const useAuthenticationStore = create<Authentication & { actions: AuthenticationAction }>()(
  persist(
    immer((set) => ({
      //States
      ...initialState,

      //Actions
      actions: {
        handleSetAddress: ({ address }) => set({ address }),

        handleRemoveAddress: ({ address }) =>
          set((state) => {
            if (address) {
              state.listAddress = omit(state?.listAddress, [address]);
            }
            state.address = '';
          }),

        handleAddAddress: ({ address, signature }) =>
          set((state) => {
            state.address = address;

            if (address) {
              state.listAddress[address] = {
                address,
                signature,
              };
            }
          }),

        handleSetAuthenticationToken: (authenticationToken) => set({ authenticationToken }),

        handleSetChain: (currentChain) => set({ currentChain }),

        handleSetCurrentWallet: (currentWallet) => set({ currentWallet }),
      },
    })),
    {
      name: 'Authentication',
      partialize: ({ address, listAddress, authenticationToken, currentChain, currentWallet }) => ({
        address,
        listAddress,
        authenticationToken,
        currentChain,
        currentWallet,
      }),
    },
  ),
);

export default useAuthenticationStore;

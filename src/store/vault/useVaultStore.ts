import { VaultDetailDTO } from 'components/pages/home/constants';
import { HistoricalData } from 'components/pages/vault/constants';
import { create } from 'zustand';

interface IVaultState {
  listVault: VaultDetailDTO[];
  detailVault: VaultDetailDTO | null;
  usdt: string;
  staked: string;
  depositOrder: string;
  withdrawOrder: string;
  historicalVaultData: HistoricalData | null;
}

export interface IVaultAction {
  handleSetListVault: ({ listVault }: Pick<IVaultState, 'listVault'>) => void;
  handleSetVaultDetail: ({ detailVault }: Pick<IVaultState, 'detailVault'>) => void;
  handleSetUSDTBalance: ({ usdt }: Pick<IVaultState, 'usdt'>) => void;
  handleSetStakedAmount: ({ staked }: Pick<IVaultState, 'staked'>) => void;
  handleSetDepositOrder: ({ depositOrder }: Pick<IVaultState, 'depositOrder'>) => void;
  handleSetWithdrawOrder: ({ withdrawOrder }: Pick<IVaultState, 'withdrawOrder'>) => void;
  handleSetHistoricalData: ({ historicalVaultData }: Pick<IVaultState, 'historicalVaultData'>) => void;
}

const initialState = {
  listVault: [],
  detailVault: null,
  usdt: '0',
  staked: '0',
  depositOrder: '0',
  withdrawOrder: '0',
  historicalVaultData: null
};

const useVaultStore = create<IVaultState & { actions: IVaultAction }>()((set) => ({
  //States
  ...initialState,

  //Actions
  actions: {
    handleSetListVault: ({ listVault }) => {
      return set({ listVault })
    },

    handleSetHistoricalData: ({ historicalVaultData }) => set({ historicalVaultData }),

    handleSetVaultDetail: ({ detailVault }) => set({ detailVault }),

    handleSetUSDTBalance: ({ usdt }) => set({ usdt }),

    handleSetStakedAmount: ({ staked }) => set({ staked }),

    handleSetDepositOrder: ({ depositOrder }) => set({ depositOrder }),
    
    handleSetWithdrawOrder: ({ withdrawOrder }) => set({ withdrawOrder })
  },
}));

export default useVaultStore;

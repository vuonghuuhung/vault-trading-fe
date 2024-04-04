import { useEffect, useState } from 'react';
import { getListVaultFromContract } from 'services/walletService';
import { useAuthAddress, useGetCurrentChain } from 'store/authentication/selector';
import { ChainType } from 'store/authentication/useAuthenticationStore';
import { useGetListVault, useGetVaultDetail, useVaultActions } from 'store/vault/selector';
import { VaultDetailDTO } from '../constants';
import { useParams } from 'react-router-dom';
import { useFetchVaultTable } from 'components/pages/vault/hooks/useFetchVaultTable';
// const typechain = require('nestquant-vault-eth-sdk');

export const useVaultList = (currentChain: ChainType) => {
  const { handleSetListVault, handleSetVaultDetail } = useVaultActions();
  const account = useAuthAddress();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ data: VaultDetailDTO[]; network: ChainType }>({ data: [], network: currentChain });
  const { content, step, handleRetrieve, resetModalStep } = useFetchVaultTable();
  const { vaultId } = useParams();
  const vaultDetail = useGetVaultDetail();

  const getVaultList = async (chainId?: ChainType) => {
    const curChainId = chainId || currentChain;
    const { listVault, detailVault } = await handleRetrieve(curChainId, account, vaultId, vaultDetail);
    handleSetListVault({ listVault: listVault });
    // const mockVaultDetail = detailVault != null ? detailVault : listVault[0];
    // handleSetVaultDetail({ detailVault: mockVaultDetail });
    return {
      listVault,
      curChainId,
    };
  };

  useEffect(() => {
    setLoading(true);

    const fetch = (async () => {
      const { listVault: data, curChainId: network } = await getVaultList();
      setData({ data, network });
      setLoading(false);
    })();
  }, []); // currentChain

  return {
    getVaultList,
    data: data.data,
    network: data.network,
    loading,
    content,
    step,
    resetModalStep
  };
};

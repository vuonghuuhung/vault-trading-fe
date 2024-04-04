import MetaMaskSDK, { SDKProvider } from '@metamask/sdk';
import showMessage from 'components/Message';
import { VaultDetailDTO } from 'components/pages/home/constants';
import { useVaultList } from 'components/pages/home/hooks/useVaultList';
import { useFetchVaultTable } from 'components/pages/vault/hooks/useFetchVaultTable';
import { TYPE_CONSTANTS } from 'constant';
import { listVault } from 'mock';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { changeChainId, connectWallet, connectWalletEarly, getListVaultFromContract } from 'services/walletService';
import { useAuthActions, useAuthAddress, useGetCurrentChain } from 'store/authentication/selector';
import { ChainType } from 'store/authentication/useAuthenticationStore';
import { useGetListVault, useGetVaultDetail, useVaultActions } from 'store/vault/selector';

const getAddressFromLocal = () => {
  try {
    const authData = localStorage.getItem('Authentication');
    const addressAfter = JSON.parse(authData || '')?.state?.address;
    return addressAfter;
  } catch (error) {
    return null;
  }
};

export const useWalletConnect = ({
  handleFailed,
  handleSuccess,
}: {
  handleFailed?: () => void;
  handleSuccess?: () => void;
}) => {
  const { handleSetAddress, handleRemoveAddress } = useAuthActions();
  const { handleSetListVault, handleSetVaultDetail } = useVaultActions();
  const { content, step, handleRetrieve, resetModalStep } = useFetchVaultTable();

  const currentAddress = useAuthAddress();
  const currentChain = useGetCurrentChain();
  const { vaultId } = useParams();
  const vaultDetail = useGetVaultDetail();
  const vaultList = useGetListVault();

  const handleConnect = async () => {
    // console.log(`current account ${currentAddress}`);
    const address = await connectWallet();
    await changeChainId(currentChain);
    if (address) {
      handleSetAddress({ address });
      handleSuccess && handleSuccess();
      const { listVault, detailVault } = await handleRetrieve(currentChain, address, vaultId, vaultDetail);
      handleSetListVault({ listVault: listVault });
      handleSetVaultDetail({ detailVault: detailVault });
      currentAddress.toLowerCase() !== address.toLowerCase() &&
        showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Connect successfully!');
      // console.log(detailVault);
    } else {
      handleFailed && handleFailed();
      handleSetAddress({ address: '' });
      showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Cannot connect wallet!');
    }
  };

  const handleConnectEarly = async () => {
    const address = await connectWallet();
    if (address) {
      handleSetAddress({ address });
    } else {
      handleSetAddress({ address: '' });
      //   showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Cannot connect wallet!');
    }
  };

  const handleLogout = async () => {
    handleRemoveAddress({ address: currentAddress });
    const addressAfter = getAddressFromLocal();
    const newListVault: VaultDetailDTO[] = vaultList.map((e) => {
      const newVault: VaultDetailDTO = e;
      newVault.myBalance = '0';
      return newVault;
    });

    handleSetListVault({ listVault: newListVault });
    if (vaultDetail) {
      handleSetVaultDetail({
        detailVault: {
          address: vaultDetail.address,
          id: vaultDetail.id,
          sharePrice: vaultDetail.sharePrice,
          vault: vaultDetail.vault,
          apy: vaultDetail.apy,
          myBalance: '0',
          riskEstimation: vaultDetail.riskEstimation,
          tvl: vaultDetail.tvl,
          url: vaultDetail.url,
        },
      });
    }

    // console.log(vaultList);
    addressAfter === '' && showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Logout successfully!');
  };

  return {
    currentAddress,
    handleConnect,
    handleConnectEarly,
    handleLogout,
    resetModalStep,
    content,
    step,
  };
};

export function useInactiveConnect() {
  const [addressMetamask, setAddressMetamask] = useState('');
  const { handleSetAddress, handleRemoveAddress } = useAuthActions();
  const { handleSetListVault, handleSetVaultDetail } = useVaultActions();
  const { content, step, handleRetrieve, resetModalStep } = useFetchVaultTable();

  const currentAddress = useAuthAddress();
  const currentChain = useGetCurrentChain();
  const { vaultId } = useParams();
  const vaultDetail = useGetVaultDetail();
  const vaultList = useGetListVault();

  const handleConnectEarly = async () => {
    // console.log("enter here");

    const address = await connectWalletEarly();
    if (address) {
      handleSetAddress({ address });
      const { listVault, detailVault } = await handleRetrieve(currentChain, address, vaultId, vaultDetail);
      handleSetListVault({ listVault: listVault });
      handleSetVaultDetail({ detailVault: detailVault });
      setAddressMetamask(address);
    } else {
      handleSetAddress({ address: '' });
      //   showMessage(TYPE_CONSTANTS.MESSAGE.ERROR, 'Cannot connect wallet!');
    }
  };

  const handleLogout = async () => {
    handleRemoveAddress({ address: currentAddress });
    // console.log('currentAddress: ', currentAddress);
    const newListVault: VaultDetailDTO[] = vaultList.map((e) => {
      const newVault: VaultDetailDTO = e;
      newVault.myBalance = '0';
      return newVault;
    });

    handleSetListVault({ listVault: newListVault });
    if (vaultDetail) {
      handleSetVaultDetail({
        detailVault: {
          address: vaultDetail.address,
          id: vaultDetail.id,
          sharePrice: vaultDetail.sharePrice,
          vault: vaultDetail.vault,
          apy: vaultDetail.apy,
          myBalance: '0',
          riskEstimation: vaultDetail.riskEstimation,
          tvl: vaultDetail.tvl,
          url: vaultDetail.url,
        },
      });
    }
    // const addressAfter = getAddressFromLocal();
    // addressAfter === '' && showMessage(TYPE_CONSTANTS.MESSAGE.SUCCESS, 'Logout successfully!');
  };

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum && ethereum.on) {
      ethereum.on('connect', handleConnectEarly);
      ethereum.on('accountsChanged', handleConnectEarly);
      ethereum.on('disconnect', handleLogout);
      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnectEarly);
          ethereum.removeListener('accountsChanged', handleConnectEarly);
          ethereum.removeListener('disconnect', handleLogout);
        }
      };
    }
  }, []);

  return {
    content,
    step,
    resetModalStep,
  };
}

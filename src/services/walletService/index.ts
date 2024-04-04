import * as typechain from 'nestquant-vault-sdk';
import { ethers } from 'ethers';
import { ChainList, ChainType } from 'store/authentication/useAuthenticationStore';
import BigNumber from 'bignumber.js';
import { TOKEN_LIST } from 'constant/token';
import { VaultDetailDTO } from 'components/pages/home/constants';
import { MODAL_STEP } from 'components/pages/vault/components/ModalStep';
import { JsonRpcProvider } from '@ethersproject/providers';
import { HistoricalData } from 'components/pages/vault/constants';

export const connectWallet = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error('Metamask is not available');
    }

    const accounts: any = await ethereum?.request({
      method: 'eth_requestAccounts',
      params: [],
    });

    return accounts[0];
  } catch (error) {
    // console.error(`connect wallet error: ${error}`);
    return '';
  }
};

export const connectWalletEarly = async () => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error('Metamask is not available');
    }

    const accounts: any = await ethereum?.request({
      method: 'eth_accounts',
      params: [],
    });

    return accounts[0];
  } catch (error) {
    console.error(`connect wallet error: ${error}`);
    return '';
  }
};

export const changeChainId = async (currentChain: ChainType) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      throw new Error('MetaMask is not available.');
    }

    await ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: currentChain }],
    });
  } catch (switchError: any) {
    if (switchError.code === 4902) {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          throw new Error('MetaMask is not available.');
        }
        if (currentChain === ChainType.ETHER) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ChainList.ether.chainId,
                chainName: ChainList.ether.name,
                rpcUrls: ChainList.ether.rpc,
              },
            ],
          });
        }
        if (currentChain === ChainType.BSC) {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: ChainList.bsc.chainId,
                chainName: ChainList.bsc.name,
                rpcUrls: ChainList.bsc.rpc,
              },
            ],
          });
        }
      } catch (addError) {}
    }
  }
};

const getLogoByTokenPair = (tokenPair: string) => {
  const [token1, token2] = tokenPair.split('/');
  return {
    img1: TOKEN_LIST[token1]?.img,
    img2: TOKEN_LIST[token2]?.img,
  };
};

export const getStatisticInfoFromContract = async (vaultAdd: string, currentChain: ChainType, provider: any) => {
  // let provider: JsonRpcProvider;
  // switch (currentChain) {
  //   case ChainType.ETHER:
  //     provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
  //     break;

  //   case ChainType.BSC:
  //     provider = new ethers.providers.JsonRpcProvider(ChainList.bsc.rpc[0]);
  //     break;

  //   default:
  //     provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
  //     break;
  // }
  // const vault = new ethers.Contract(vaultAdd, typechain.Vault__factory.abi, provider);
  const vault = typechain.Vault__factory.connect(vaultAdd, provider);
  const [nameData, apyData, tvlData, sharePriceData, decimalData] = await vault.multicall();
  const decimals = decimalData.toString();
  const tvl = tvlData.toString();
  const apy = apyData.toString();
  const oneShare = sharePriceData.toString();
  const fmtApy = new BigNumber(apy).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
  const fmtTvl = new BigNumber(tvl).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
  const fmtOneSharePrice = new BigNumber(oneShare).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();

  return {
    name: nameData,
    decimal: decimals,
    apy: fmtApy,
    tvl: fmtTvl,
    oneSharePrice: fmtOneSharePrice,
  };
};

export const getStaked = async (ob: { acc: string; address: string }) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      // throw new Error('MetaMask is not available.');
      return;
    }
;
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    // console.log(provider)
    
    const vault = typechain.Vault__factory.connect(ob.address);
    const signer = provider.getSigner() as any;
    const address = await signer.getAddress();
    console.log('address: ', address);
    // console.log('signer: ', await signer);
    const staked = (await vault.connect(provider.getSigner() as any).balanceOf(ob.acc)).toString();
    const decimal = (await vault.connect(provider.getSigner() as any).decimals()).toString();
    const stakedAmount = new BigNumber(staked.toString())
      .dividedBy(new BigNumber(10).pow(new BigNumber(decimal)))
      .toString();
    return stakedAmount;
  } catch (error) {
    // console.error(`get stake error: ${error}`);
    return "0"
  }
};

export const getUSDTBalance = async (ob: { acc: string; address: string }) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      // throw new Error('MetaMask is not available.');
      return "0";
    }

    if (!ethereum.isConnected()) {
      return "0"
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner() as any;
    const address = await signer.getAddress();
    console.log('address: ', address);
    
    const vault = typechain.Vault__factory.connect(ob.address);
    const decimals = (await vault.connect(signer).decimals()).toString();
    const underlyingAddress = await vault.connect(signer).underlying();
    const underlying = typechain.MockUnderlyingToken__factory.connect(underlyingAddress);
    const underlyingBalance = (await underlying.connect(signer).balanceOf(ob.acc)).toString();

    const usdtBalance = new BigNumber(underlyingBalance)
      .dividedBy(new BigNumber(10).pow(new BigNumber(decimals)))
      .toString();
    
    return usdtBalance;
  } catch (error) {
    // console.error(`get stake error: ${error}`);
    return "0"
  }
};

export const getDepositWithdrawPendingAmount = async (ob: { acc: string; address: string }) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      // throw new Error('MetaMask is not available.');
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner() as any;
    const vault = typechain.Vault__factory.connect(ob.address);
    const decimals = (await vault.connect(signer).decimals()).toString();
    const depositOrder = (await vault.connect(signer).depositOrder(signer)).toString();
    const withdrawOrder = (await vault.connect(signer).withdrawOrder(signer)).toString();

    const depositFmt = new BigNumber(depositOrder).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
    const withdrawFmt = new BigNumber(withdrawOrder)
      .dividedBy(new BigNumber(10).pow(new BigNumber(decimals)))
      .toString();
    console.log('depositFmt: ', depositFmt);
    console.log('withdrawFmt: ', withdrawFmt);

    return { depositFmt, withdrawFmt };
  } catch (error) {
    // console.error(`get stake error: ${error}`);
    return { depositFmt: 0, withdrawFmt: 0 };
  }
};

export const getListVaultFromContract = async (
  currentChain: ChainType,
  account: string,
): Promise<{ data: VaultDetailDTO[]; network: ChainType }> => {
  // let account: string;
  let provider: JsonRpcProvider;
  let controllerAdd: string;
  let urlLink: string;
  switch (currentChain) {
    case ChainType.ETHER:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      controllerAdd = ChainList.ether.controller;
      urlLink = import.meta.env.VITE_ETHER_ADDRESS;
      break;

    case ChainType.BSC:
      provider = new ethers.providers.JsonRpcProvider(ChainList.bsc.rpc[0]);
      controllerAdd = ChainList.bsc.controller;
      urlLink = import.meta.env.VITE_BINANCE_ADDRESS;
      break;

    default:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      controllerAdd = ChainList.ether.controller;
      urlLink = import.meta.env.VITE_ETHER_ADDRESS;
      break;
  }

  // const controller = new ethers.Contract(controllerAdd, typechain.Controller__factory.abi, provider);
  const controller = typechain.Controller__factory.connect(controllerAdd, provider as any);
  let vaultAddressList: String[] = await controller.getAllVaults();
  if (!vaultAddressList) {
    return { data: [], network: currentChain };
  }
  vaultAddressList = vaultAddressList.filter((e) => e != '0x0000000000000000000000000000000000000000');
  try {
    const data = await Promise.all(
      vaultAddressList.map(async (e: String) => {
        const { name, decimal, apy, tvl, oneSharePrice } = await getStatisticInfoFromContract(
          e.toString(),
          currentChain,
          provider,
        );
        const { img1, img2 } = getLogoByTokenPair(name);
        // const currencyPair = name.split("/")[0];
        let balance: any = '0';
        if (account) {
          balance = await getStaked({ acc: account, address: e.toString() });
          // console.log(balance);

          balance = new BigNumber(balance).multipliedBy(oneSharePrice).toString();
          // console.log(balance);
        }
        return {
          id: e.toString(),
          vault: { img: img1, img2: img2, name: name },
          apy: apy,
          riskEstimation: '0.1',
          tvl: tvl,
          myBalance: balance,
          sharePrice: oneSharePrice,
          address: e.toString(),
          url: `${urlLink}${e.toString()}`,
        };
      }),
    );
    return { data: data, network: currentChain };
  } catch (error) {
    return { data: [], network: currentChain };
  }
};

export const approveToken = async (
  ob: { amount: string; address: string },
  handleStep?: (content: string, status: MODAL_STEP) => void,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner() as any;
  const vault = typechain.Vault__factory.connect(ob.address);
  const decimals = (await vault.connect(signer).decimals()).toString();
  const underlyingAddress = await vault.connect(signer).underlying();
  const underlying = typechain.MockUnderlyingToken__factory.connect(underlyingAddress);
  const amountInFixed = ethers.utils.parseUnits(ob.amount, decimals).toBigInt();

  try {
    handleStep && handleStep('Please sign the Approve Transaction', MODAL_STEP.PROCESSING);
    const tx = await underlying.connect(signer).approve(vault.target, amountInFixed);
    handleStep && handleStep("Waiting for transaction's confirmation", MODAL_STEP.PROCESSING);
    await provider.waitForTransaction(tx.hash, 1);
    return true;
  } catch (error) {
    handleStep && handleStep('Approval Failed!', MODAL_STEP.FAILED);
    return false;
  }
};

export const depositBalance = async (
  ob: { amount: string; address: string },
  handleStatus?: (content: string, status: MODAL_STEP) => void,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner() as any;
  const vault = typechain.Vault__factory.connect(ob.address);
  const decimals = (await vault.connect(signer).decimals()).toString();
  const amountInFixed = ethers.utils.parseUnits(ob.amount, decimals).toBigInt();

  try {
    handleStatus && handleStatus('Please sign the transaction to have a deposit order', MODAL_STEP.PROCESSING);
    const tx = await vault.connect(signer).newDepositOrder(amountInFixed);
    handleStatus && handleStatus("Waiting for transaction's confirmation", MODAL_STEP.PROCESSING);
    await provider.waitForTransaction(tx.hash, 1);
    return tx;
  } catch (error) {
    handleStatus && handleStatus('Canceled deposit order!', MODAL_STEP.FAILED);
  }
  return null;
};

export const withdrawStake = async (
  ob: { amount: string; address: string },
  handleStatus?: (content: string, status: MODAL_STEP) => void,
) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner() as any;
  const vault = typechain.Vault__factory.connect(ob.address);
  const decimals = (await vault.connect(signer).decimals()).toString();
  const amountInFixed = ethers.utils.parseUnits(ob.amount, decimals).toBigInt();

  try {
    handleStatus && handleStatus('Please sign the Order A Withdraw Transaction', MODAL_STEP.PROCESSING);
    const tx = await vault.connect(signer).newWithdrawOrder(amountInFixed);
    handleStatus && handleStatus("Waiting for transaction's confirmation", MODAL_STEP.PROCESSING);
    await provider.waitForTransaction(tx.hash, 1);
    return tx;
  } catch (error) {
    handleStatus &&
      handleStatus(
        'You canceled withdraw order or you do not have enough shares to withdraw because of your before withdraw order!',
        MODAL_STEP.FAILED,
      );
  }
  return null;
};

export const getHistoricalData = async (
  vaultAdd: string,
  currentChain: ChainType,
): Promise<{ historicalData: HistoricalData }> => {
  let provider: JsonRpcProvider;
  switch (currentChain) {
    case ChainType.ETHER:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      break;

    case ChainType.BSC:
      provider = new ethers.providers.JsonRpcProvider(ChainList.bsc.rpc[0]);
      break;

    default:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      break;
  }
  // console.log(`provider ${provider}`);
  // debugger

  // console.debug('vaultAdd: ', vaultAdd);
  // console.debug('typechain.Vault__factory.abi: ', typechain.Vault__factory.abi);
  // console.debug('provider: ', provider);
  // const vault = new ethers.Contract(vaultAdd, typechain.Vault__factory.abi, provider);
  const vault = typechain.Vault__factory.connect(vaultAdd, provider as any);
  // console.debug('vault: ', vault);
  const decimals = (await vault.decimals()).toString();
  // console.debug(`vaultAdd ${vaultAdd}`);
  const nextTimeRebalance: any = (await vault.nextTimeAbleToRebalance()).toString();
  const historicalData = await vault.getHistoricalData();
  let historical: HistoricalData = {
    nextTimeRebalance: `${nextTimeRebalance * 1000}`,
    // maxApr: '',
    // maxTvl: '',
    // maxSharePrice: '',
    aprData: [],
    tvlData: [],
    sharePriceData: [],
  };

  if (historicalData.length > 0) {
    let previousSharePrice: any = historicalData[0][1].toString();
    let previousTimestamp: any = historicalData[0][0].toString();
    historicalData.forEach((e: any, index: number) => {
      const currentSharePrice = e[1].toString();
      const currentTimestamp = e[0].toString();
      let apr = 0;
      if (index > 15) {
        previousSharePrice = historicalData[index - 14][1].toString();
        previousTimestamp = historicalData[index - 14][0].toString();
      }
      // console.log(currentSharePrice);

      if (new Number(currentSharePrice).valueOf() > new Number(previousSharePrice).valueOf()) {
        const priceDiffInSecond = currentSharePrice / previousSharePrice / (currentTimestamp - previousTimestamp);
        apr = priceDiffInSecond * 31556926;
        // console.log(`${currentSharePrice} ${previousSharePrice}`);
        // console.log(apr);
      }
      historical.aprData.push({
        timestamp: `${e[0].toString() * 1000}`,
        value: `${apr}`,
      });
      historical.tvlData.push({
        timestamp: `${e[0].toString() * 1000}`,
        value: new BigNumber(e[2].toString()).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).valueOf(),
      });
      historical.sharePriceData.push({
        timestamp: `${e[0].toString() * 1000}`,
        value: `${currentSharePrice / 10 ** new Number(decimals.toString()).valueOf()}`,
      });
    });
  }
  // console.log(historical);

  return { historicalData: historical };
};

export const getStatisticInfo = async (vaultAdd: string, currentChain: ChainType, account: string) => {
  let provider: JsonRpcProvider;
  switch (currentChain) {
    case ChainType.ETHER:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      break;

    case ChainType.BSC:
      provider = new ethers.providers.JsonRpcProvider(ChainList.bsc.rpc[0]);
      break;

    default:
      provider = new ethers.providers.JsonRpcProvider(ChainList.ether.rpc[0]);
      break;
  }
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum as any);
  }

  // const vault = new ethers.Contract(vaultAdd, typechain.Vault__factory.abi, provider);
  const vault = typechain.Vault__factory.connect(vaultAdd, provider as any);
  const decimals = (await vault.decimals()).toString();
  const tvl = (await vault.underlyingBalanceWithInvestment()).toString();
  const apy = (await vault.calulateAPY()).toString();
  const oneShare = (await vault.getPricePerFullShare()).toString();
  const fmtApy = new BigNumber(apy).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
  const fmtTvl = new BigNumber(tvl).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
  const fmtOneSharePrice = new BigNumber(oneShare).dividedBy(new BigNumber(10).pow(new BigNumber(decimals))).toString();
  let balance: any = '0';
  if (account != '') {
    balance = await getStaked({ acc: account, address: vaultAdd });
    // console.log(balance);

    balance = new BigNumber(balance).multipliedBy(fmtOneSharePrice).toString();
    // console.log(balance);
  }
  return {
    decimal: decimals,
    apy: fmtApy,
    tvl: fmtTvl,
    oneSharePrice: fmtOneSharePrice,
    myBalance: balance,
  };
};

import { useEffect, useState } from 'react';
import { getStatisticInfo } from 'services/walletService';
import { useGetCurrentChain } from 'store/authentication/selector';

export const useStatistic = (address: string, account: string) => {
  const currentChain = useGetCurrentChain();
  const [dataStatistic, setDataStatistic] = useState({
    apy: '0',
    tvl: '0',
    oneSharePrice: '0',
    myBalance: '0',
  });
  // const fetch = async () => {
  //   const data = await getStatisticInfo(address, currentChain, account);
  //   console.log('on statistic');

  //   if (data) {
  //     setDataStatistic(data);
  //   }
  // };
  // useEffect(() => {
  //   fetch();
  // }, [address, account]);

  return {
    fetchStatistic: fetch,
    data: dataStatistic,
  };
};

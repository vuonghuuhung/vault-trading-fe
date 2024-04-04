import { Image } from 'antd';
import { useVaultDetail } from 'components/pages/home/hooks/useVaultDetail';
import useGetTime from 'hooks/getTime/useGetTime';
import { listDescriptionVault } from 'mock/listDescriptionVault';
import { useLocation } from 'react-router';
import SwapIcon from 'resources/svg/SwapIcon';
import { useGetCurrentChain } from 'store/authentication/selector';
import { useGetDepositOrder, useGetHistoricalData, useGetVaultDetail, useGetWithdrawOrder } from 'store/vault/selector';
import { formatCurrency } from 'utils';

const AboutVault = () => {
  const getVaultDetail = useGetVaultDetail();
  const currentChain = useGetCurrentChain();
  const { vault, url, address } = getVaultDetail || {};
  const historicalData = useGetHistoricalData();
  const { remainingHours, remainingSeconds, remainingMinutes } = useGetTime(historicalData?.nextTimeRebalance);
  const depositOrder = useGetDepositOrder();
  const withdrawOrder = useGetWithdrawOrder();

  return (
    <div className='about'>
      <div>
        <p className='about-rebalance'>{`Next time to rebalance: ${remainingHours}:${remainingMinutes}:${remainingSeconds}`}</p>
        <p className='about-next-time'>My pending deposit amount: {formatCurrency(depositOrder, 2)} {vault?.name.split("/")[1]}</p>
        <p className='about-next-time'>My pending withdraw amount: {formatCurrency(withdrawOrder, 2)} shares</p>
        <p className='about-title'>Description</p>
        {listDescriptionVault.map((value) => {
          if (vault && vault.name === value.name) {
            return (
              <p className='about-content' key={value.name}>
                {value.description}
              </p>
            );
          }
        })}
      </div>

      <div className='about-detail'>
        <span>More Info</span>
        <div className='about-swap'>
          <div className='about-from'>
            {/* {tokens[0]}&nbsp;{vaultDetail.apy} */}
            <a href={`${url}`} target='_blank' rel='noopener noreferrer' className='about-detail-btn'>
              View Contract
            </a>
          </div>
          <div className='about-to'>
            {/* {tokens[1]}&nbsp;{vaultDetail.apy} */}
            <a href='https://nestquant.com/' target='_blank' rel='noopener noreferrer' className='about-detail-btn'>
              Tournament Leaderboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutVault;

import { Col, Grid, Row } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import ApyIcon from 'resources/svg/ApyIcon';
import DepositIcon from 'resources/svg/DepositIcon';
import MyBalanceIcon from 'resources/svg/MyBalanceIcon';
import TvlIcon from 'resources/svg/TvlIcon';
import { useGetVaultDetail } from 'store/vault/selector';
import { convertStatistics, formatCurrency } from 'utils';
// import { useStatistic } from '../../hooks/useStatistic';
import { useParams } from 'react-router-dom';
import { useAuthAddress } from 'store/authentication/selector';
import { VaultDetailDTO } from 'components/pages/home/constants';

const { useBreakpoint } = Grid;

// const fmtTVL = convertStatistics('2423952766.52');

const StatisticItem: FC<{
  item: {
    name: string | JSX.Element;
    value: string;
    prefix: string;
    suffix: string;
    className: string;
    icon: JSX.Element;
  };
}> = ({ item }) => {
  return (
    // <Col xl={11} md={24} className={classNames('item-wrapper', item.className)}>
    <div className={classNames('item-wrapper', item.className)}>
      <div className='item'>
        {item.icon}
        <div className='info'>
          <span className='name'>{item.name}</span>
          <span className='value'>
            {item.name != 'APR' ? Number(item.value).toFixed(2) : item.value}
            {item.suffix} {item.prefix}
          </span>
        </div>
      </div>
    </div>
  );
};

interface IVaultDetail {
  apy?: string;
  tvl?: string;
  sharePrice?: string;
  myBalance?: string;
}

const StatisticVault = () => {
  const vaultDetail = useGetVaultDetail();
  const symbolKeysArr = vaultDetail?.vault?.name?.split('/');
  const keySymbol = symbolKeysArr?.pop() || '$';
  const { vaultId } = useParams();
  const vaultAddr = vaultId || vaultDetail?.address || '';
  const currentAddress = useAuthAddress();
  // const { data } = useStatistic(vaultAddr, currentAddress);

  let vault: IVaultDetail = {
    apy: '',
    tvl: '',
    sharePrice: '',
    myBalance: '',
  };
  // console.log(vaultDetail);

  if (vaultDetail) {
    vault.apy = vaultDetail.apy;
    vault.tvl = vaultDetail.tvl;
    vault.sharePrice = vaultDetail.sharePrice;
    vault.myBalance = vaultDetail.myBalance;
  }
  //  else {
  //   vault.apy = data.apy;
  //   vault.tvl = data.tvl;
  //   vault.sharePrice = data.oneSharePrice;
  //   vault.myBalance = data.myBalance;
  // }

  const fmtTVL = convertStatistics(vault.tvl || '0');

  const listStatistic = {
    apy: {
      name: 'APR',
      value: formatCurrency(vault.apy || vaultDetail?.apy || '0', 2) || '0',
      prefix: '',
      suffix: '%',
      className: 'apy',
      icon: <ApyIcon />,
    },
    tvl: {
      name: 'TVL',
      value: fmtTVL.value,
      prefix: keySymbol + ' ',
      suffix: fmtTVL.suffix,
      className: 'tvl',
      icon: <TvlIcon />,
    },
    deposit: {
      name: 'Share Price',
      value: vault.sharePrice || '0',
      prefix: keySymbol + ' ',
      suffix: '',
      className: 'deposit',
      icon: <DepositIcon />,
    },
    myBalance: {
      name: 'My Balance In Vault',
      value: vault.myBalance || vaultDetail?.myBalance || '0',
      prefix: keySymbol + ' ',
      suffix: '',
      className: 'balance',
      icon: <MyBalanceIcon />,
    },
  };
  const { apy, tvl, deposit, myBalance } = listStatistic;

  return (
    <div className='statistic'>
      <div className='item-group'>
        <StatisticItem item={apy} />
        <StatisticItem item={tvl} />
      </div>
      <div className='item-group'>
        <StatisticItem item={deposit} />
        <StatisticItem item={myBalance} />
      </div>
    </div>
  );
};

export default StatisticVault;

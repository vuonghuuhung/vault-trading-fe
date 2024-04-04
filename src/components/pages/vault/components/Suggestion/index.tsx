import { Carousel, Grid, Image } from 'antd';
import classNames from 'classnames';
import { listVault } from 'mock';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import ArrowLeftIcon from 'resources/svg/ArrowLeftIcon';
import RightArrowIcon from 'resources/svg/ArrowRightIcon';
import NoData from 'resources/svg/NoData';
import RightIcon from 'resources/svg/RightIcon';
import { useGetListVault, useGetVaultDetail } from 'store/vault/selector';
import { formatCurrency } from 'utils';

// TODO: suggestion
// const listSuggest = listVault.filter((e) => Number(e.riskEstimation) < 5); //.filter((e, key) => key < 3);

const { useBreakpoint } = Grid;

const SuggestItem: FC<{ item: any; extraClass: boolean }> = ({ item, extraClass }) => {
  return (
    <Link to={`/vault/${item.address}`} className={classNames('item-suggest', { 'limit-width': extraClass })}>
      <div className='general'>
        <div className='img-logo'>
          <Image src={item.vault.img} preview={false} alt='img1' className='img1' width={24} height={24} />
          {/* {!item.vault.img2 ? null : (
            <Image src={item.vault.img2} preview={false} alt='img2' className='img2' width={24} height={24} />
          )} */}
        </div>
        <div className='item-suggest-name'>{item.vault.name.split("/")[0]}</div>
      </div>
      <div className='info-suggest'>
        <div className='info-suggest-detail'>
          <span className='title'>APY</span>
          <span>{formatCurrency(item.apy, 2)}%</span>
        </div>
        <div className='info-suggest-detail'>
          <span className='title'>TVL</span>
          <span>${formatCurrency(item.tvl, 2)}</span>
        </div>
      </div>
    </Link>
  );
};

const Suggestion = () => {
  const screens = useBreakpoint();
  const vaultDetail = useGetVaultDetail();
  const listVaults = useGetListVault();

  const suggestKeysArr = vaultDetail?.vault?.name?.split('/');
  const keySuggest = suggestKeysArr?.pop();
  const listSuggest = listVaults.filter((e) => e.vault.name.includes(keySuggest || ''));

  const slideShow = screens.xl ? 4 : 3;
  const extraClass = listSuggest.length === 1;

  // listSuggest = listVault.filter((e) => Number(e.riskEstimation) < 5).filter((e, key) => key < 5);

  return (
    <div>
      <div className='sug-title'>
        <span>Suggestion</span>
        {listSuggest.length <= 0 ? null : (
          <Link to='/'>
            {'View all'}&nbsp;
            <RightIcon />
          </Link>
        )}
      </div>

      {listSuggest.length <= 0 ? (
        <div className='nodata'>
          <NoData />
          No data
        </div>
      ) : (
        <div className='suggest-wrapper'>
          {screens.lg ? (
            <Carousel
              arrows
              dots={false}
              infinite={false}
              slidesToShow={listSuggest?.length <= slideShow ? listSuggest?.length : slideShow}
              slidesToScroll={slideShow}
              prevArrow={<ArrowLeftIcon />}
              nextArrow={<RightArrowIcon />}
            >
              {listSuggest?.map((item: any) => (
                <SuggestItem item={item} key={item.id} extraClass={extraClass} />
              ))}
            </Carousel>
          ) : (
            <div className='list-suggest-scroll'>
              {listSuggest?.map((item: any) => (
                <SuggestItem item={item} key={item.id} extraClass={extraClass} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Suggestion;

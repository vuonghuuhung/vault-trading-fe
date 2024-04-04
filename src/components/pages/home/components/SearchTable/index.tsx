import { Dispatch, FC, memo, SetStateAction, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { ColumnsType } from 'antd/lib/table';
import type { SorterResult } from 'antd/lib/table/interface';

import type { SearchContainerType } from 'components/SearchContainer';
import TableCommon from 'components/Table';
import ColumnWithSkeleton from 'components/Table/ColumnWithSkeleton';
import useTable from 'hooks/searchContainer/useTable';

import {
  VAULT_FIELDS_TEXT,
  VAULT_SEARCH_PARAMS,
  VAULT_SEARCH_PARAMS_TYPE,
  VaultDetailDTO,
  VaultKey,
} from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import { Image, Tooltip } from 'antd';
import classNames from 'classnames';
import { formatCurrency, isValidStringNumber } from 'utils';
import IconTooltip from 'resources/svg/IconTooltip';
import BigNumber from 'bignumber.js';
import { useVaultActions } from 'store/vault/selector';
import { getUnitValue } from 'utils/wallet';

interface VaultSearchTableType extends Partial<SearchContainerType> {
  total?: number;
  isLoading: boolean;
  dataSource?: VaultDetailDTO[];
  sort?: SorterResult<VaultDetailDTO>;
  searchParams?: VAULT_SEARCH_PARAMS_TYPE;

  setSort?: Dispatch<SetStateAction<SorterResult<VaultDetailDTO>>>;
  setSearchParams?: Dispatch<SetStateAction<VAULT_SEARCH_PARAMS_TYPE>>;
}

const VaultSearchTable: FC<VaultSearchTableType> = ({
  total,
  sort,
  isLoading,
  dataSource,
  searchParams,
  applyingColumns,

  setSort,
  setSearchParams,
}) => {
  // console.log('dataSource: ', dataSource);

  const navigate = useNavigate();
  const { handleSetVaultDetail } = useVaultActions();

  const { handleChangePageParams, handleChangeSortParams } = useTable<VaultDetailDTO, VAULT_SEARCH_PARAMS_TYPE>({
    setSearchParams,
    setSort,
    defaultSearchParams: VAULT_SEARCH_PARAMS,
  });
  let unitValue = '';

  const columns: ColumnsType<VaultDetailDTO> = useMemo(
    () =>
      [
        {
          dataIndex: VaultKey.VAULT,
          width: '25%',
          render: (_value: any, record: VaultDetailDTO) => {
            const { address = '', vault } = record || {};
            unitValue = getUnitValue(vault.name);
            return (
              <Link to={`vault/${address}`} className='vault'>
                <div className='logo'>
                  <Image src={vault.img} preview={false} alt='img1' className='img1' width={24} height={24} />
                  {/* {!vault.img2 ? null : (
                    <Image src={vault.img2} preview={false} alt='img2' className='img2' width={24} height={24} />
                  )} */}
                </div>
                <div className='name'>{vault.name.split('/')[0]}</div>
              </Link>
            );
          },
        },
        {
          dataIndex: VaultKey.APY,
          width: '22.5%',
          sorter: {
            compare: (a: any, b: any) =>
              new BigNumber(a[VaultKey.APY] || 0).minus(new BigNumber(b[VaultKey.APY] || 0)).toNumber(),
          },
          render: (value: VaultDetailDTO[VaultKey.APY], _record: VaultDetailDTO) => {
            return <span>{isValidStringNumber(value) ? `${formatCurrency(value, 2)}%` : '-'}</span>;
          },
        },
        // {
        //   title: () => (
        //     <span className='th-with-tooltip'>
        //       {VAULT_FIELDS_TEXT[VaultKey.RISK]}&nbsp;
        //       <Tooltip placement='bottom' title='Risk estimation is Estimate from volatility and ratio of token hold'>
        //         <span>
        //           <IconTooltip />
        //         </span>
        //       </Tooltip>
        //     </span>
        //   ),
        //   className: 'sorter-with-tooltip',
        //   dataIndex: VaultKey.RISK,
        //   width: '20%',
        //   sorter: {
        //     compare: (a: any, b: any) =>
        //       new BigNumber(a[VaultKey.RISK] || 0).minus(new BigNumber(b[VaultKey.RISK] || 0)).toNumber(),
        //   },
        //   render: (value: VaultDetailDTO[VaultKey.RISK], _record: VaultDetailDTO) => (
        //     <span
        //       className={classNames({
        //         green: Number(value) > 5, // TODO: check risk???
        //         red: true,
        //       })}
        //     >
        //       {/* <Tooltip placement='bottom' title='Risk estimation is Estimate from volatility and ratio of token hold'> */}
        //       {isValidStringNumber(value) ? formatCurrency(value, 2) : '-'}
        //       {/* </Tooltip> */}
        //     </span>
        //   ),
        // },
        {
          title: () => (
            <span className='th-with-tooltip'>
              {VAULT_FIELDS_TEXT[VaultKey.TVL]}&nbsp;
              <Tooltip placement='bottom' title='TVL'>
                <span>
                  <IconTooltip />
                </span>
              </Tooltip>
            </span>
          ),
          className: 'sorter-with-tooltip',
          dataIndex: VaultKey.TVL,
          width: '20%',
          sorter: {
            compare: (a: any, b: any) =>
              new BigNumber(a[VaultKey.TVL] || 0).minus(new BigNumber(b[VaultKey.TVL] || 0)).toNumber(),
          },
          render: (value: VaultDetailDTO[VaultKey.TVL], _record: VaultDetailDTO) => (
            <span>{isValidStringNumber(value) ? `${formatCurrency(value, 2)} ${unitValue}` : '-'}</span>
          ),
        },
        {
          dataIndex: VaultKey.BALANCE,
          width: '20%',
          sorter: {
            compare: (a: any, b: any) =>
              new BigNumber(a[VaultKey.BALANCE] || 0).minus(new BigNumber(b[VaultKey.BALANCE] || 0)).toNumber(),
          },
          render: (value: VaultDetailDTO[VaultKey.BALANCE], _record: VaultDetailDTO) => (
            <span>{isValidStringNumber(value) ? `${formatCurrency(value, 2)} ${unitValue}` : '-'}</span>
          ),
        },
      ].map(({ render, dataIndex, title, ...column }) => ({
        ...column,
        ...(column?.sorter && { sortOrder: sort?.field === dataIndex ? sort.order : 'descend' }),
        title: title || (
          <span className='title-tb-col'>{(VAULT_FIELDS_TEXT as { [key in VaultKey]?: string })[dataIndex]}</span>
        ),
        dataIndex,
        key: dataIndex,
        render: (value: any, record: VaultDetailDTO) => (
          <ColumnWithSkeleton isLoading={isLoading}>
            <div
              className='cursor-pointer'
              onClick={() => {
                handleSetVaultDetail({ detailVault: record });
                navigate(`vault/${record.address}`);
              }}
            >
              {render(value, record)}
            </div>
          </ColumnWithSkeleton>
        ),
      })),
    [sort, isLoading, dataSource],
  );

  return (
    <TableCommon<VaultDetailDTO>
      
      current={searchParams?.page || VAULT_SEARCH_PARAMS.page}
      pageSize={searchParams?.limit || VAULT_SEARCH_PARAMS.limit}
      onChangePagination={handleChangePageParams}
      onChange={handleChangeSortParams}
      total={total || dataSource?.length}
      dataSource={dataSource}
      columns={columns}
      rowKey='index'
      tableLayout='fixed'
      scroll={{ x: 1300 }}
      noData={'No Data'}
      showPagination={false}
    />
  );
};

export default memo(VaultSearchTable);

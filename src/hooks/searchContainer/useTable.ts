import type { Dispatch, SetStateAction } from 'react';

import type { TablePaginationConfig } from 'antd';
import type { FilterValue, SorterResult, SortOrder } from 'antd/lib/table/interface';
import type { SORT_PARAMS } from 'constant';

import { getSortDirection } from 'utils';

const useTable = <T, P extends SORT_PARAMS>({
  setSearchParams,
  setSort,
  defaultSearchParams,
}: {
  setSearchParams?: Dispatch<SetStateAction<P>>;
  setSort?: Dispatch<SetStateAction<SorterResult<T>>>;
  defaultSearchParams: P;
}) => {
  const handleChangePageParams = (page: string | number, pageSize: number) => {
    if (setSearchParams) {
      setSearchParams((prevState) => ({ ...prevState, limit: pageSize, page: Number(page) }));
    }
  };

  const handleChangeSortParams = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<T> | SorterResult<T>[],
  ) => {
    if (Array.isArray(sorter)) return;

    const { order, field } = (sorter as { order: SortOrder; field: string }) || {};

    setSort && setSort(sorter);

    if (setSearchParams) {
      if (order) {
        setSearchParams((prevState) => ({
          ...defaultSearchParams,
          ...prevState,
          sort: { [field]: getSortDirection(order) },
        }));
      } else {
        setSearchParams((prevState) => {
          delete prevState.sort;
          return { ...prevState };
        });
      }
    }
  };

  return {
    handleChangePageParams,
    handleChangeSortParams,
  };
};

export default useTable;

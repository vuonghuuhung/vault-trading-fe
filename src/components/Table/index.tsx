import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { Empty, Pagination, Table } from 'antd';
import type { TablePaginationConfig, TableProps } from 'antd/lib/table';
import type { TableRowSelection } from 'antd/lib/table/interface';

import { PAGE_SIZE_DEFAULT, PAGE_SIZE_OPTIONS } from 'constant';
import NoData from 'resources/svg/NoData';

export type AlignType = 'left' | 'center' | 'right';

type TableType = {
  current?: number;
  pageSize?: number;
  total?: number;
  pageSizeOptions?: string[];
  onChangePagination?: (pageNum: string | number, pageSize: number) => void;
  pagination?: false | TablePaginationConfig;
  showPagination?: boolean;
  noDataImage?: ReactNode;
  noData?: string;
  emptyText?: string;
  rowSelection?: TableRowSelection<any> | undefined;
};

function TableCommon<T>({
  current = 0,
  pageSize = 0,
  total = 0,
  pageSizeOptions = [],
  onChangePagination,
  showPagination = true,
  pagination,
  noDataImage = <NoData />,
  noData = 'common.no_data',
  emptyText,
  ...props
}: TableProps<T> & TableType) {
  const { t } = useTranslation();

  return (
    <>
      <Table
        locale={{ emptyText: <Empty image={noDataImage} description={emptyText || t(noData)} /> }}
        pagination={false}
        showSorterTooltip={false}
        {...props}
      />
      {showPagination && (
        <Pagination
          size='small'
          total={total ? total : 1}
          current={current}
          onChange={onChangePagination}
          pageSizeOptions={PAGE_SIZE_OPTIONS}
          pageSize={pageSize ?? PAGE_SIZE_DEFAULT}
          showSizeChanger
        />
      )}
    </>
  );
}

export default TableCommon;

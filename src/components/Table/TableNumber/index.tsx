import type { FC } from 'react';

import NumberFormat from 'components/NumberFormat';

type ITableNumber = {
  value: string | number | null | undefined;
  displayedValue: string | number;
  decimalScale?: number;
  suffix?: string;
  displayType?: string;
  className?: string;
};

const TableNumber: FC<ITableNumber> = ({
  value,
  decimalScale = 0,
  suffix = '',
  displayType = 'text',
  displayedValue,
  className,
}) => {
  return value && Number(value) ? (
    <NumberFormat
      className={className}
      thousandSeparator
      displayType={displayType}
      value={displayedValue}
      decimalScale={decimalScale}
      suffix={suffix}
    />
  ) : (
    <>--</>
  );
};

export default TableNumber;

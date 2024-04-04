import { FC, useMemo } from 'react';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

import { Tooltip } from 'antd';
import BigNumber from 'bignumber.js';

import { trimTrailingZero } from 'components/NumberFormat/utils';

const MAX_NUMBER_LENGTH = 12;
const MAX_TOOLTIP_DECIMALS = 9;
BigNumber.config({ EXPONENTIAL_AT: 100 });

const calculateMaxLength = (a: number, b: number) => {
  return a > b ? a : b;
};

type FormattedNumber = NumericFormatProps & { amount: string | number; decimals?: number };

const FormattedNumber: FC<FormattedNumber> = ({ amount, decimals = 0, ...props }) => {
  const { formattedValue, tooltipAmount } = useMemo(() => {
    const bigNumberAmount = new BigNumber(amount);
    const integerValue = bigNumberAmount.integerValue(BigNumber.ROUND_DOWN).toString();

    return {
      formattedValue: trimTrailingZero(
        //If integer value length bigger than max length, slice that number and show tooltip, otherwise return full number
        integerValue.length >= MAX_NUMBER_LENGTH
          ? integerValue.slice(0, MAX_NUMBER_LENGTH)
          : bigNumberAmount.toString().slice(
              0,
              //Slice equal numbers of integers + '.' + decimals. But max length cannot pass MAX_NUMBER_LENGTH
              calculateMaxLength(decimals && integerValue.length + 1 + decimals, MAX_NUMBER_LENGTH),
            ),
      ),
      tooltipAmount: trimTrailingZero(
        bigNumberAmount.toFixed(calculateMaxLength(decimals, MAX_TOOLTIP_DECIMALS)).toString(),
      ),
    };
  }, [amount, decimals]);

  return formattedValue?.length < tooltipAmount?.length ? (
    <Tooltip title={<NumericFormat displayType='text' value={tooltipAmount} {...props} />}>
      <span>
        <NumericFormat
          displayType='text'
          value={formattedValue}
          suffix={`... ${props?.suffix ? props.suffix : null}`}
          thousandSeparator
          {...props}
        />
      </span>
    </Tooltip>
  ) : (
    <NumericFormat displayType='text' value={formattedValue} thousandSeparator {...props} />
  );
};

export default FormattedNumber;

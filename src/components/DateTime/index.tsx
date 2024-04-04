import type { FC } from 'react';

import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';

import { DATE_FORMAT, TIME_FORMAT } from 'constant';

const DateTime: FC<{ value?: string }> = ({ value }) =>
  value ? (
    <>
      {format(parseISO(value), DATE_FORMAT)}
      <br />
      {format(parseISO(value), TIME_FORMAT)}
    </>
  ) : null;

export default DateTime;

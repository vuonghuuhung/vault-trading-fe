import type { FC } from 'react';
import { ControllerRenderProps, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import generatePicker from 'antd/es/date-picker/generatePicker';
import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';

import { DEFAULT_SEARCH_DATE_FORMAT } from 'constant';

const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

import type { PickerProps } from 'antd/lib/date-picker/generatePicker';

import CalendarIcon from 'resources/svg/CalendarIcon';

interface IFormDatePicker {
  field?: ControllerRenderProps<any, string>;
  onChange?: (value: Date | null) => void;
}

const FormDatePicker: FC<PickerProps<Date> & IFormDatePicker> = ({
  field,
  onChange,
  placeholder = 'common.select_date',
  ...props
}) => {
  const { t } = useTranslation();

  const { trigger } = useFormContext();
  const handleChange = (value: Date | null) => {
    field?.onChange(value);
    trigger(field?.name);
    if (onChange) onChange(value);
  };

  return (
    <DatePicker
      inputReadOnly
      format={DEFAULT_SEARCH_DATE_FORMAT}
      placeholder={t(placeholder) as string}
      {...field}
      {...props}
      onChange={handleChange}
      suffixIcon={<CalendarIcon />}
    />
  );
};

export default FormDatePicker;

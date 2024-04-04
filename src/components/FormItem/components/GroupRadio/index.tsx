import type { FC } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';

import Radio, { RadioChangeEvent, RadioGroupProps } from 'antd/lib/radio';

interface IFormCheckbox {
  field?: ControllerRenderProps<any, string>;
  onChange?: (event: RadioChangeEvent) => void;
}

const FormRadioGroup: FC<RadioGroupProps & IFormCheckbox> = ({ field, onChange, ...props }) => {
  const handleChange = (e: RadioChangeEvent) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  return <Radio.Group onChange={handleChange} {...props} />;
};

export default FormRadioGroup;

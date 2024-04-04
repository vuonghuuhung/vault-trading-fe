import { ChangeEvent, FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Checkbox, Select, SelectProps, Typography } from 'antd';
import type { CheckboxChangeEvent } from 'antd/lib/checkbox';
import cx from 'classnames';
import { noop } from 'lodash';

import { ALL_OPTIONS } from 'constant';
import IconDropdown from 'resources/svg/IconDropdown';

const { Option } = Select;
const { Paragraph, Text } = Typography;

type OptionType = {
  value: any;
  name: any;
};

type InfinityScrollType = {
  loader?: ReactNode;
  hasMore?: boolean;
  dataLength?: number;
  next?: () => any;
  infinityClassName?: string;
  isInfinityScroll?: boolean;
};

type ISelectInput = {
  field?: ControllerRenderProps<any, string>;
  options: OptionType[];
  prefix?: ReactNode;
  className?: string;
  suffixIcon?: ReactNode;
  optionsType?: 'checkbox' | 'infinityScroll';
  enableAllOption?: boolean;
  showTooltip?: boolean;

  optionsRenderProps?: (item: OptionType) => any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SelectInput: FC<SelectProps<any, OptionType> & ISelectInput & InfinityScrollType> = ({
  field,
  options,
  prefix,
  className,
  optionsType,
  enableAllOption,
  suffixIcon = <IconDropdown />,
  showTooltip = false,

  // Infinity Props
  next = noop,
  loader,
  hasMore = false,
  children,
  dataLength = 10,
  infinityClassName,
  isInfinityScroll = false,

  onChange,
  optionsRenderProps,

  ...props
}) => {
  const { t } = useTranslation();

  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);
  const { value } = field || {};

  const optionsValue =
    enableAllOption && optionsType !== 'checkbox' && options.length > 1
      ? [
          {
            value: ALL_OPTIONS,
            name: 'common.all',
          },
        ].concat(options)
      : options;

  useEffect(() => {
    setIndeterminate(!!value && value.length > 0 && value.length < optionsValue.length);
    setCheckAll(!!value && value.length > 0 && value.length === optionsValue.length);
  }, [value]);

  const onCheckAllOptions = (event: CheckboxChangeEvent) => {
    const { checked } = event.target;

    let values = [];
    if (checked) {
      values = optionsValue.map((option) => option.value);
    } else {
      values = [];
    }
    setIndeterminate(false);
    setCheckAll(checked);
    onChangeSelect(values);
  };

  const optionsSelectAllRender = () => {
    switch (optionsType) {
      case 'checkbox': {
        return (
          <Checkbox onChange={onCheckAllOptions} id={ALL_OPTIONS} indeterminate={indeterminate} checked={checkAll}>
            {t('common.all')}
          </Checkbox>
        );
      }
      default: {
        return null;
      }
    }
  };

  const renderInfinityScroll = (menu: ReactNode) => {
    return (
      <div style={{ maxHeight: '200px', position: 'relative' }}>
        <InfiniteScroll
          next={next}
          loader={loader}
          hasMore={hasMore}
          dataLength={dataLength}
          className={infinityClassName}
          scrollThreshold='0.7'
          height={200}
          {...props}
        >
          {menu}
        </InfiniteScroll>
      </div>
    );
  };

  const optionsRender = (item: OptionType) => {
    switch (optionsType) {
      case 'checkbox': {
        return (
          <Checkbox id={item.value} checked={value && value.indexOf(item.value) >= 0}>
            <div onClick={onPreventMouseDown}>
              {optionsRenderProps && item?.value !== ALL_OPTIONS ? (
                optionsRenderProps(item)
              ) : showTooltip ? (
                <Text ellipsis={{ tooltip: item.name }}>{item.name}</Text>
              ) : (
                t(item.name)
              )}
            </div>
          </Checkbox>
        );
      }

      default: {
        return optionsRenderProps && item?.value !== ALL_OPTIONS ? optionsRenderProps(item) : t(item.name);
      }
    }
  };

  const onPreventMouseDown = (event: SyntheticEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const onChangeSelect = (val: any) => {
    field?.onChange(val);
    if (onChange) onChange(val);
  };

  return (
    <div className={cx('ant-select-wrapper', className)}>
      {prefix}

      <Select
        {...field}
        onChange={onChangeSelect}
        getPopupContainer={(trigger) => trigger.parentElement}
        notFoundContent={null}
        suffixIcon={suffixIcon}
        dropdownRender={(menu) => (
          <>
            {enableAllOption && optionsValue.length > 1 && optionsSelectAllRender()}
            {isInfinityScroll ? renderInfinityScroll(menu) : menu}
          </>
        )}
        {...props}
      >
        {optionsValue.map((item) => (
          <Option value={item.value} key={item.value} label={item.name}>
            {optionsRender(item)}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default SelectInput;

import type React from 'react';
import type { ControllerRenderProps } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Input } from 'antd';
import type { SearchProps } from 'antd/lib/input';

import { LENGTH_CONSTANTS } from 'constant';
import IconSearch from 'resources/svg/IconSearch';

const { Search } = Input;

interface ISearchInput {
  field?: ControllerRenderProps<any, string>;
  onBlur?: () => void;
  onSearch?: () => void;
  onChange?: () => void;
}

const SearchInput: React.FC<SearchProps & ISearchInput> = ({
  field,
  onBlur,
  onSearch,
  onChange,
  placeholder = '',
  ...props
}) => {
  const { t } = useTranslation();

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (e.target.value.trim() !== field?.value) field?.onChange(e.target.value.trim());

    field?.onBlur();
    if (onBlur) onBlur();
  };

  const handleSearch = (
    value: string,
    e?: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    e?.preventDefault();

    field?.onChange(value.trim());

    if (onSearch) onSearch();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    field?.onChange(e);
    if (onChange) onChange(e);
  };

  return (
    <Search
      maxLength={LENGTH_CONSTANTS.MAX_LENGTH_INPUT}
      {...field}
      enterButton={<IconSearch />}
      {...props}
      onSearch={handleSearch}
      onBlur={handleBlur}
      onChange={handleOnChange}
      placeholder={placeholder as string}
    />
  );
};

export default SearchInput;

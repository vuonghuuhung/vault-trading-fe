import { Dispatch, FC, memo, SetStateAction } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Checkbox, Radio, Space } from 'antd';
import { debounce } from 'lodash';

import FormItem from 'components/FormItem';
import SearchInput from 'components/FormItem/components/SearchInput';
import type { SearchContainerType } from 'components/SearchContainer';
import useSearchBar from 'hooks/searchContainer/useSearchBar';

import FormRadioGroup from 'components/FormItem/components/GroupRadio';
import { SEARCH_TIME } from 'constant';
import HoldingIcon from 'resources/svg/HoldingIcon';
import { FORM_DEFAULT_VALUE, VAULT_SEARCH_PARAMS_TYPE, VaultKey, VaultType } from './../../constants';

interface VaultSearchBarType extends Partial<SearchContainerType> {
  setSearchParams?: Dispatch<SetStateAction<VAULT_SEARCH_PARAMS_TYPE>>;
}

const VaultSearchBar: FC<VaultSearchBarType> = ({ searchParams, setSort, setSearchParams }) => {
  const { t } = useTranslation();

  const { resetForm, onSubmit, formContext } = useSearchBar<VAULT_SEARCH_PARAMS_TYPE>({
    defaultValue: searchParams || FORM_DEFAULT_VALUE,
    setSort,
    setSearchParams,
  });

  const { setValue, getValues } = formContext;

  const debounceSearch = debounce(() => {
    setValue(VaultKey.KEYWORD, getValues()[VaultKey.KEYWORD].trim());
    onSubmit();
  }, SEARCH_TIME);

  const vaultTypeList = [
    {
      label: 'All',
      value: VaultType.ALL,
    },
    {
      label: 'Swap',
      value: VaultType.STABLE,
    },
    {
      label: 'LP',
      value: VaultType.LP,
    },
    // {
    //   label: <span className='single'>Single Token</span>,
    //   value: VaultType.SINGLE,
    // },
    // {
    //   label: (
    //     <span className='holding'>
    //       Holdings <HoldingIcon />
    //     </span>
    //   ),
    //   value: VaultType.HOLDING,
    // },
  ];

  return (
    <div className='form-container nft-list__form'>
      <FormProvider {...formContext}>
        <form autoComplete='off'>
          <FormItem name={VaultKey.TYPE}>
            <FormRadioGroup
              defaultValue={FORM_DEFAULT_VALUE[VaultKey.TYPE]}
              onChange={(e) => onSubmit()}
              options={vaultTypeList}
              optionType='button'
            ></FormRadioGroup>
          </FormItem>
          <FormItem name={VaultKey.KEYWORD}>
            <SearchInput
              placeholder='Search...'
              onSearch={onSubmit}
              style={{
                minWidth: '314px',
              }}
              onChange={debounceSearch}
            />
          </FormItem>
        </form>
      </FormProvider>
    </div>
  );
};

export default memo(VaultSearchBar);

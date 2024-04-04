import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

export const SEARCH_PANEL_KEY = '1';

const useSearchBar = <T>({
  defaultValue,
  setSort,
  setSearchParams,
}: {
  defaultValue: any;
  setSort?: Dispatch<any>;
  setSearchParams?: Dispatch<SetStateAction<T>>;
}) => {
  const [activeKey, setActiveKey] = useState<string[]>([]);

  const formContext = useForm({
    defaultValues: defaultValue,
  });
  const { handleSubmit, reset } = formContext;

  const toggleFilter = () => {
    setActiveKey((activeKey) => (activeKey.length > 0 ? [] : [SEARCH_PANEL_KEY]));
  };

  const resetForm = () => {
    reset(defaultValue);
    setSort && setSort({});
  };

  const onSubmit = () => {
    handleSubmit((searchParams: T) => {
      setSearchParams && setSearchParams({ ...searchParams });
    })();
  };

  return {
    resetForm,
    onSubmit,
    formContext,
    toggleFilter,
    activeKey,
  };
};

export default useSearchBar;

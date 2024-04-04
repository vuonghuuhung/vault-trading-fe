import { Button } from 'antd';
import { SorterResult } from 'antd/lib/table/interface';
import SearchContainer from 'components/SearchContainer';
import SearchBar from 'components/pages/home/components/SearchBar';
import SearchTable from 'components/pages/home/components/SearchTable';
import {
  FORM_DEFAULT_VALUE,
  VAULT_SEARCH_PARAMS_TYPE,
  VaultDetailDTO,
  VaultKey,
} from 'components/pages/home/constants';
import { useVaultList } from 'components/pages/home/hooks/useVaultList';
import ModalStep, { MODAL_STEP } from 'components/pages/vault/components/ModalStep';
import { ROUTE_URL } from 'constant';
import { useEffect, useState } from 'react';
import { LoaderFunction, Outlet, useLoaderData, useMatch, useMatches } from 'react-router-dom';
import { useGetCurrentChain } from 'store/authentication/selector';
import { ChainType } from 'store/authentication/useAuthenticationStore';
import { useGetListVault } from 'store/vault/selector';

// type LoaderData = {
//   data: VaultDetailDTO[];
//   network: ChainType;
// };

const Home = () => {
  // const { data: loaderVaults, network: loaderNetwork } = (useLoaderData() as LoaderData) || {};
  const [sort, setSort] = useState<SorterResult<any>>({});
  const [searchParams, setSearchParams] = useState<VAULT_SEARCH_PARAMS_TYPE>(FORM_DEFAULT_VALUE);
  const [dataSrc, setDataSrc] = useState<VaultDetailDTO[]>([]);

  const listVaults = useGetListVault();
  const currentChain = useGetCurrentChain();

  const matches = useMatch(ROUTE_URL.HOME);
  const { getVaultList, loading, content, step, resetModalStep } = useVaultList(currentChain);

  // useEffect(() => {
  //   console.log(`listVaults change`);
  //   console.log(listVaults);
  // }, [listVaults]);

  // mock data
  const data = {
    total: listVaults.length || 0,
    dataSource: listVaults.filter((e) =>
      e.vault.name.toLocaleLowerCase().includes(searchParams[VaultKey.KEYWORD]?.trim()?.toLocaleLowerCase() || ''),
    ),
    isLoading: loading,
  };

  const { total, dataSource, isLoading } = data;

  return (
    <div>
      {!matches ? (
        <Outlet />
      ) : (
        <div className='homepage'>
          <div className='title'>Vaults</div>
          <div className='content'>
            <SearchContainer
              sort={sort}
              searchParams={searchParams}
              setSort={setSort}
              setSearchParams={setSearchParams}
            >
              <SearchBar searchParams={searchParams} setSort={setSort} setSearchParams={setSearchParams} />
              <SearchTable total={total} dataSource={dataSource} isLoading={isLoading} />
            </SearchContainer>
          </div>
        </div>
      )}
      <ModalStep
        open={step !== MODAL_STEP.READY}
        step={step}
        onClose={step !== MODAL_STEP.PROCESSING ? resetModalStep : undefined}
        showClose={step !== MODAL_STEP.PROCESSING}
        closable={step !== MODAL_STEP.PROCESSING}
        content={content}
      />
    </div>
  );
};

// export const loader: LoaderFunction = async () => {
//   const { getVaultList } = useVaultList();
//   const currentChain = useGetCurrentChain();
//   const data = await getVaultList(currentChain);

//   return { data };
// };

export default Home;

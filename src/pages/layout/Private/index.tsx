import type { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { Grid, Layout } from 'antd';

import { DEFAULT_PAGE, ROUTE_URL } from 'constant';

import LayoutContent from './Content';
import Header from './Header';
import PrivateSider from './Sider';

const { useBreakpoint } = Grid;
const PrivateLayout: FC<{}> = () => {
  const location = useLocation();
  const isHome = location.pathname === ROUTE_URL.HOME;
  const screens = useBreakpoint();

  return (
    <Layout className='app-layout'>
      <PrivateSider />
      <Layout className='app-content-layout'>
        <Header />
        {/* <LayoutContent>{isHome ? <Navigate to={DEFAULT_PAGE} /> : <Outlet />}</LayoutContent> */}
        <LayoutContent>
          <Outlet />
        </LayoutContent>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;

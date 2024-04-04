import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTE_URL } from 'constant';
import Home from 'pages/home'; // { loader as ListVaultLoader }
import PrivateLayout from 'pages/layout/Private';
import VaultDetail from 'pages/vault/[vaultId]';
import HomeIcon from 'resources/svg/HomeIcon';
import DocsIcon from 'resources/svg/DocsIcon';
import NotFoundPage from 'pages/NotFoundPage';

export const menuList = [
  {
    text: 'Home',
    link: ROUTE_URL.HOME,
    key: 'home',
    icon: <HomeIcon />,
  },
  {
    text: 'Docs',
    link: ROUTE_URL.DOCS,
    key: 'docs',
    target: '_blank',
    icon: <DocsIcon />,
  },
];

const routes = [
  {
    path: ROUTE_URL.HOME,
    element: <PrivateLayout />,
    // loader: ListVaultLoader,
    children: [
      {
        path: ROUTE_URL.HOME,
        element: <Home />,
        children: [
          {
            path: `vault/:vaultId`,
            element: <VaultDetail />,
            // loader: detailVaultLoader
          },
        ],
      },

      // {
      //   path: '',
      //   element: <PrivateLayout />,
      //   children: [
      //     {
      //       path: ROUTE_URL.DASHBOARD,
      //       element: <DashboardPage />,
      //       // loader: DashboardLoader,
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   path: '*',
  //   element: <Navigate to={ROUTE_URL.HOME} />,
  // },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const router = createBrowserRouter(routes);

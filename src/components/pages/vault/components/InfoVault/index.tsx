import type { FC } from 'react';

import { Tabs } from 'antd';
import { VaultInfoTabs } from '../../constants';
import AboutVault from '../AboutVault';
import HistoricalDashboard from '../HistoricalDashboard';

const InfoVault: FC = () => {
  const items = [
    {
      label: VaultInfoTabs.about.name,
      key: VaultInfoTabs.about.key,
      children: <AboutVault />,
    },
    {
      label: VaultInfoTabs.historical.name,
      key: VaultInfoTabs.historical.key,
      children: <HistoricalDashboard />,
    }
    // {
    //   label: VaultInfoTabs.risk.name,
    //   key: VaultInfoTabs.risk.key,
    //   children: <HistoricalDashboard />,
    // },
  ];

  return (
    <div className='info-vault'>
      <div className='tab-wrapper'>
        <Tabs
          //   activeKey={VaultInfoTabs.about.key}
          items={items}
          className='app-tabs'
          // destroyInactiveTabPane
        />
      </div>
    </div>
  );
};

export default InfoVault;

import { Tabs } from 'antd';
import { SwapTabs } from '../../constants';
import Deposit from '../Deposit';
import Withdraw from '../Withdraw';

const Swap = () => {
  const items = [
    {
      label: SwapTabs.deposit.name,
      key: SwapTabs.deposit.key,
      children: <Deposit />,
    },
    {
      label: SwapTabs.withdraw.name,
      key: SwapTabs.withdraw.key,
      children: <Withdraw />,
    },
  ];

  return (
    <div className='swap-vault'>
      <div className='swap-tab-wrapper'>
        <Tabs items={items} className='app-tabs' centered destroyInactiveTabPane />
      </div>
    </div>
  );
};

export default Swap;

import { Button, Drawer } from 'antd';
import { useState } from 'react';

import CloseDrawerIcon from 'resources/svg/CloseIcon';
import MenuIcon from 'resources/svg/MenuIcon';

import { Link, useLocation } from 'react-router-dom';
import { menuList } from 'routes';
import classNames from 'classnames';
import ConnectWallet from 'components/ConnectButon';

const MenuDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen((open) => !open);

  // console.log('open', open);

  const { pathname } = useLocation();

  return (
    <div className='drawer'>
      <div className='header'>
        <Button className='menu-btn' htmlType='button' onClick={toggleDrawer}>
          {open ? <CloseDrawerIcon /> : <MenuIcon />}
        </Button>
      </div>
      {open && (
        <div className='menu'>
          <ConnectWallet showDropdown={false} />
          {menuList.map((item) => {
            return (
              <Link
                to={item.link}
                key={item.key}
                target={item.target}
                className={classNames('menu-item', { active: item.link === pathname })}
              >
                {item.icon}
                <span>{item.text}</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuDrawer;

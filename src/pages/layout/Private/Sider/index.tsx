import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Grid, Image, Layout, Menu } from 'antd';
import classNames from 'classnames';
import LogoFull from 'resources/svg/logoName.svg';

import { ROUTE_URL } from 'constant';
import DocsIcon from 'resources/svg/DocsIcon';
import HomeIcon from 'resources/svg/HomeIcon';
import TwitterIcon from 'resources/svg/TwitterIcon';
import DiscordIcon from 'resources/svg/DiscordIcon';
import MediumIcon from 'resources/svg/MediumIcon';
import TelegramIcon from 'resources/svg/TelegramIcon';

const { Sider } = Layout;

type SiderType = {};

const { useBreakpoint } = Grid;

const PrivateSider: FC<SiderType> = () => {
  const location = useLocation();

  const screens = useBreakpoint();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleToggleCollapse = () => setCollapsed((collapse) => !collapse);

  const SIDE_BAR_ITEMS = [
    {
      key: ROUTE_URL.HOME,
      label: <Link to={ROUTE_URL.HOME}>Home</Link>,
      icon: <HomeIcon />,
      // children: [],
    },
    {
      key: ROUTE_URL.DOCS,
      icon: <DocsIcon />,
      label: (
        <Link to={ROUTE_URL.DOCS} target='_blank'>
          Docs
        </Link>
      ),
    },
  ];

  const CONTACTS = [
    {
      key: 'twitter',
      link: 'https://twitter.com/NestQuantANN',
      icon: <TwitterIcon />,
    },
    {
      key: 'discord',
      link: 'https://discord.com/invite/Nqv3pXBpCu',
      icon: <DiscordIcon />,
    },
    {
      key: 'medium',
      link: 'https://medium.com/@nestquant',
      icon: <MediumIcon />,
    },
    {
      key: 'telegram',
      link: 'https://t.me/NestQuantAnnou',
      icon: <TelegramIcon />,
    },
  ];

  useEffect(() => {
    for (const { key: parentKey } of SIDE_BAR_ITEMS) {
      if (parentKey === location.pathname) {
        setOpenKeys([]);
        setSelectedKeys([parentKey]);
        break;
      }
    }
  }, [location.pathname]);

  return (
    <Sider className='app-sider' width={310} hidden={!screens.lg} collapsible collapsed={collapsed}>
      <div>
        <div
          className={classNames('app-sider__top', {
            'justify-content-center': collapsed,
            'justify-content-between': !collapsed,
          })}
        >
          <Image preview={false} src={LogoFull} alt='logo' />
        </div>
        <Menu
          className='app-sider__menu'
          mode='inline'
          items={SIDE_BAR_ITEMS}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={setOpenKeys}
        />
      </div>

      <div className='contact'>
        <div className='text'>Contact us:</div>
        <div className='items'>
          {CONTACTS.map((e) => {
            return (
              <a key={e.key} href={e.link} className='item' target='_blank'>
                {e.icon}
              </a>
            );
          })}
        </div>
      </div>
    </Sider>
  );
};

export default PrivateSider;

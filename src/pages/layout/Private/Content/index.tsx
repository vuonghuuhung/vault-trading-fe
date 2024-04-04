import type { ReactNode } from 'react';

import { Layout } from 'antd';

const { Content } = Layout;

const LayoutContent = ({ children }: { children: ReactNode }) => {
  return <Content className='app-content'>{children}</Content>;
};

export default LayoutContent;

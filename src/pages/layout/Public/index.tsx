import Header from 'components/Header';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';

const PublicLayout: FC<{}> = () => {
  return (
    <div className='container'>
      {/* <Header /> */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;

import { LoaderFunction, useNavigate } from 'react-router-dom';

import { Button } from 'antd';
import Cookies from 'js-cookie';

import { ROUTE_URL } from 'constant';

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    // console.log('handleDisconnect');
    Cookies.remove('authToken');
    navigate(ROUTE_URL.LOGIN);
  };
  return (
    <div className='dashboard-page'>
      <h1>Dashboard</h1>
      <Button onClick={handleDisconnect} type='primary'>
        Disconnect
      </Button>
    </div>
  );
};

export const loader: LoaderFunction = async () => {
  return {};
};

export default DashboardPage;

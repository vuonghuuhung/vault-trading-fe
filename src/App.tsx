import { withTranslation } from 'react-i18next';
import { RouterProvider, BrowserRouter } from 'react-router-dom';
import { ChainType } from 'store/authentication/useAuthenticationStore';
import { ConfigProvider } from 'antd';
import { router } from 'routes';
import { customTheme } from 'theme';
import Maintenance from 'pages/maintenance';

// import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

function App() {
  
  var maintenance = import.meta.env.VITE_MAINTENANCE;
  return (
    // <ConfigProvider theme={customTheme}>
    <>
      {
        maintenance == "true" ? 
        <Maintenance /> 
        :
        <RouterProvider router={router} />
      }
    </>
    // </ConfigProvider>
  );
}

export default withTranslation()(App);

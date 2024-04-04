import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import './i18n/i18n';
import App from './App';

import 'antd/dist/antd.css';
import './styles/_app.scss';
import { MetaMaskUIProvider } from '@metamask/sdk-react-ui';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: 'NestQuant Vault',
          url: window.location.host,
          base64Icon:
            'data:image/png;base64,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',
        },
        defaultReadOnlyChainId: import.meta.env.VITE_ETHER_CHAINID,
        extensionOnly: true,
        checkInstallationImmediately: false,
      }}
    >
      <App />
    </MetaMaskUIProvider>
  </StrictMode>,
);

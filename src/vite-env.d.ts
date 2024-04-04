/// <reference types="vite/client" />
import { ExternalProvider } from '@ethersproject/providers';
import { boolean } from 'zod';

interface ImportMetaEnv {
  VITE_BINANCE_CONTROLLER: string;
  VITE_BINANCE_SCAN: string;
  VITE_BINANCE_ADDRESS: string;
  VITE_BINANCE_CHAINID: string;
  VITE_BINANCE_RPC: string;
  VITE_BINANCE_NAME: string;

  VITE_ETHER_CONTROLLER: string;
  VITE_ETHER_SCAN: string;
  VITE_ETHER_ADDRESS: string;
  VITE_ETHER_CHAINID: string;
  VITE_ETHER_RPC: string;
  VITE_ETHER_NAME: string;

  VITE_INFURA_API_KEY: string;

  VITE_MAINTENANCE: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare global {
  interface Window {
    ethereum?: any; // ExternalProvider;
  }
}

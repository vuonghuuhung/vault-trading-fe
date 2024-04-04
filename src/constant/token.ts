import bnbImg from 'resources/images/icon2x/bnb@2x.png';
import usdtImg from 'resources/images/icon2x/usdt@2x.png';
import ethImg from 'resources/images/icon2x/eth@2x.png';
import btcImg from 'resources/images/icon2x/btc@2x.png';
import oraiImg from 'resources/images/icon2x/orai@2x.png';

export const TOKEN_LIST: Record<string, { key: string; img: string }> = {
  USDT: {
    key: 'USDT',
    img: usdtImg,
  },
  BNB: {
    key: 'BNB',
    img: bnbImg,
  },
  ETH: {
    key: 'BNB',
    img: ethImg,
  },
  METH: {
    key: 'METH',
    img: ethImg,
  },
  MUSDT: {
    key: 'MUSDT',
    img: usdtImg,
  },
  BTCB: {
    key: 'BTC',
    img: btcImg
  },
  ORAI: {
    key: 'ORAI',
    img: oraiImg
  },

  // Mock
  Mock: {
    key: 'Mock',
    img: ethImg,
  },
};

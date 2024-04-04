import { ChainList, ChainType } from 'store/authentication/useAuthenticationStore';

export const convertToDisplayAddress = (address?: string | null, lengthBeforeSlice = 6) => {
  if (!address) {
    return { address: '', isAddress: false };
  }

  if (address.length <= lengthBeforeSlice + 4) {
    return { address, isAddress: false };
  }

  return {
    address: address.slice(0, lengthBeforeSlice) + '...' + address.slice(address.length - 4, address.length),
    isAddress: true,
  };
};

export const getBlockScanUrl = (chainId: ChainType) => {
  switch (chainId) {
    case ChainType.ETHER:
      return ChainList.ether.scan;

    case ChainType.BSC:
      return ChainList.bsc.scan;
  }
};

// hàm lấy đơn vị tiền

export function getUnitValue(name: string) {
  if (name.includes('/')) {
    const arr = name.split('/');
    return arr[arr.length - 1];
  }
  return '$';
}

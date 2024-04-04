import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Space, Tooltip, Typography } from 'antd';

import IconChecked from 'resources/svg/IconChecked';
import IconCopy from 'resources/svg/IconCopy';
import IconOpenInNew from 'resources/svg/IconOpenInNew';
import { convertToDisplayAddress } from 'utils/wallet';

const { Paragraph } = Typography;

type IDisplayAddress = {
  address?: string | null;
  copyable?: boolean;
  viewAccount?: boolean;
  copyText?: string;
  fakeIsAddress?: boolean;
};

const DisplayAddress: FC<IDisplayAddress> = ({
  address,
  copyable = true,
  viewAccount = false,
  fakeIsAddress = false,
  copyText = 'common.copy',
}) => {
  const { t } = useTranslation();

  const { address: addressDisplay, isAddress } = convertToDisplayAddress(address);

  return (
    <div className='display-address'>
      <Paragraph
        copyable={
          copyable && address && (isAddress || fakeIsAddress)
            ? {
                text: address,
                icon: [<IconCopy key='copy' />, <IconChecked key='checked' />],
                tooltips: [t(copyText), t('common.copied')],
              }
            : false
        }
      >
        {addressDisplay || ''}
      </Paragraph>
      {viewAccount && address && isAddress && (
        <Tooltip
          title={
            <Space size={8}>
              <IconOpenInNew />
              {t('common.view_on')}
            </Space>
          }
        >
          <a className='open-in-new' href={'#'} target='_blank' rel='noreferrer'>
            {' '}
            <IconOpenInNew />
          </a>
        </Tooltip>
      )}
    </div>
  );
};

export default DisplayAddress;

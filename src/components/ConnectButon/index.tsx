import { Button, Dropdown, Typography } from 'antd';
import classNames from 'classnames';
import AppModal from 'components/Modal';
import ModalStep, { MODAL_STEP } from 'components/pages/vault/components/ModalStep';
import { useInactiveConnect, useWalletConnect } from 'hooks/connectWallet/useWalletConnect';
import { useModal } from 'hooks/useModal';
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconCopy from 'resources/svg/IconCopy';
import KeplrIcon from 'resources/svg/KeplrIcon';
import LedgeIcon from 'resources/svg/LedgeIcon';
import MetamaskIcon from 'resources/svg/MetamaskIcon';
import OwalletIcon from 'resources/svg/OwalletIcon';
import PhantomIcon from 'resources/svg/PhantomIcon';
import TronLinkIcon from 'resources/svg/TronLinkIcon';
import DownIcon from 'resources/svg/header/DownIcon';
import LogoutIcon from 'resources/svg/header/LogoutIcon';
import WalletUserIcon from 'resources/svg/header/WalletUserIcon';
import { useAuthAddress } from 'store/authentication/selector';
import { convertStatistics, formatCurrency, isLessThanOrEqualTo } from 'utils';
import { convertToDisplayAddress } from 'utils/wallet';
// import { useSDK } from '@metamask/sdk-react';

const { Paragraph } = Typography;

const LIST_WALLETS = [
  {
    name: 'Owallet',
    icon: <OwalletIcon />,
    disabled: true,
  },
  {
    name: 'Metamask',
    icon: <MetamaskIcon />,
    disabled: false,
  },
  {
    name: 'TronLink',
    icon: <TronLinkIcon />,
    disabled: true,
  },
  {
    name: 'Phantom',
    icon: <PhantomIcon />,
    disabled: true,
  },
  {
    name: 'Keplr',
    icon: <KeplrIcon />,
    disabled: true,
  },
  {
    name: 'Ledger',
    icon: <LedgeIcon />,
    disabled: true,
  },
];

const MAX_SHOW_CURRENCY = 10000;

const OnlyUser: FC<any> = ({ handleLogout, address, balance = 123456789.0987654 }) => {
  const { value: cvtBalance, suffix } = convertStatistics(balance);
  const fmtBalanceCurrency = formatCurrency(balance, 2);
  const shownBalance = isLessThanOrEqualTo(balance, MAX_SHOW_CURRENCY) ? fmtBalanceCurrency : `${cvtBalance}${suffix}`;
  return (
    <div className='only-user'>
      <WalletUserIcon />
      <div className='detail'>
        <span className='detail-address' onClick={() => navigator.clipboard.writeText(address)}>
          {convertToDisplayAddress(address).address}
        </span>
        {/* <span className='detail-balance'>${shownBalance}</span> */}
        <span className='detail-balance'>Connected</span>
      </div>
      <div className='last-icon' onClick={() => handleLogout()}>
        <LogoutIcon />
      </div>
    </div>
  );
};

const UserDetailDropdown: FC<any> = ({ handleLogout, address, balance = 123456789.0987654 }) => {
  const [handleVisible, setHandleVisible] = useState(false);
  const handleVisibleDropdown = (visible: boolean) => {
    setHandleVisible(visible);
  };
  const { value: cvtBalance, suffix } = convertStatistics(balance);
  const fmtBalanceCurrency = formatCurrency(balance, 2);
  const shownBalance = isLessThanOrEqualTo(balance, MAX_SHOW_CURRENCY) ? fmtBalanceCurrency : `${cvtBalance}${suffix}`;

  return (
    <Dropdown
      overlay={
        <div className='dropdown-user-content'>
          <div className='copy' onClick={() => navigator.clipboard.writeText(address)}>
            {/* <Paragraph
              copyable={{
                text: address,
                icon: [<IconCopy key='copy' />, <IconChecked key='checked' />],
                tooltips: ['Copied'],
              }}
            >
              Copy address
            </Paragraph> */}
            <IconCopy />
            Copy address
          </div>
          <div className='logout' onClick={() => handleLogout()}>
            <LogoutIcon />
            Logout
          </div>
        </div>
      }
      trigger={['click']}
      overlayClassName='dropdown-user-wrapper'
      open={handleVisible}
      onOpenChange={handleVisibleDropdown}
      getPopupContainer={(trigger: any) => trigger.parentElement}
    >
      <div className='dropdown-user-btn'>
        <WalletUserIcon />
        <div className='detail'>
          <span className='detail-address'>{convertToDisplayAddress(address).address}</span>
          {/* <span className='detail-balance'>${shownBalance}</span> */}
          <span className='detail-balance'>Connected</span>
        </div>
        <div className='last-icon'>
          <DownIcon />
        </div>
      </div>
    </Dropdown>
  );
};

const ConnectWallet: FC<{ showDropdown?: boolean }> = ({ showDropdown = true }) => {
  const { open: openSelect, onCloseModal: onCloseSelectModal, onOpenModal: onOpenModalSelect } = useModal();
  // const { sdk, connected, connecting, provider, chainId, account, balance } = useSDK();
  const { handleConnect, handleLogout, handleConnectEarly, content, step, resetModalStep } = useWalletConnect({
    handleFailed: onCloseSelectModal,
    handleSuccess: onCloseSelectModal,
  });
  const { content: content2, step: step2, resetModalStep: resetModalStep2 } = useInactiveConnect();
  const navigate = useNavigate();

  const currentAddress = useAuthAddress();

  // useEffect(() => {
  //   // handleConnectEarly();
  // }, []);

  const logout = () => {
    navigate(`/`);
    handleLogout();
  };

  return (
    <>
      <div className='connect-wrapper'>
        {currentAddress ? (
          showDropdown ? (
            <UserDetailDropdown address={currentAddress} handleLogout={logout} />
          ) : (
            <OnlyUser address={currentAddress} handleLogout={logout} />
          )
        ) : (
          <Button className='connect-btn' onClick={() => onOpenModalSelect()}>
            Connect wallet
          </Button>
        )}
      </div>

      <AppModal
        wrapClassName='modal-select-wallet'
        title='Connect wallet'
        open={openSelect}
        maskClosable
        showCloseIcon
        onClose={onCloseSelectModal}
        width={500}
        centered
      >
        <div className='wallet-list'>
          {LIST_WALLETS.map((e) => {
            return (
              <div
                className={classNames('item', { disabled: e.disabled })}
                key={e.name}
                onClick={() => handleConnect()}
              >
                {e.icon}
                <p>{e.name}</p>
              </div>
            );
          })}
        </div>
        <div className='desc'>
          <a href='#' target='_blank' rel='noopener noreferrer'>
            I don’t have a wallet?
          </a>
        </div>
      </AppModal>
      <ModalStep
        open={step !== MODAL_STEP.READY}
        step={step}
        onClose={step !== MODAL_STEP.PROCESSING ? resetModalStep : undefined}
        showClose={step !== MODAL_STEP.PROCESSING}
        closable={step !== MODAL_STEP.PROCESSING}
        content={content}
      />
      <ModalStep
        open={step2 !== MODAL_STEP.READY}
        step={step2}
        onClose={step2 !== MODAL_STEP.PROCESSING ? resetModalStep2 : undefined}
        showClose={step2 !== MODAL_STEP.PROCESSING}
        closable={step2 !== MODAL_STEP.PROCESSING}
        content={content2}
      />
    </>
  );
};

export default ConnectWallet;

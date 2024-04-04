import { Grid, Layout } from 'antd';
import classNames from 'classnames';
import ConnectWallet from 'components/ConnectButon';
import MenuDrawer from 'components/MenuDrawer';
import { useVaultList } from 'components/pages/home/hooks/useVaultList';
import ModalStep, { MODAL_STEP } from 'components/pages/vault/components/ModalStep';
import { useModal } from 'hooks/useModal';
import { useNavigate } from 'react-router-dom';
import BSCIcon from 'resources/svg/BSCIcon';
import EtherIcon from 'resources/svg/EtherIcon';
import { changeChainId } from 'services/walletService';
import { useAuthActions, useGetCurrentChain } from 'store/authentication/selector';
import { ChainType } from 'store/authentication/useAuthenticationStore';

const { useBreakpoint } = Grid;
const { Header: HeaderAntd } = Layout;

const LIST_CHAIN = [
  {
    value: ChainType.ETHER,
    icon: <EtherIcon />,
    key: ChainType.ETHER,
  },
  {
    value: ChainType.BSC,
    icon: <BSCIcon />,
    key: ChainType.BSC,
  },
];

const Header = () => {
  const currentChain = useGetCurrentChain();
  const { handleSetChain } = useAuthActions();
  const screens = useBreakpoint();
  const { open: openSelect, onCloseModal: onCloseSelectModal, onOpenModal: onOpenModalSelect } = useModal();

  const navigate = useNavigate();
  const { getVaultList, content, step, resetModalStep } = useVaultList(currentChain);

  return (
    <HeaderAntd className='header-container'>
      <div className='start'></div>
      <div className='end'>
        <div className='chain-list'>
          {LIST_CHAIN.map((e) => {
            return (
              <div
                key={e.key}
                className={classNames('item', {
                  active: currentChain === e.value,
                })}
                onClick={() => {
                  handleSetChain(e.value);
                  // changeChainId(e.value);
                  // console.log(`current Chain: ${currentChain}`);
                  getVaultList(e.value);
                  navigate(`/`);
                }}
              >
                {e.icon}
              </div>
            );
          })}
        </div>

        {/* TODO: detail Info */}
        {screens.lg ? <ConnectWallet /> : <MenuDrawer />}
      </div>
      <ModalStep
        open={step !== MODAL_STEP.READY}
        step={step}
        onClose={step !== MODAL_STEP.PROCESSING ? resetModalStep : undefined}
        showClose={step !== MODAL_STEP.PROCESSING}
        closable={step !== MODAL_STEP.PROCESSING}
        content={content}
      />
    </HeaderAntd>
  );
};
export default Header;

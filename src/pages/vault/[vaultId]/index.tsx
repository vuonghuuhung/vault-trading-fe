import { Col, Image, Row } from 'antd';
import { useVaultDetail } from 'components/pages/home/hooks/useVaultDetail';
import InfoVault from 'components/pages/vault/components/InfoVault';
import ModalStep, { MODAL_STEP } from 'components/pages/vault/components/ModalStep';
import StatisticVault from 'components/pages/vault/components/StatisticVault';
import Suggestion from 'components/pages/vault/components/Suggestion';
import Swap from 'components/pages/vault/components/Swap';
import { useFetchHistoryData } from 'components/pages/vault/hooks/useFetchHistoryData';
import useGetTime from 'hooks/getTime/useGetTime';
import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import BackIcon from 'resources/svg/BackIcon';
import { getHistoricalData } from 'services/walletService';
import { useGetCurrentChain } from 'store/authentication/selector';
import { useGetHistoricalData, useGetStakedAmount, useGetUSDTBalance, useGetVaultDetail } from 'store/vault/selector';

const VaultDetail = () => {
  const vaultDetail = useGetVaultDetail();
  const { vault } = vaultDetail || {};
  const currentChain = useGetCurrentChain();
  const { vaultId = '' } = useParams();

  const { content, step, handleRetrieve, resetModalStep } = useFetchHistoryData();
  useEffect(() => {
    handleRetrieve(vaultId, currentChain);
  }, [vaultId]);

  return (
    <div className='vault-detail'>
      <div className='title-wrapper'>
        <Link to='/' className='back-page'>
          <BackIcon></BackIcon>
        </Link>

        <div className='title'>
          <div className='logo'>
            <Image src={vault?.img} preview={false} alt='img1' className='img1' width={40} height={40} />
            {/* {!vault?.img2 ? null : (
              <Image src={vault?.img2} preview={false} alt='img2' className='img2' width={40} height={40} />
            )} */}
          </div>
          <div className='name'>{vault?.name.split("/")[0]}</div>
        </div>
      </div>
      <div className='content'>
        <Row gutter={16} className='top'>
          <Col lg={15} md={24} className='left'>
            <StatisticVault />
            <div className='info'>
              <InfoVault />
            </div>
          </Col>
          <Col lg={9} md={24} className='swap'>
            <Swap />
          </Col>
        </Row>
        <div className='suggestion'>
          <Suggestion />
        </div>
      </div>
      <ModalStep
        open={step !== MODAL_STEP.READY}
        step={step}
        onClose={step !== MODAL_STEP.PROCESSING ? resetModalStep : undefined}
        showClose={step !== MODAL_STEP.PROCESSING}
        closable={step !== MODAL_STEP.PROCESSING}
        content={content}
      />
    </div>
  );
};

export default VaultDetail;

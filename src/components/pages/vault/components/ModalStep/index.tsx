import { useModal } from 'hooks/useModal';
import AppModal from 'components/Modal';
import { Link } from 'react-router-dom';
import IconOpenInNew from 'resources/svg/IconOpenInNew';
import classNames from 'classnames';
import IconChecked from 'resources/svg/IconChecked';
import { FC } from 'react';
import ProcessingIcon from 'resources/svg/ProcessingIcon';
import SuccessfulIcon from 'resources/svg/SuccessfulIcon';
import FailedIcon from 'resources/svg/FailedIcon';

export enum MODAL_STEP {
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  READY = 'READY',
}

const SuccessContent: FC<{ content?: string; link: string }> = ({ content, link }) => {
  return (
    <div className={`modal-step modal-success`}>
      <div className='logo'>
        <SuccessfulIcon />
      </div>
      <div className='content'>{content || 'Transaction successfully!'}</div>

      <div className='view-scan'>
        <Link to={link} target='_blank' className='app-button button-view-on'>
          View on scan
          {/* <IconOpenInNew /> */}
        </Link>
      </div>
    </div>
  );
};

const FailedContent: FC<{ content?: string }> = ({ content }) => {
  return (
    <div className={`modal-step modal-failed`}>
      <div className='logo'>
        <FailedIcon />
      </div>
      <div className='content'>{content || 'Transaction failed!'}</div>
    </div>
  );
};

const ProcessingContent: FC<{ content?: string }> = ({ content }) => {
  return (
    <div className={`modal-step modal-processing`}>
      <div className='logo'>
        <ProcessingIcon />
      </div>
      <div className='content'>{content || 'Transaction processing...'}</div>
    </div>
  );
};

const ModalStep = ({
  open,
  onClose,
  txHash,
  link = '',
  showBtn = false,
  showClose = false,
  closable = false,
  title = '',
  step,
  content = '',
}: {
  open: boolean;
  onClose?: () => void;
  txHash?: string;
  link?: string;
  showBtn?: false;
  showClose?: boolean;
  closable?: boolean;
  title?: string;
  step: MODAL_STEP;
  content?: string;
}) => {
  return (
    <AppModal
      wrapClassName={'modal-step-wrapper'}
      title={title}
      open={open}
      maskClosable
      showCloseIcon={showClose}
      onClose={onClose}
      closable={closable}
      width={420}
      centered
    >
      {step === MODAL_STEP.PROCESSING && <ProcessingContent content={content} />}
      {step === MODAL_STEP.SUCCESS && <SuccessContent link={link} content={content} />}
      {step === MODAL_STEP.FAILED && <FailedContent content={content} />}
    </AppModal>
  );
};

export default ModalStep;

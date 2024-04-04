import { FC, Fragment, PropsWithChildren } from 'react';

import { Modal, ModalProps, Typography } from 'antd';
import classNames from 'classnames';

import CloseIcon from 'resources/svg/CloseIcon';

const { Title } = Typography;

const ModalComponent: FC<
  PropsWithChildren<
    ModalProps & {
      title?: any;
      onClose?: any;
      showCloseIcon?: boolean;
      width?: number | string;
      maskClosable?: boolean;
      wrapClassName?: string;
      destroyOnClose?: boolean;
    }
  >
> = ({
  children,
  title,
  onClose,
  showCloseIcon = true,
  width,
  wrapClassName,
  destroyOnClose = true,
  maskClosable = true,
  ...props
}) => {
  return (
    <Modal
      footer={null}
      wrapClassName={classNames('modal', wrapClassName)}
      closable={false}
      width={width ?? 565}
      destroyOnClose={destroyOnClose}
      onCancel={onClose}
      maskClosable={maskClosable || !showCloseIcon}
      getContainer={() => document.getElementById('root') as HTMLElement}
      {...props}
    >
      <Fragment>
        {showCloseIcon && <CloseIcon onClick={onClose} className='modal-close-icon' />}
        <>
          <Title level={2} className='title'>
            {title}
          </Title>
          {children}
        </>
      </Fragment>
    </Modal>
  );
};

export default ModalComponent;

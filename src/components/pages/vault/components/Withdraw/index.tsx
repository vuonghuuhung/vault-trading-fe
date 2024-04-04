import FormItem from 'components/FormItem';
import { FormProvider } from 'react-hook-form';
import FormNumber from 'components/FormItem/components/Number';
import { Button, Image } from 'antd';
import { WithdrawField, MAX_WITHDRAW_NUMBER } from '../../constants';
import { formatCurrency, isLessThanOrEqualTo, limitMaxLengthNumber } from 'utils';
import { useWithdraw } from '../../hooks/useWithdraw';
import { useAuthAddress, useGetCurrentChain } from 'store/authentication/selector';
import ConnectWallet from 'components/ConnectButon';
import { useGetStakedAmount, useGetVaultDetail } from 'store/vault/selector';
import logoNestQuant from 'resources/images/logo_icon.png';
import ModalStep, { MODAL_STEP } from '../ModalStep';
import { getBlockScanUrl } from 'utils/wallet';
import { useParams } from 'react-router-dom';
import { useVaultDetail } from 'components/pages/home/hooks/useVaultDetail';

const Withdraw = () => {
  const { formContext, onSubmit, setMaxWithdraw, handleWithdraw, loading, txHash, step, resetModalStep, content } =
    useWithdraw();
  const { handleSubmit, formState } = formContext;

  const myStakedAmount = useGetStakedAmount();
  const disabled = !!formState.errors.quantity?.message || isLessThanOrEqualTo(myStakedAmount, 0);

  const vaultDetail = useGetVaultDetail();
  const { vaultId } = useParams();

  const vaultAddr = vaultId || vaultDetail?.address || '';

  const { getValues } = formContext;
  const currentChain = useGetCurrentChain();
  const { getMyStakedByVault, getDepositWithdrawOrderByVault } = useVaultDetail(currentChain, vaultAddr);

  const submitDeposit = async () => {
    const { quantity = '0' } = getValues() || {};
    // console.log('submit data', { amount: quantity, address: vaultAddr });

    await handleWithdraw({ amount: quantity, address: vaultAddr });
    await getMyStakedByVault();
    await getDepositWithdrawOrderByVault();
  };

  const address = useAuthAddress();
  return (
    <div className='withdraw'>
      <FormProvider {...formContext}>
        <form autoComplete='off' onSubmit={handleSubmit(submitDeposit)}>
          <FormItem name={WithdrawField.quantity}>
            <div className='label'>
              <span>Unstake</span>
              <div className='label-balance'>
                <span>Staked:&nbsp;</span>
                <div className='value-balance'>
                  <Image src={logoNestQuant} alt='icon token' preview={false} />
                  &nbsp;
                  <span className='token-value'>
                    {formatCurrency(myStakedAmount, 2)} {'shares'}
                  </span>
                </div>
              </div>
            </div>

            <FormNumber
              thousandSeparator
              placeholder={'0'}
              decimalScale={6}
              isAllowed={limitMaxLengthNumber(MAX_WITHDRAW_NUMBER)}
              addonAfter={
                <Button
                  disabled={loading}
                  className='app-button button-max'
                  onClick={() => setMaxWithdraw(myStakedAmount)}
                >
                  Max
                </Button>
              }
              disabled={loading}
            />
          </FormItem>

          {address ? (
            <Button className='app-button withdraw-button' htmlType='submit' disabled={disabled}>
              Withdraw
            </Button>
          ) : (
            <ConnectWallet />
          )}
        </form>
      </FormProvider>

      <ModalStep
        open={step !== MODAL_STEP.READY}
        link={`${getBlockScanUrl(currentChain)}/${txHash}`}
        step={step}
        onClose={step !== MODAL_STEP.PROCESSING ? resetModalStep : undefined}
        showClose={step !== MODAL_STEP.PROCESSING}
        closable={step !== MODAL_STEP.PROCESSING}
        content={content}
      />
    </div>
  );
};

export default Withdraw;

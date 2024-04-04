import FormItem from 'components/FormItem';
import { FormProvider } from 'react-hook-form';
import FormNumber from 'components/FormItem/components/Number';
import { Button, Image } from 'antd';
import { DepositField, MAX_DEPOSIT_NUMBER } from '../../constants';
import { formatCurrency, isLessThanOrEqualTo, limitMaxLengthNumber } from 'utils';
import { useDeposit } from '../../hooks/useDeposit';
import NoteIcon from 'resources/svg/NoteIcon';
import ConnectWallet from 'components/ConnectButon';
import { useAuthAddress, useGetCurrentChain } from 'store/authentication/selector';
import { useGetUSDTBalance, useGetVaultDetail } from 'store/vault/selector';
import { useParams } from 'react-router-dom';
import { useVaultDetail } from 'components/pages/home/hooks/useVaultDetail';
import ModalStep, { MODAL_STEP } from '../ModalStep';
import { getBlockScanUrl } from 'utils/wallet';
import { useModal } from 'hooks/useModal';
import { TOKEN_LIST } from 'constant/token';

const Deposit = () => {
  const { formContext, onSubmit, setMaxDeposit, handleDeposit, loading, txHash, step, resetModalStep, content } =
    useDeposit();
  const { handleSubmit, formState } = formContext;
  const myUsdtBalance = useGetUSDTBalance();
  const address = useAuthAddress();
  const vaultDetail = useGetVaultDetail();
  const { vaultId } = useParams();
  // console.log(content);

  const vaultAddr = vaultId || vaultDetail?.address || '';

  const disabled = !!formState.errors.quantity?.message || isLessThanOrEqualTo(myUsdtBalance, 0) || loading;

  const { getValues } = formContext;
  const currentChain = useGetCurrentChain();
  const { getMyUSDTBalanceByVault, getDepositWithdrawOrderByVault } = useVaultDetail(currentChain, vaultAddr);

  const submitDeposit = async () => {
    const { quantity = '0' } = getValues() || {};
    // console.log('submit data', { amount: quantity, address: vaultAddr });

    await handleDeposit({ amount: quantity, address: vaultAddr });
    await getMyUSDTBalanceByVault();
    await getDepositWithdrawOrderByVault();
  };

  // const myStakedAmount = useGetStakedAmount();

  return (
    <div className='deposit'>
      <FormProvider {...formContext}>
        <form autoComplete='off' onSubmit={handleSubmit(submitDeposit)}>
          {isLessThanOrEqualTo(myUsdtBalance, 0) && (
            <div className='note'>
              <div className='note-icon'>
                <NoteIcon />
              </div>
              &nbsp; &nbsp;
              <span className='note-txt'>You don’t have enough USDT to deposit. You need to swap tokens to USDT</span>
            </div>
          )}

          <FormItem name={DepositField.quantity}>
            <div className='label'>
              <span>Deposit</span>
              <div className='label-balance'>
                <span>Available to deposit:&nbsp;</span>
                <div className='value-balance'>
                  <Image src={vaultDetail?.vault.img2} alt='icon token' preview={false} />
                  &nbsp;
                  <span className='token-value'>
                    {formatCurrency(myUsdtBalance, 2)} {'USDT'}
                  </span>
                </div>
              </div>
            </div>

            <FormNumber
              thousandSeparator
              placeholder={'0'}
              decimalScale={6}
              isAllowed={limitMaxLengthNumber(MAX_DEPOSIT_NUMBER)}
              addonAfter={
                <Button
                  disabled={loading}
                  className='app-button button-max'
                  onClick={() => setMaxDeposit(myUsdtBalance)}
                >
                  Max
                </Button>
              }
              disabled={loading}
            />
          </FormItem>

          {address ? (
            <Button className='app-button deposit-button' htmlType='submit' disabled={disabled}>
              Deposit
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

export default Deposit;

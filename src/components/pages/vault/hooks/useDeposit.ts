import { approveToken, depositBalance } from 'services/walletService/index';
import { useEffect, useState } from 'react';
import { DepositField, MAX_DEPOSIT_NUMBER } from '../constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { dividedNumber, formatInteger } from 'utils';
import { TYPE_CONSTANTS } from 'constant';
import showMessage from 'components/Message';
import { MODAL_STEP } from '../components/ModalStep';

const DEPOSIT_MAX_QUANTITY = 1000000000;

const schema = () =>
  z.object({
    [DepositField.quantity]: z
      .string()
      .min(1, 'Amount is required')
      .regex(/\d+/)
      .transform(Number)
      .refine((n) => {
        return n <= DEPOSIT_MAX_QUANTITY;
      }, `Amount must be less than ${formatInteger(DEPOSIT_MAX_QUANTITY)}`)
      .refine((n) => {
        return n > 0;
      }, 'Amount must be greater than 0')
      .transform(String),
  });

export const useDeposit = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [txHash, setTxHash] = useState('');
  const [step, setStep] = useState(MODAL_STEP.READY);

  const formContext = useForm({
    defaultValues: {
      [DepositField.quantity]: '0',
    },
    resolver: zodResolver(schema()),
  });

  const { watch, reset, getValues, setValue, trigger } = formContext;
  const diamondQuantity = watch(DepositField.quantity);

  const onSubmit = async (values: any) => {
    // console.log('value', getValues());
  };

  const setMaxDeposit = (availableBalance: string) => {
    setValue(DepositField.quantity, availableBalance);
    trigger();
  };

  const handleStatus = () => (content: string, status: MODAL_STEP) => {
    setStep(status);
    setContent(content);
  };

  const handleDeposit = async (data: { amount: string; address: string }) => {
    setLoading(true);
    const res = await approveToken(data, handleStatus());

    if (!res) {
      setLoading(false);
      return;
    }

    const tx = await depositBalance(data, handleStatus());
    setLoading(false);
    if (tx?.hash) {
      setTxHash(tx?.hash);
      handleStatus()(
        'Your deposit order transaction had been successfully, wait for the next rebalance to own your shares',
        MODAL_STEP.SUCCESS,
      );
      reset();
    }
  };

  const resetModalStep = () => {
    setStep(MODAL_STEP.READY);
  };

  return {
    formContext,
    onSubmit,
    setMaxDeposit,
    handleDeposit,
    loading,
    txHash,
    step,
    content,
    resetModalStep,
  };
};

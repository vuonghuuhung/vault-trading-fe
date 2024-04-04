import { useState } from 'react';
import { WithdrawField } from '../constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { formatInteger } from 'utils';
import { MODAL_STEP } from '../components/ModalStep';
import { withdrawStake } from 'services/walletService';

const WITHDRAW_MAX_QUANTITY = 1000000000;

const schema = () =>
  z.object({
    [WithdrawField.quantity]: z
      .string()
      .min(1, 'Amount is required')
      .regex(/\d+/)
      .transform(Number)
      .refine((n) => {
        return n <= WITHDRAW_MAX_QUANTITY;
      }, `Amount must be less than ${formatInteger(WITHDRAW_MAX_QUANTITY)}`)
      .refine((n) => {
        return n > 0;
      }, 'Amount must be greater than 0')
      .transform(String),
  });

export const useWithdraw = () => {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<string>('');
  const [txHash, setTxHash] = useState('');
  const [step, setStep] = useState(MODAL_STEP.READY);

  const formContext = useForm({
    defaultValues: {
      [WithdrawField.quantity]: '0',
    },
    resolver: zodResolver(schema()),
  });

  const { watch, reset, getValues, setValue, trigger } = formContext;
  const onSubmit = async (values: any) => {
    // console.log('value', getValues());
  };

  const setMaxWithdraw = (availableBalance: string) => {
    setValue(WithdrawField.quantity, availableBalance);
    trigger();
  };

  const handleStatus = () => (content: string, status: MODAL_STEP) => {
    setStep(status);
    setContent(content);
  };

  const handleWithdraw = async (data: { amount: string; address: string }) => {
    setLoading(true);
    const tx = await withdrawStake(data, handleStatus());
    setLoading(false);
    if (tx?.hash) {
      setTxHash(tx?.hash);
      handleStatus()(
        'Your withdraw order transaction had been successfully, wait for the next rebalance to own your profit!',
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
    setMaxWithdraw,
    handleWithdraw,
    loading,
    txHash,
    step,
    resetModalStep,
    content,
  };
};

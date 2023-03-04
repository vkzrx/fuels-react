import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import type { TransactionRequestLike, TransactionResponse } from 'fuels';
import { TransactionRequestNotCorrect, UserWalletNotDefined } from '../../errors';
import { store as store_ } from '../../stores';
import { transactionTypeToNativeEnum } from '../../types';
import type { BaseUseMutationConfig, BaseUseMutationResult, TransactionRequest } from '../../types';

type UseSendTransactionConfig = BaseUseMutationConfig<TransactionResponse> & {
  request: TransactionRequest;
};

type UseSendTransactionResult = BaseUseMutationResult<TransactionResponse> & {
  sendTransaction: () => void;
};

function useSendTransaction(config?: UseSendTransactionConfig): UseSendTransactionResult {
  const store = useSnapshot(store_);

  const transferMutation = useMutation({
    mutationKey: ['sendTransaction'],
    mutationFn: async () => {
      if (!store.wallet) throw UserWalletNotDefined;
      if (!config?.request) throw TransactionRequestNotCorrect;

      const { request } = config;
      const transaction: TransactionRequestLike = {
        type: transactionTypeToNativeEnum[request.type],
        gasPrice: request.gasPrice,
        gasLimit: request.gasLimit,
        inputs: request.inputs,
        outputs: request.outputs,
        maturity: request.maturity,
        witnesses: request.witnesses,
      };
      return store.wallet.sendTransaction(transaction);
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });

  const sendTransaction = useCallback(() => {
    return transferMutation.mutate();
  }, [transferMutation.mutate]);

  return {
    sendTransaction,
    data: transferMutation.data,
    error: transferMutation.error,
    status: transferMutation.status,
    isError: transferMutation.isError,
    isLoading: transferMutation.isLoading,
    isSuccess: transferMutation.isSuccess,
  };
}

export default useSendTransaction;

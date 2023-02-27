import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import type {
  AbstractAddress,
  BytesLike,
  TransactionRequestLike,
  TransactionResponse,
} from 'fuels';
import { UserWalletNotDefined } from '../../errors';
import { userStore } from '../../stores';
import type { BaseUseMutationConfig, BaseUseMutationResult } from '../../types';

type TransferParams = {
  destination: AbstractAddress;
  amount: string;
  assetId?: BytesLike;
  transactionParams?: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'>;
};

type UseTransferConfig = BaseUseMutationConfig<TransactionResponse, TransferParams>;

type UseTransferResult = BaseUseMutationResult<TransactionResponse, TransferParams> & {
  transfer: (
    params: TransferParams,
    options?: MutateOptions<TransactionResponse, unknown, TransferParams>,
  ) => void;
};

function useTransfer(config?: UseTransferConfig): UseTransferResult {
  const store = useSnapshot(userStore);

  const transferMutation = useMutation({
    mutationKey: ['transfer'],
    mutationFn: async (params) => {
      if (!store.wallet) throw UserWalletNotDefined;
      const { destination, amount, assetId, transactionParams } = params;
      return store.wallet.transfer(destination, amount, assetId, transactionParams);
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });

  const transfer = useCallback(
    (
      params: TransferParams,
      options?: MutateOptions<TransactionResponse, unknown, TransferParams>,
    ) => {
      return transferMutation.mutate(params, options);
    },
    [transferMutation.mutate],
  );

  return {
    transfer,
    data: transferMutation.data,
    error: transferMutation.error,
    status: transferMutation.status,
    isError: transferMutation.isError,
    isLoading: transferMutation.isLoading,
    isSuccess: transferMutation.isSuccess,
  };
}

export default useTransfer;

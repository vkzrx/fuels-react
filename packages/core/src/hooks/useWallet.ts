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
import { UserWalletNotDefined } from '../errors';
import { connect as connect_, disconnect as disconnect_, userStore } from '../stores';

type SignMessageParams = {
  message: string;
};

type TransferParams = {
  destination: AbstractAddress;
  amount: string;
  assetId?: BytesLike;
  transactionParams?: Pick<TransactionRequestLike, 'gasLimit' | 'gasPrice' | 'maturity'>;
};

function useWallet() {
  const store = useSnapshot(userStore);

  const connectMutation = useMutation({
    mutationKey: ['connect'],
    mutationFn: async () => connect_(),
  });

  const disconnectMutation = useMutation({
    mutationKey: ['disconnect'],
    mutationFn: async () => disconnect_(),
  });

  const signMessageMutation = useMutation({
    mutationKey: ['sign'],
    mutationFn: async (params: SignMessageParams) => {
      if (!store.wallet) throw UserWalletNotDefined;
      return store.wallet.signMessage(params.message);
    },
  });

  const transferMutation = useMutation({
    mutationKey: ['transfer'],
    mutationFn: async (params: TransferParams) => {
      if (!store.wallet) throw UserWalletNotDefined;
      const { destination, amount, assetId, transactionParams } = params;
      return store.wallet.transfer(destination, amount, assetId, transactionParams);
    },
  });

  const connectFn = useCallback(() => {
    return connectMutation.mutate();
  }, [connectMutation.mutate]);

  const disconnectFn = useCallback(() => {
    return disconnectMutation.mutate();
  }, [disconnectMutation.mutate]);

  const signMessageFn = useCallback(
    (params: SignMessageParams, options?: MutateOptions<string, unknown, SignMessageParams>) => {
      return signMessageMutation.mutate(params, options);
    },
    [signMessageMutation.mutate],
  );

  const transferFn = useCallback(
    (
      params: TransferParams,
      options?: MutateOptions<TransactionResponse, unknown, TransferParams>,
    ) => {
      return transferMutation.mutate(params, options);
    },
    [transferMutation.mutate],
  );

  return {
    address: store.address,
    status: store.status,
    wallet: store.wallet,
    isConnected: store.status === 'connected',
    connect: {
      mutate: connectFn,
    },
    disconnect: {
      mutate: disconnectFn,
    },
    signMessage: {
      mutate: signMessageFn,
      error: signMessageMutation.error,
      status: signMessageMutation.status,
      isError: signMessageMutation.isError,
      isLoading: signMessageMutation.isLoading,
      isSuccess: signMessageMutation.isSuccess,
    },
    transfer: {
      mutate: transferFn,
      error: transferMutation.error,
      status: transferMutation.status,
      isError: transferMutation.isError,
      isLoading: transferMutation.isLoading,
      isSuccess: transferMutation.isSuccess,
    },
  };
}

export default useWallet;

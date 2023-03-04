import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { connect as connect_, store as store_ } from '../../stores';
import type { UserStatus } from '../../stores';
import type { BaseUseMutationConfig, BaseUseMutationResult } from '../../types';

type UseConnectResult = Omit<BaseUseMutationResult, 'data' | 'status'> & {
  isConnected: boolean;
  status: UserStatus;
  connect: () => void;
  connectAsync: () => Promise<void>;
};

function useConnect(config?: BaseUseMutationConfig): UseConnectResult {
  const store = useSnapshot(store_);

  const { mutate, mutateAsync, error, isError, isLoading, isSuccess } = useMutation({
    mutationKey: ['connect'],
    mutationFn: async () => connect_(),
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });

  const connect = useCallback(() => {
    return mutate();
  }, [mutate]);

  const connectAsync = useCallback(() => {
    return mutateAsync();
  }, [mutateAsync]);

  return {
    status: store.status,
    error,
    connect,
    connectAsync,
    isConnected: store.status === 'connected',
    isError,
    isLoading,
    isSuccess,
  };
}

export default useConnect;

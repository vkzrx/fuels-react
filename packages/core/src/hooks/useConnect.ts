import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { connect as connect_, userStore } from '../stores';
import type { UserStatus } from '../stores';
import type { BaseUseMutationResult } from '../types';

type UseConnectResult = Omit<BaseUseMutationResult, 'data' | 'status'> & {
  isConnected: boolean;
  status: UserStatus;
  connect: () => void;
  connectAsync: () => Promise<void>;
};

function useConnect(): UseConnectResult {
  const store = useSnapshot(userStore);

  const { mutate, mutateAsync, error, isError, isLoading, isSuccess } = useMutation({
    mutationKey: ['connect'],
    mutationFn: async () => connect_(),
  });

  const connect = useCallback(() => {
    return mutate();
  }, [mutate]);

  const connectAsync = useCallback(() => {
    return mutateAsync();
  }, [mutateAsync]);

  return {
    status: userStore.status,
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

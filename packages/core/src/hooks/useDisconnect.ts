import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { disconnect as disconnect_, userStore } from '../stores';
import type { UserStatus } from '../stores';
import type { BaseUseMutationResult } from '../types';

type UseDisconnectResult = Omit<BaseUseMutationResult, 'data' | 'status'> & {
  isConnected: boolean;
  status: UserStatus;
  disconnect: () => void;
  disconnectAsync: () => Promise<void>;
};

function useDisconnect(): UseDisconnectResult {
  const store = useSnapshot(userStore);

  const { mutate, mutateAsync, error, isError, isLoading, isSuccess } = useMutation({
    mutationKey: ['disconnect'],
    mutationFn: async () => disconnect_(),
  });

  const disconnect = useCallback(() => {
    return mutate();
  }, [mutate]);

  const disconnectAsync = useCallback(() => {
    return mutateAsync();
  }, [mutateAsync]);

  return {
    error,
    disconnect,
    disconnectAsync,
    status: userStore.status,
    isConnected: store.status === 'connected',
    isError,
    isLoading,
    isSuccess,
  };
}

export default useDisconnect;

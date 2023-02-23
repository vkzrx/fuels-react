import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { disconnect as disconnect_, userStore } from '../stores';

function useDisconnect() {
  const store = useSnapshot(userStore);

  const { data, error, status, mutate, mutateAsync, isError, isIdle, isLoading, isSuccess } =
    useMutation({
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
    data,
    error,
    disconnect,
    disconnectAsync,
    status,
    isConnected: store.status === 'connected',
    isError,
    isIdle,
    isLoading,
    isSuccess,
  };
}

export default useDisconnect;

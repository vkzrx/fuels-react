import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { connect as connect_, userStore } from '../stores';

function useConnect() {
  const store = useSnapshot(userStore);

  const { data, error, mutate, mutateAsync, isError, isIdle, isLoading, isSuccess } = useMutation({
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
    data,
    error,
    connect,
    connectAsync,
    status: store.status,
    isConnected: store.status === 'connected',
    isError,
    isIdle,
    isLoading,
    isSuccess,
  };
}

export default useConnect;

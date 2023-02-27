import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { connect as connect_, disconnect as disconnect_, userStore } from '../../stores';
import type { UserStore } from '../../stores';
import type { BaseUseMutationConfig } from '../../types';

type UseWalletConfig = {
  onConnect?: BaseUseMutationConfig['onSuccess'];
  onDisconnect?: BaseUseMutationConfig['onSuccess'];
};

type UseWalletResult = UserStore & {
  isConnected: boolean;
  isDisconnected: boolean;
  connect: () => void;
  connectAsync: () => Promise<void>;
  disconnect: () => void;
  disconnectAsync: () => Promise<void>;
};

function useWallet(config?: UseWalletConfig): UseWalletResult {
  const store = useSnapshot(userStore);

  const connectMutation = useMutation({
    mutationKey: ['connect'],
    mutationFn: async () => connect_(),
    onSuccess: config?.onConnect,
  });

  const disconnectMutation = useMutation({
    mutationKey: ['disconnect'],
    mutationFn: async () => disconnect_(),
    onSuccess: config?.onDisconnect,
  });

  const connect = useCallback(() => {
    return connectMutation.mutate();
  }, [connectMutation.mutate]);

  const connectAsync = useCallback(() => {
    return connectMutation.mutateAsync();
  }, [connectMutation.mutateAsync]);

  const disconnect = useCallback(() => {
    return disconnectMutation.mutate();
  }, [disconnectMutation.mutate]);

  const disconnectAsync = useCallback(() => {
    return disconnectMutation.mutateAsync();
  }, [disconnectMutation.mutateAsync]);

  return {
    address: store.address,
    status: store.status,
    wallet: store.wallet,
    isConnected: store.status === 'connected',
    isDisconnected: store.status === 'disconnected',
    connect,
    connectAsync,
    disconnect,
    disconnectAsync,
  };
}

export default useWallet;
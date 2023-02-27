import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { MessageNotCorrect, UserWalletNotDefined } from '../../errors';
import { userStore } from '../../stores';
import type { BaseUseMutationConfig, BaseUseMutationResult } from '../../types';

type UseMessageConfig = BaseUseMutationConfig<string> & {
  message: string | null;
};

type UseSignMessageResult = BaseUseMutationResult<string> & {
  signMessage: () => void;
};

function useSignMessage(config: UseMessageConfig): UseSignMessageResult {
  const store = useSnapshot(userStore);

  const signMessageMutation = useMutation({
    mutationKey: ['signMessage'],
    mutationFn: async () => {
      if (!store.wallet) throw UserWalletNotDefined;
      if (!config.message) throw MessageNotCorrect;
      return store.wallet.signMessage(config.message);
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });

  const signMessage = useCallback(() => {
    return signMessageMutation.mutate();
  }, [signMessageMutation.mutate]);

  return {
    signMessage,
    data: signMessageMutation.data,
    error: signMessageMutation.error,
    status: signMessageMutation.status,
    isError: signMessageMutation.isError,
    isLoading: signMessageMutation.isLoading,
    isSuccess: signMessageMutation.isSuccess,
  };
}

export default useSignMessage;

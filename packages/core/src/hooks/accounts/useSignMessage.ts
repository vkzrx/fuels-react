import { useCallback } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { MutateOptions } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { UserWalletNotDefined } from '../../errors';
import { userStore } from '../../stores';
import type { BaseUseMutationConfig, BaseUseMutationResult } from '../../types';

type UseMessageConfig = BaseUseMutationConfig<string, string> & {
  message: string;
};

type UseSignMessageResult = BaseUseMutationResult<string, string> & {
  signMessage: (params: string, options?: MutateOptions<string, unknown, string>) => void;
};

function useSignMessage(config?: UseMessageConfig): UseSignMessageResult {
  const store = useSnapshot(userStore);

  const signMessageMutation = useMutation({
    mutationKey: ['signMessage'],
    mutationFn: async (message) => {
      if (!store.wallet) throw UserWalletNotDefined;
      return store.wallet.signMessage(message);
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });

  const signMessage = useCallback(
    (message: string, options?: MutateOptions<string, unknown, string>) => {
      return signMessageMutation.mutate(message, options);
    },
    [signMessageMutation.mutate],
  );

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

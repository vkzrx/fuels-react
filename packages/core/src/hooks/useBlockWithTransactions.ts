import { useQuery } from '@tanstack/react-query';
import type { Provider } from 'fuels';
import { useSnapshot } from 'valtio';
import type { UseBlockConfig, UseBlockResult } from './useBlock';
import { BlockNotFound, ProviderNotDefined } from '../errors';
import { providerStore } from '../stores';

type BlockWithTransactions = NonNullable<Awaited<ReturnType<Provider['getBlockWithTransactions']>>>;

function useBlockWithTransactions(
  config: UseBlockConfig<BlockWithTransactions>,
): UseBlockResult<BlockWithTransactions> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, error, status, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['block', config.idOrHeight],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.idOrHeight) throw BlockNotFound;

      let blockId = config.idOrHeight;

      // somehow we need to check if we are passing a number stringified
      // otherwise it gets treated as a transactionId which impacts the result
      // this is a very small workaround, need to better handle it
      if (typeof blockId === 'string') {
        if (!isNaN(Number(blockId))) {
          blockId = Number(blockId);
        }
      }

      const block = await defaultProvider.getBlockWithTransactions(blockId);
      if (!block) throw BlockNotFound;
      return block;
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.idOrHeight,
  });

  return {
    data,
    error,
    status,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
}

export default useBlockWithTransactions;

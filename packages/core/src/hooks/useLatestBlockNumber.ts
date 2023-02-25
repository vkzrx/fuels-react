import { useQuery } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { ProviderNotDefined } from '../errors';
import { providerStore } from '../stores';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../types';

type UseLatestBlockNumberConfig = BaseUseQueryConfig<string> & {
  refetchInterval?: number | false;
};

function useLatestBlockNumber(options?: UseLatestBlockNumberConfig): BaseUseQueryResult<string> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['latestBlockNumber'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      const blockNumber = await defaultProvider.getBlockNumber();
      return blockNumber.toString();
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    refetchInterval: options?.refetchInterval,
  });

  return {
    data,
    status,
    error,
    isError,
    isLoading,
    isFetching,
    isSuccess,
  };
}

export default useLatestBlockNumber;

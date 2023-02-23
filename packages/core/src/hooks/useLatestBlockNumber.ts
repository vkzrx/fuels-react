import { useQuery } from '@tanstack/react-query';
import type { QueryKey, UseQueryResult } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { useSnapshot } from 'valtio';
import { ProviderNotDefined } from '../errors';
import { providerStore } from '../stores';

type UseLatestBlockNumberOptions = Pick<
  UseQueryOptions<string>,
  'onError' | 'onSettled' | 'onSuccess' | 'refetchInterval' | 'onSettled'
>;

function useLatestBlockNumber(options?: UseLatestBlockNumberOptions): UseQueryResult<string> {
  const { defaultProvider } = useSnapshot(providerStore);

  const result = useQuery({
    queryKey: ['latestBlockNumber'] as QueryKey,
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      const blockNumber = await defaultProvider.getBlockNumber();
      return blockNumber.toString();
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    refetchInterval: options?.refetchInterval,
  });

  return result;
}

export default useLatestBlockNumber;

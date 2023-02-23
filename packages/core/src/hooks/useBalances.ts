import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { Address } from 'fuels';
import type { CoinQuantity, CursorPaginationArgs } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { AddressNotCorrect, ProviderNotDefined } from '../errors';

type UseBalancesConfig = Pick<UseQueryOptions<CoinQuantity[]>, 'onSuccess' | 'onError'> & {
  owner: string | null;
  pagination?: CursorPaginationArgs;
};

function useBalances(config: UseBalancesConfig) {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['balances'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.owner) throw AddressNotCorrect;
      const address = Address.fromString(config.owner);
      const balance = await defaultProvider.getBalances(address, config.pagination);
      return balance.toString();
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.owner,
  });

  return {
    data,
    error,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
}

export default useBalances;

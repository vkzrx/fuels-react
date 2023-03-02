import { useQuery } from '@tanstack/react-query';
import { Address } from 'fuels';
import type { CoinQuantity, CursorPaginationArgs } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../../stores';
import { AddressNotCorrect, ProviderNotDefined } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type CoinBalance = Omit<CoinQuantity, 'amount' | 'max'> & {
  amount: string;
  max?: string | undefined;
};

type UseBalancesConfig = BaseUseQueryConfig<CoinBalance[]> & {
  address: string | null;
  pagination?: CursorPaginationArgs;
};

function useBalances(config: UseBalancesConfig): BaseUseQueryResult<CoinBalance[]> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['balances', config.address],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.address) throw AddressNotCorrect;
      const address = Address.fromString(config.address);
      const balances = await defaultProvider.getBalances(address, config.pagination);
      return balances.map((balance) => ({
        amount: balance.amount.toString(),
        assetId: balance.assetId,
        max: balance.max?.toString(),
      }));
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.address,
  });

  return {
    data,
    status,
    error,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
}

export default useBalances;

import { useQuery } from '@tanstack/react-query';
import { Address } from 'fuels';
import type { Coin, CursorPaginationArgs } from 'fuels';
import { useClient } from '../../context';
import { AddressNotCorrect } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type UseCoinsConfig = BaseUseQueryConfig<Coin[]> & {
  address: string | null;
  assetId?: string;
  pagination?: CursorPaginationArgs;
};

function useCoins(config: UseCoinsConfig): BaseUseQueryResult<Coin[]> {
  const client = useClient();

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['coins', config.address],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      if (!config.address) throw AddressNotCorrect;
      const address = Address.fromString(config.address);
      const coins = await provider.getCoins(address, config.assetId, config.pagination);
      return coins;
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
    enabled: !!config?.address,
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

export default useCoins;

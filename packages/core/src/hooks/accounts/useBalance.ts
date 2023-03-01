import { useQuery } from '@tanstack/react-query';
import { Address, NativeAssetId } from 'fuels';
import { useClient } from '../../context';
import { AddressNotCorrect } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type UseBalanceConfig = BaseUseQueryConfig<string> & {
  address: string | null;
  assetId?: string;
};

function useBalance(config: UseBalanceConfig): BaseUseQueryResult<string> {
  const client = useClient();

  const { data, status, error, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['balance', config.address],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      if (!config.address) throw AddressNotCorrect;
      const address = Address.fromString(config.address);
      const assetId = config.assetId || NativeAssetId;
      const balance = await provider.getBalance(address, assetId);
      return balance.toString();
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

export default useBalance;

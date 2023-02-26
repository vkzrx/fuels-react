import { useQuery } from '@tanstack/react-query';
import { Address, NativeAssetId } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { AddressNotCorrect, ProviderNotDefined } from '../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../types';

type UseBalanceConfig = BaseUseQueryConfig<string> & {
  address: string | null;
  assetId?: string;
};

function useBalance(config: UseBalanceConfig): BaseUseQueryResult<string> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.address) throw AddressNotCorrect;
      const address = Address.fromString(config.address);
      const assetId = config.assetId || NativeAssetId;
      const balance = await defaultProvider.getBalance(address, assetId);
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

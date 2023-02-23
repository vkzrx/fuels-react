import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query';
import { Address, NativeAssetId } from 'fuels';
import type { BytesLike } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { AddressNotCorrect, ProviderNotDefined } from '../errors';

type UseBalanceConfig = Pick<UseQueryOptions<string>, 'onSuccess' | 'onError'> & {
  owner: string | null;
  assetId?: BytesLike;
};

function useBalance(config: UseBalanceConfig) {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, error, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['balance'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.owner) throw AddressNotCorrect;
      const address = Address.fromString(config.owner);
      const assetId = config.assetId || NativeAssetId;
      const balance = await defaultProvider.getBalance(address, assetId);
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

export default useBalance;

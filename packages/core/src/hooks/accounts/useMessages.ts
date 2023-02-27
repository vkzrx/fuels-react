import { useQuery } from '@tanstack/react-query';
import { Address } from 'fuels';
import type { CursorPaginationArgs, Message } from 'fuels';
import { useSnapshot } from 'valtio';
import { AddressNotCorrect, ProviderNotDefined } from '../../errors';
import { providerStore } from '../../stores';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type UseMessagesConfig = BaseUseQueryConfig<Message[]> & {
  address: string | null;
  pagination?: CursorPaginationArgs;
  refetchInterval?: number | false;
};

function useMessages(config?: UseMessagesConfig): BaseUseQueryResult<Message[]> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['messages'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config?.address) throw AddressNotCorrect;
      const address = Address.fromString(config.address);
      const messages = await defaultProvider.getMessages(address, config.pagination);
      return messages;
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
    enabled: !!config?.address,
    refetchInterval: config?.refetchInterval,
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

export default useMessages;

import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Provider } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { ProviderNotDefined, TransactionIDNotCorrect, TransactionNotFound } from '../errors';

type TransactionResponseData = Exclude<Awaited<ReturnType<Provider['getTransaction']>>, null>;

type UseTransactionConfig = Pick<
  UseQueryOptions<TransactionResponseData>,
  'onSuccess' | 'onError'
> & {
  transactionId: string | null;
};

function useTransaction(config: UseTransactionConfig): UseQueryResult<TransactionResponseData> {
  const { defaultProvider } = useSnapshot(providerStore);

  const result = useQuery({
    queryKey: ['transaction', config.transactionId],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.transactionId) throw TransactionIDNotCorrect;
      const result = await defaultProvider.getTransaction(config.transactionId);
      if (!result) throw TransactionNotFound;
      return result;
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.transactionId,
  });

  return result;
}

export default useTransaction;

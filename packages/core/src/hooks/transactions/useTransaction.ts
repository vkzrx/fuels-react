import { useQuery } from '@tanstack/react-query';
import type { Provider } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../../stores';
import { ProviderNotDefined, TransactionIDNotCorrect, TransactionNotFound } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type TransactionResponseData = NonNullable<Awaited<ReturnType<Provider['getTransaction']>>>;

type UseTransactionConfig = BaseUseQueryConfig<TransactionResponseData> & {
  transactionId: string | null;
};

type UseTransactionResult = BaseUseQueryResult<TransactionResponseData>;

function useTransaction(config: UseTransactionConfig): UseTransactionResult {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['transaction', config.transactionId],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.transactionId) throw TransactionIDNotCorrect;
      const transaction = await defaultProvider.getTransaction(config.transactionId);
      if (!transaction) throw TransactionNotFound;
      return transaction;
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.transactionId,
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

export default useTransaction;

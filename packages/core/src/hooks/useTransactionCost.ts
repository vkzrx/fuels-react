import { useQuery } from '@tanstack/react-query';
import type { Provider, TransactionRequestLike } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { ProviderNotDefined, TransactionRequestNotCorrect } from '../errors';
import { BaseUseQueryConfig, BaseUseQueryResult } from '../types';

type TransactionCostResponse = Awaited<ReturnType<Provider['getTransactionCost']>>;

type UseTransactionCostConfig = BaseUseQueryConfig<TransactionCostResponse> & {
  transactionRequest: TransactionRequestLike | null;
  tolerance?: number;
};

function useTransactionCost(
  config: UseTransactionCostConfig,
): BaseUseQueryResult<TransactionCostResponse> {
  const { defaultProvider } = useSnapshot(providerStore);

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['transactionCost'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      if (!config.transactionRequest) throw TransactionRequestNotCorrect;
      const transactionCost = await defaultProvider.getTransactionCost(
        config.transactionRequest,
        config.tolerance,
      );
      return transactionCost;
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.transactionRequest,
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

export default useTransactionCost;

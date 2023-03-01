import { useQuery } from '@tanstack/react-query';
import type { Provider, TransactionRequestLike } from 'fuels';
import { useClient } from '../../context';
import { TransactionRequestNotCorrect } from '../../errors';
import { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type TransactionCostResponse = Awaited<ReturnType<Provider['getTransactionCost']>>;

type UseTransactionCostConfig = BaseUseQueryConfig<TransactionCostResponse> & {
  transactionRequest: TransactionRequestLike | null;
  tolerance?: number;
};

function useTransactionCost(
  config: UseTransactionCostConfig,
): BaseUseQueryResult<TransactionCostResponse> {
  const client = useClient();

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['transactionCost', config.transactionRequest],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      if (!config.transactionRequest) throw TransactionRequestNotCorrect;
      const transactionCost = await provider.getTransactionCost(
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

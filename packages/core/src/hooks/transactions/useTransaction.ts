import { useQuery } from '@tanstack/react-query';
import type { Provider } from 'fuels';
import useChains from '../networks/useChains';
import { useClient } from '../../context';
import { TransactionIDNotCorrect, TransactionNotFound } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type TransactionResponseData = NonNullable<Awaited<ReturnType<Provider['getTransaction']>>>;

type UseTransactionConfig = BaseUseQueryConfig<TransactionResponseData> & {
  transactionId: string | null;
};

type UseTransactionResult = BaseUseQueryResult<TransactionResponseData>;

function useTransaction(config: UseTransactionConfig): UseTransactionResult {
  const client = useClient();
  const { currentChain } = useChains();

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['transaction', config.transactionId, currentChain?.name],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      if (!config.transactionId) throw TransactionIDNotCorrect;
      const transaction = await provider.getTransaction(config.transactionId);
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

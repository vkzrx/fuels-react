import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import type { Provider, TransactionRequestLike } from 'fuels';
import { useSnapshot } from 'valtio';
import { providerStore } from '../stores';
import { ProviderNotDefined, TransactionNotFound } from '../errors';

type TransactionCostResponseData = Exclude<
  Awaited<ReturnType<Provider['getTransactionCost']>>,
  null
>;

type UseTransactionCostConfig = Pick<
  UseQueryOptions<TransactionCostResponseData>,
  'onSuccess' | 'onError'
> & {
  transactionRequest: TransactionRequestLike;
  tolerance?: number;
};

function useTransactionCost(
  config: UseTransactionCostConfig,
): UseQueryResult<TransactionCostResponseData> {
  const { defaultProvider } = useSnapshot(providerStore);

  const result = useQuery({
    queryKey: ['transactionCost'],
    queryFn: async () => {
      if (!defaultProvider) throw ProviderNotDefined;
      const result = await defaultProvider.getTransactionCost(
        config.transactionRequest,
        config.tolerance,
      );
      if (!result) throw TransactionNotFound;
      return result;
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
  });

  return result;
}

export default useTransactionCost;

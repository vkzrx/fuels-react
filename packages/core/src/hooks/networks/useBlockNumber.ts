import { useQuery } from '@tanstack/react-query';
import useChains from '../networks/useChains';
import { useClient } from '../../context';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type UseBlockNumberConfig = BaseUseQueryConfig<string> & {
  refetchInterval?: number | false;
};

function useBlockNumber(config?: UseBlockNumberConfig): BaseUseQueryResult<string> {
  const client = useClient();
  const { currentChain } = useChains();

  const { data, status, error, isError, isLoading, isFetching, isSuccess } = useQuery({
    queryKey: ['blockNumber', currentChain?.name],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      const blockNumber = await provider.getBlockNumber();
      return blockNumber.toString();
    },
    onSuccess: config?.onSuccess,
    onError: config?.onError,
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

export default useBlockNumber;

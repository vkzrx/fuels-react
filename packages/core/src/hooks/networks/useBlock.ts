import { useQuery } from '@tanstack/react-query';
import type { Block as FuelBlock } from 'fuels';
import useChains from './useChains';
import { useClient } from '../../context';
import { BlockNotFound } from '../../errors';
import type { BaseUseQueryConfig, BaseUseQueryResult } from '../../types';

type Block = Omit<FuelBlock, 'height'> & {
  height: string;
};

export type UseBlockConfig<T = Block> = BaseUseQueryConfig<T> & {
  idOrHeight: string | number | null;
};

export type UseBlockResult<T = Block> = BaseUseQueryResult<T>;

function useBlock(config: UseBlockConfig): UseBlockResult {
  const client = useClient();
  const { currentChain } = useChains();

  const { data, error, status, isError, isFetching, isLoading, isSuccess } = useQuery({
    queryKey: ['block', config.idOrHeight, currentChain?.name],
    queryFn: async () => {
      const provider = client.getDefaultProvider();
      if (!config.idOrHeight) throw BlockNotFound;

      let blockId = config.idOrHeight;

      // somehow we need to check if we are passing a number stringified
      // otherwise it gets treated as a transactionId which impacts the result
      // this is a very small workaround, need to better handle it
      if (typeof blockId === 'string') {
        if (!isNaN(Number(blockId))) {
          blockId = Number(blockId);
        }
      }

      const block = await provider.getBlock(blockId);
      if (!block) throw BlockNotFound;
      return {
        id: block.id,
        height: block.height.toString(),
        time: block.time,
        transactionIds: block.transactionIds,
      };
    },
    onSuccess: config.onSuccess,
    onError: config.onError,
    enabled: !!config.idOrHeight,
  });

  return {
    data,
    error,
    status,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  };
}

export default useBlock;

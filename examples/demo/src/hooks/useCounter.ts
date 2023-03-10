import { useQuery, useQueryClient, useMutation } from 'fuels-react';
import { useContract } from 'fuels-react';
import type { CounterAbi } from '../contracts';
import abi from '../contracts/Counter-abi.json';

const address = '0x90efcc9a055fe39c840ccf785e63f7b062363e5a14c51854d616e17c20b40d74';

function useCounter() {
  const queryClient = useQueryClient();
  const contract = useContract<CounterAbi>({ address, abi });

  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ['counter'],
    queryFn: async () => {
      if (!contract) throw new Error('contract not defined');
      const result = await contract.functions.counter().get();
      return result.value;
    },
    enabled: !!contract,
  });

  const incrementMutation = useMutation({
    mutationKey: ['increment'],
    // ugly way to bypass passing void variables to mutate()
    mutationFn: async (_: null) => {
      if (!contract) throw new Error('contract not defined');
      const result = await contract.functions.increment().call();
      return {
        value: result.value,
        gasUsed: result.gasUsed,
        transactionId: result.transactionId,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counter'] });
    },
  });

  const decrementMutation = useMutation({
    mutationKey: ['decrement'],
    // ugly way to bypass passing void variables to mutate()
    mutationFn: async (_: null) => {
      if (!contract) throw new Error('contract not defined');
      const result = await contract.functions.decrement().call();
      return {
        value: result.value,
        gasUsed: result.gasUsed,
        transactionId: result.transactionId,
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['counter'] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isSuccess,
    increment: {
      mutate: (...params: [...Parameters<typeof incrementMutation.mutate>]) =>
        incrementMutation.mutate(...params),
      data: incrementMutation.data,
      status: incrementMutation.status,
      error: incrementMutation.error,
      isError: incrementMutation.isError,
      isLoading: incrementMutation.isLoading,
      isSuccess: incrementMutation.isSuccess,
    },
    decrement: {
      mutate: (...params: [...Parameters<typeof decrementMutation.mutate>]) =>
        decrementMutation.mutate(...params),
      data: decrementMutation.data,
      status: decrementMutation.status,
      error: decrementMutation.error,
      isError: decrementMutation.isError,
      isLoading: decrementMutation.isLoading,
      isSuccess: decrementMutation.isSuccess,
    },
  };
}

export default useCounter;

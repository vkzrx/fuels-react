import { useEffect, useState } from 'react';
import { Contract } from 'fuels';
import type { AbstractAddress, Interface, JsonAbi } from 'fuels';
import { subscribe } from 'valtio';
import { useClient } from '../../context';
import { userStore } from '../../stores';

type UseContractReadConfig<T extends Contract> = {
  contractId: string | AbstractAddress;
  abi: JsonAbi | Interface;
  function: {
    [K in keyof T['functions']]: {
      name: K;
      args: Parameters<T['functions'][K]>;
    };
  }[keyof T['functions']];
};

function useContractRead<T extends Contract>(config: UseContractReadConfig<T>): T | null {
  const { contractId, abi } = config;

  const client = useClient();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    // https://valtio.pmnd.rs/docs/how-tos/how-to-avoid-rerenders-manually
    const callback = () => {
      const provider = client.getDefaultProvider();
      const contract = new Contract(contractId, abi, provider);
      setContract(contract);
    };

    const unsubscribe = subscribe(userStore, callback);

    callback();

    return unsubscribe;
  }, []);

  return contract as T | null;
}

export default useContractRead;

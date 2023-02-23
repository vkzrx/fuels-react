import { useEffect, useState } from 'react';
import { Contract } from 'fuels';
import type { AbstractAddress, Interface, JsonAbi } from 'fuels';
import { subscribe, useSnapshot } from 'valtio';
import { ProviderNotDefined } from '../errors';
import { providerStore } from '../stores';

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

  const { defaultProvider } = useSnapshot(providerStore);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    // https://valtio.pmnd.rs/docs/how-tos/how-to-avoid-rerenders-manually
    const callback = () => {
      if (!defaultProvider) throw ProviderNotDefined;
      const contract = new Contract(contractId, abi, defaultProvider);
      setContract(contract);
    };

    const unsubscribe = subscribe(providerStore, callback);
    callback();
    return unsubscribe;
  }, []);

  return contract as T | null;
}

export default useContractRead;

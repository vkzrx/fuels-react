import { useEffect, useState } from 'react';
import type { FuelWalletLocked } from '@fuel-wallet/sdk';
import { Contract } from 'fuels';
import type { AbstractAddress, Interface, JsonAbi, Provider } from 'fuels';
import { subscribe, useSnapshot } from 'valtio';
import { ProviderNotDefined } from '../errors';
import { providerStore, userStore } from '../stores';

type UseContractConfig = {
  contractId: string | AbstractAddress;
  abi: JsonAbi | Interface;
  signerOrProvider?: FuelWalletLocked | Provider;
};

function useContract<T extends Contract>(config: UseContractConfig): T | null {
  const { contractId, abi, signerOrProvider } = config;

  const { defaultProvider } = useSnapshot(providerStore);
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    // https://valtio.pmnd.rs/docs/how-tos/how-to-avoid-rerenders-manually
    const callback = () => {
      if (!defaultProvider) throw ProviderNotDefined;

      let walletOrProvider: FuelWalletLocked | Provider = defaultProvider;

      if (signerOrProvider) {
        walletOrProvider = signerOrProvider;
      } else if (userStore.wallet) {
        walletOrProvider = userStore.wallet;
      }

      const contract = new Contract(contractId, abi, walletOrProvider);
      setContract(contract);
    };

    const unsubscribe = subscribe(userStore, callback);
    callback();

    return unsubscribe;
  }, []);

  return contract as T | null;
}

export default useContract;

import { useEffect, useState } from 'react';
import { Contract } from 'fuels';
import type { AbstractAddress, BaseWalletLocked, Interface, JsonAbi, Provider } from 'fuels';
import { subscribe } from 'valtio';
import { useClient } from '../../context';
import { userStore } from '../../stores';

type UseContractConfig = {
  address: string | AbstractAddress;
  abi: JsonAbi | Interface;
  signerOrProvider?: BaseWalletLocked | Provider;
};

function useContract<T extends Contract>(config: UseContractConfig): T | null {
  const { address, abi, signerOrProvider } = config;

  const client = useClient();
  const [contract, setContract] = useState<Contract | null>(null);

  useEffect(() => {
    // https://valtio.pmnd.rs/docs/how-tos/how-to-avoid-rerenders-manually
    const callback = () => {
      const defaultProvider = client.getDefaultProvider();

      let walletOrProvider: BaseWalletLocked | Provider = defaultProvider;

      if (signerOrProvider) {
        walletOrProvider = signerOrProvider;
      } else if (userStore.wallet) {
        walletOrProvider = userStore.wallet;
      }

      const contract = new Contract(address, abi, walletOrProvider);
      setContract(contract);
    };

    const unsubscribe = subscribe(userStore, callback);

    callback();

    return unsubscribe;
  }, []);

  return contract as T | null;
}

export default useContract;

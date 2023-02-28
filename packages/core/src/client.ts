import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';
import { Provider } from 'fuels';
import { IS_BROWSER } from './constants';
import { providerStore, userStore } from './stores';
import type { Chain } from './stores';
import type { NonEmptyArray } from './types';

export type ClientConfig = {
  chains: NonEmptyArray<Chain['name']>;
  queryClientConfig?: QueryClientConfig;
};

const chainToURL: Record<Chain['name'], string> = {
  'beta-1': 'https://node-beta-1.fuel.network/graphql',
  'beta-2': 'https://node-beta-2.fuel.network/graphql',
  localhost: 'http://127.0.0.1:4000/graphql',
};

class Client {
  readonly chains: Chain[];
  readonly queryClient: QueryClient;

  constructor(config: ClientConfig) {
    this.queryClient = new QueryClient(config.queryClientConfig);

    const chains = config.chains.map<Chain>((name) => ({ name, url: chainToURL[name] }));
    this.chains = chains;

    // `chains` is a `NonEmptyArray`
    const currentChain = chains[0];

    providerStore.fuel = window.fuel || null;
    providerStore.defaultProvider = new Provider(currentChain.url);
    providerStore.chains = chains;
    providerStore.currentChain = currentChain;

    this.asyncInitializeStores();

    if (IS_BROWSER) {
      // add `fuel` to store once injected
      document.addEventListener('FuelLoaded', () => {
        if (providerStore.fuel) return;
        if (!window.fuel) return;
        providerStore.fuel = window.fuel;
      });
    }
  }

  // Used to retrieve async data
  async asyncInitializeStores() {
    const { fuel } = providerStore;
    // no provider injected
    if (!fuel) return;
    if (!(await fuel.isConnected())) return;
    const currentAccount = await fuel.currentAccount();
    userStore.wallet = await fuel.getWallet(currentAccount);
  }
}

export default Client;

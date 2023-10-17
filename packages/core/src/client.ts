import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';
import { Provider } from 'fuels';
import type { Fuel } from '@fuel-wallet/sdk';
import { store } from './stores';
import type { Chain } from './stores';
import type { NonEmptyArray } from './types';
import { InjectedConnector } from './connectors/injected';
import { ChainNotConfigured, ClientNotDefined, ProviderNotDefined } from './errors';
import type { Connector } from './connectors/base';
import { wait } from './utils';

export type ClientConfig = {
  chains: NonEmptyArray<Chain['name']>;
  queryClientConfig?: QueryClientConfig;
};

const chainToURL: Record<Chain['name'], string> = {
  'beta-1': 'https://node-beta-1.fuel.network/graphql',
  'beta-2': 'https://node-beta-2.fuel.network/graphql',
  'beta-3': 'https://beta-3.fuel.network/graphql',
  'beta-4': 'https://beta-4.fuel.network/graphql',
  localhost: 'http://127.0.0.1:4000/graphql',
};

class Client {
  readonly chains: Chain[];
  readonly queryClient: QueryClient;

  connector: Connector;

  // used to perform action where user wallet is not required
  // i.e. fetch blocks, transactions etc...
  #defaultProvider!: Provider;

  constructor({
    chains,
    queryClientConfig = {
      defaultOptions: {
        queries: {
          cacheTime: 1_000 * 60 * 60 * 24, // 24 hours
          refetchOnWindowFocus: false,
          retry: 0,
        },
      },
    },
  }: ClientConfig) {
    this.queryClient = new QueryClient(queryClientConfig);
    this.connector = new InjectedConnector();
    this.chains = chains.map<Chain>((name) => ({ name, url: chainToURL[name] }));

    // chains is a NonEmptyArray
    const currentChain = this.chains[0];
    Provider.create(currentChain.url).then((provider) => {
      this.#defaultProvider = provider;
      this.asyncInitialzeStore();
    });
  }

  isChainConfigured(name: Chain['name']): boolean {
    return !!this.chains.find((chain) => chain.name === name);
  }

  getProvider(): Fuel {
    const provider = this.connector.getProvider();
    if (!provider) throw new ProviderNotDefined();
    return provider;
  }

  getDefaultProvider(): Provider {
    return this.#defaultProvider;
  }

  async setDefaultProvider(chain: Chain): Promise<Provider> {
    this.#defaultProvider = await Provider.create(chain.url);
    return this.#defaultProvider;
  }

  async asyncInitialzeStore() {
    // https://wallet.fuel.network/docs/how-to-use
    // Fuel provider can be injected after the app has loaded
    if (!this.connector.isReady()) {
      await wait(200);
      // assume user has no wallet installed
      if (!this.connector.isReady()) {
        store.status = 'disconnected';
        return;
      }
    }
    const provider = this.getProvider();
    // no provider injected
    if (!provider || !(await provider.isConnected())) {
      store.status = 'disconnected';
      return;
    }

    const currentAccount = await provider.currentAccount();
    const wallet = await provider.getWallet(currentAccount);
    const chain = await wallet.provider.getChain();

    const currentChain: Chain = {
      name: 'localhost',
      url: wallet.provider.url,
    };
    if (chain.name === 'Testnet Beta 4') currentChain.name = 'beta-4';
    if (chain.name === 'Testnet Beta 3') currentChain.name = 'beta-3';
    if (chain.name === 'Testnet Beta 2') currentChain.name = 'beta-2';
    if (chain.name === 'Testnet Beta 1') currentChain.name = 'beta-1';

    if (!this.isChainConfigured(currentChain.name)) {
      throw new ChainNotConfigured();
    }

    store.wallet = wallet;
    store.status = 'connected';
    store.address = currentAccount;
    store.currentChain = currentChain;

    provider.on(provider.events.currentAccount, this.connector.onAccountChanged);
    provider.on(provider.events.network, this.connector.onChainChanged);
  }
}

let client: Client | null = null;

function createClient(options: ClientConfig): Client {
  if (!client) {
    client = new Client(options);
  }
  return client;
}

function getClient(): Client {
  if (!client) throw new ClientNotDefined();
  return client;
}

export { createClient, getClient, Client };

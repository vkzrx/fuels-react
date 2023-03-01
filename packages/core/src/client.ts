import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';
import { Provider } from 'fuels';
import type { Fuel } from '@fuel-wallet/sdk';
import { userStore } from './stores';
import type { Chain } from './stores';
import type { NonEmptyArray } from './types';
import { InjectedConnector } from './connectors/injected';
import { ClientNotDefined, ProviderNotDefined } from './errors';
import { Connector } from './connectors/base';

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

  connector: Connector;

  #provider: Fuel | undefined;
  // used to perform action where user wallet is not required
  // i.e. fetch blocks, transactions etc...
  #defaultProvider: Provider;

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

    // `chains` is a `NonEmptyArray`
    const currentChain = this.chains[0];
    this.#defaultProvider = new Provider(currentChain.url);
    userStore.currentChain = currentChain;

    this.asyncInitializeStores();
  }

  getProvider(): Fuel {
    const provider = this.connector.getProvider();
    if (!provider) throw ProviderNotDefined;
    if (!this.#provider) this.#provider = provider;
    return provider;
  }

  getDefaultProvider(): Provider {
    return this.#defaultProvider;
  }

  // Used to retrieve async data
  async asyncInitializeStores() {
    const provider = this.getProvider();
    // no provider injected
    if (!provider) return;
    if (!(await provider.isConnected())) return;
    const currentAccount = await provider.currentAccount();
    userStore.wallet = await provider.getWallet(currentAccount);
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
  if (!client) throw ClientNotDefined;
  return client;
}

export { createClient, getClient, Client };

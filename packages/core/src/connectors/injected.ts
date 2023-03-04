import type { Fuel } from '@fuel-wallet/sdk';
import { Connector, type FuelChainConfig } from './base';
import { IS_BROWSER } from '../constants';
import { ProviderNotDefined, UserAlreadyConnected, UserAlreadyDisconnected } from '../errors';
import { store, type Chain } from '../stores';
import { asyncFaillable } from '../utils';
import { getClient } from '../client';

export class InjectedConnector extends Connector<Fuel> {
  constructor() {
    super();
  }

  getProvider(): Fuel | undefined {
    return IS_BROWSER ? window.fuel : undefined;
  }

  async connect(): Promise<void> {
    const provider = this.getProvider();
    if (!provider) throw ProviderNotDefined;
    if (store.status === 'connected') throw UserAlreadyConnected;

    store.status = 'connecting';

    const askConnection = await asyncFaillable(provider.connect());

    if (askConnection.failed) {
      store.status = 'disconnected';
      throw askConnection.reason;
    }

    provider.on(provider.events.currentAccount, this.onAccountChanged);
    provider.on(provider.events.network, this.onChainChanged);

    const currentAccount = await provider.currentAccount();
    store.status = 'connected';
    store.address = currentAccount;
    store.wallet = await provider.getWallet(currentAccount);
  }

  async disconnect(): Promise<void> {
    const provider = this.getProvider();
    if (!provider) throw ProviderNotDefined;
    if (store.status === 'disconnected') throw UserAlreadyDisconnected;

    store.status = 'disconnecting';

    const askDisconnection = await asyncFaillable(provider.disconnect());

    if (askDisconnection.failed) {
      store.status = 'connected';
      throw askDisconnection.reason;
    }

    provider.removeListener(provider.events.currentAccount, this.onAccountChanged);
    provider.removeListener(provider.events.network, this.onChainChanged);

    store.status = 'disconnected';
    store.address = null;
    store.wallet = null;
    store.currentChain = null;
  }

  onAccountChanged(newAccount: string): void {
    store.address = newAccount;
  }

  onChainChanged(newChain: FuelChainConfig): void {
    const client = getClient();
    const chain: Chain = {
      name: 'localhost',
      url: newChain.url,
    };
    if (newChain.id === '4') chain.name = 'beta-1';
    if (newChain.id === '1') chain.name = 'beta-2';
    store.currentChain = chain;
    client.setDefaultProvider(chain);
  }
}

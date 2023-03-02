import type { Fuel } from '@fuel-wallet/sdk';
import { Connector, type FuelChainConfig } from './base';
import { IS_BROWSER } from '../constants';
import { ProviderNotDefined, UserAlreadyConnected, UserAlreadyDisconnected } from '../errors';
import { store } from '../stores';
import { asyncFaillable } from '../utils';

export class InjectedConnector extends Connector<Fuel> {
  constructor() {
    super();
  }

  getProvider(): Fuel | undefined {
    return IS_BROWSER ? window.fuel : undefined;
  }

  async connect() {
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

  async disconnect() {
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

  onAccountChanged(newAccount: string) {
    store.address = newAccount;
  }

  onChainChanged(newChain: FuelChainConfig) {
    store.currentChain = {
      // TODO: fix this to map to actual chain name
      name: store.currentChain!.name,
      url: newChain.url,
    };
  }
}

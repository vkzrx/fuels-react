import type { Fuel } from '@fuel-wallet/sdk';
import { Connector, type FuelChainConfig } from './base';
import { IS_BROWSER } from '../constants';
import { ProviderNotDefined, UserAlreadyConnected, UserAlreadyDisconnected } from '../errors';
import { userStore } from '../stores';
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
    if (userStore.status === 'connected') throw UserAlreadyConnected;

    userStore.status = 'connecting';

    const askConnection = await asyncFaillable(provider.connect());

    if (askConnection.failed) {
      userStore.status = 'disconnected';
      throw askConnection.reason;
    }

    provider.on(provider.events.currentAccount, this.onAccountChanged);
    provider.on(provider.events.network, this.onChainChanged);

    const currentAccount = await provider.currentAccount();
    userStore.status = 'connected';
    userStore.address = currentAccount;
    userStore.wallet = await provider.getWallet(currentAccount);
  }

  async disconnect() {
    const provider = this.getProvider();
    if (!provider) throw ProviderNotDefined;
    if (userStore.status === 'disconnected') throw UserAlreadyDisconnected;

    userStore.status = 'disconnecting';

    const askDisconnection = await asyncFaillable(provider.disconnect());

    if (askDisconnection.failed) {
      userStore.status = 'connected';
      throw askDisconnection.reason;
    }

    provider.removeListener(provider.events.currentAccount, this.onAccountChanged);
    provider.removeListener(provider.events.network, this.onChainChanged);

    userStore.status = 'disconnected';
    userStore.address = null;
    userStore.wallet = null;
    userStore.currentChain = null;
  }

  onAccountChanged(newAccount: string) {
    userStore.address = newAccount;
  }

  onChainChanged(newChain: FuelChainConfig) {
    userStore.currentChain = {
      // TODO: fix this to map to actual chain name
      name: userStore.currentChain!.name,
      url: newChain.url,
    };
  }
}

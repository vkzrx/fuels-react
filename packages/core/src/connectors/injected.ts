import type { Fuel } from '@fuel-wallet/sdk';
import { Connector } from './base';
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

    provider.on('currentAccount', (currentAccount) => {
      console.log({ currentAccount });
      userStore.address = currentAccount;
    });

    const askConnection = await asyncFaillable(provider.connect());

    if (askConnection.failed) {
      userStore.status = 'disconnected';
      throw askConnection.reason;
    }

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

    userStore.status = 'disconnected';
    userStore.address = null;
    userStore.wallet = null;
  }
}

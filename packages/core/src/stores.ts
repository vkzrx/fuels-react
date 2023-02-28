import type { Fuel, FuelWalletLocked } from '@fuel-wallet/sdk';
import type { Provider } from 'fuels';
import { proxy } from 'valtio';
import { watch } from 'valtio/utils';
import { IS_BROWSER } from './constants';
import { ProviderNotDefined, UserAlreadyConnected, UserAlreadyDisconnected } from './errors';
import { asyncFaillable } from './utils';

export type Chain = {
  name: 'beta-1' | 'beta-2' | 'localhost';
  url: string;
};

export type ProviderStore = {
  fuel: Fuel | null;
  defaultProvider: Provider | null;
  chains: Chain[] | null;
  currentChain: Chain | null;
};

export type UserStatus = 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'locked';

export type UserStore = {
  address: string | null;
  wallet: FuelWalletLocked | null;
  status: UserStatus;
};

export const providerStore = proxy<ProviderStore>({
  fuel: null,
  defaultProvider: null,
  chains: null,
  currentChain: null,
});

const getPersistedUserState = (): UserStore | null => {
  if (!IS_BROWSER) return null;
  const rawState = localStorage.getItem('fuels-react-state');
  if (rawState === null) return null;
  const state = JSON.parse(rawState) as UserStore;
  if (state.status === 'disconnected') return null;
  return {
    address: state.address,
    wallet: null, // created in initializedStores()
    status: state.status,
  };
};

export const userStore = proxy<UserStore>(
  getPersistedUserState() || {
    address: null,
    wallet: null,
    status: 'disconnected',
  },
);

watch((get) => {
  const userState = get(userStore);
  localStorage.setItem(
    'fuels-react-state',
    JSON.stringify({
      address: userState.address,
      status: userState.status,
    }),
  );
});

export const connect = async () => {
  if (!providerStore.fuel) throw ProviderNotDefined;
  if (userStore.status === 'connected') throw UserAlreadyConnected;

  userStore.status = 'connecting';

  const { fuel } = providerStore;
  const askConnection = await asyncFaillable(fuel.connect());

  if (askConnection.failed) {
    userStore.status = 'disconnected';
    throw askConnection.reason;
  }

  const currentAccount = await fuel.currentAccount();

  userStore.status = 'connected';
  userStore.address = currentAccount;
  userStore.wallet = await fuel.getWallet(currentAccount);
  providerStore.fuel = fuel;
};

export const disconnect = async () => {
  if (!providerStore.fuel) throw ProviderNotDefined;
  if (userStore.status === 'disconnected') throw UserAlreadyDisconnected;

  userStore.status = 'disconnecting';

  const { fuel } = providerStore;
  const askDisconnection = await asyncFaillable(fuel.disconnect());

  if (askDisconnection.failed) {
    userStore.status = 'connected';
    throw askDisconnection.reason;
  }

  userStore.status = 'disconnected';
  userStore.address = null;
  userStore.wallet = null;
};

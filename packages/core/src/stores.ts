import type { Provider } from 'fuels';
import type { FuelWalletLocked } from '@fuel-wallet/sdk';
import { proxy } from 'valtio';
import { watch } from 'valtio/utils';
import { getClient } from './client';
import { IS_BROWSER } from './constants';

export type Chain = {
  name: 'beta-1' | 'beta-2' | 'localhost';
  url: string;
};

export type ProviderStore = {
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
  const client = getClient();
  const connector = client.connector;
  await connector.connect();
};

export const disconnect = async () => {
  const client = getClient();
  const connector = client.connector;
  await connector.disconnect();
};

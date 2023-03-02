import type { FuelWalletLocked } from '@fuel-wallet/sdk';
import { proxy } from 'valtio';
import { watch } from 'valtio/utils';
import { getClient } from './client';
import { IS_BROWSER } from './constants';

export type Chain = {
  name: 'beta-1' | 'beta-2' | 'localhost';
  url: string;
};

export type UserStatus = 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'locked';

export type StoreState = {
  address: string | null;
  wallet: FuelWalletLocked | null;
  status: UserStatus;
  currentChain: Chain | null;
};

const getPersistedUserState = (): StoreState | null => {
  if (!IS_BROWSER) return null;
  const rawState = localStorage.getItem('fuels-react-state');
  if (rawState === null) return null;
  const state = JSON.parse(rawState) as StoreState;
  if (state.status === 'disconnected') return null;
  return {
    address: state.address,
    wallet: null, // created in asyncInitializedStores()
    status: state.status,
    currentChain: state.currentChain,
  };
};

export const store = proxy<StoreState>(
  getPersistedUserState() || {
    address: null,
    wallet: null,
    currentChain: null,
    status: 'disconnected',
  },
);

watch((get) => {
  const userState = get(store);
  localStorage.setItem(
    'fuels-react-state',
    JSON.stringify({
      address: userState.address,
      status: userState.status,
      currentChain: store.currentChain,
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

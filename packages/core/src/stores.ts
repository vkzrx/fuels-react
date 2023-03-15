import type { FuelWalletLocked } from '@fuel-wallet/sdk';
import { proxy } from 'valtio';
import { getClient } from './client';

export type Chain = {
  name: 'beta-1' | 'beta-2' | 'beta-3' | 'localhost';
  url: string;
};

export type UserStatus = 'connected' | 'connecting' | 'disconnected' | 'disconnecting' | 'loading';

export type StoreState = {
  address: string | null;
  wallet: FuelWalletLocked | null;
  status: UserStatus;
  currentChain: Chain | null;
};

export const store = proxy<StoreState>({
  address: null,
  wallet: null,
  currentChain: null,
  status: 'loading',
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

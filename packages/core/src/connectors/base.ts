import type { Fuel } from '@fuel-wallet/sdk';

export type FuelChainConfig = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  id: 'Testnet Beta 1' | 'Testnet Beta 2' | (string & {});
  url: string;
};

export abstract class Connector<TProvider = Fuel> {
  abstract getProvider(): TProvider | undefined;
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract onAccountChanged(newAccount: string): void;
  abstract onChainChanged(newChain: FuelChainConfig): void;
}

import type { Fuel } from '@fuel-wallet/sdk';

export type FuelChainConfig = {
  id: string;
  url: string;
};

export abstract class Connector<TProvider = Fuel> {
  abstract getProvider(): TProvider | undefined;
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract onAccountChanged(newAccount: string): void;
  abstract onChainChanged(newChain: FuelChainConfig): void;
}

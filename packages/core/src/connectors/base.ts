import type { Fuel } from '@fuel-wallet/sdk';

export abstract class Connector<TProvider = Fuel> {
  abstract getProvider(): TProvider | undefined;
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}

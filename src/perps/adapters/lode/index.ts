import { IPerpsAdapter } from '../base';

export class LodeAdapter implements IPerpsAdapter {
  constructor(
    private readonly config: {
      network: string;
      // Add any protocol-specific configuration
    }
  ) {}

  async getPairs(): Promise<string[]> {
    // Implementation for fetching available trading pairs
    throw new Error('Not implemented');
  }

  async getAssetPrice(pair: string): Promise<number> {
    // Implementation for fetching asset price
    throw new Error('Not implemented');
  }

  async getFundingRate(pair: string): Promise<number> {
    // Implementation for fetching funding rate
    throw new Error('Not implemented');
  }

  // Optional methods
  getNetwork(): string {
    return this.config.network;
  }

  getProtocolName(): string {
    return 'Lode';
  }
}

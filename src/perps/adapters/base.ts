export interface IPerpsAdapter {
  // Required methods that all adapters must implement
  getPairs(): Promise<string[]>;
  getAssetPrice(pair: string): Promise<number>;
  getFundingRate(pair: string): Promise<number>;

  // Optional methods with default implementation
  getNetwork?(): string;
  getProtocolName?(): string;
} 
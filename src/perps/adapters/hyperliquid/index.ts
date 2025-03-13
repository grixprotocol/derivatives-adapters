/**
 * Hyperliquid Adapter for Grix Protocol
 * 
 * This adapter implements the IPerpsAdapter interface for the Hyperliquid protocol.
 * 
 * Installation:
 * To use this adapter, you need to install the Hyperliquid SDK:
 * 
 * ```bash
 * # npm
 * npm install @nktkas/hyperliquid
 * 
 * # yarn
 * yarn add @nktkas/hyperliquid
 * 
 * # pnpm
 * pnpm add @nktkas/hyperliquid
 * ```
 */

import { IPerpsAdapter } from '../base';
import * as hl from '@nktkas/hyperliquid';
import * as methods from './methods';

/**
 * Configuration options for the Hyperliquid adapter
 */
export interface HyperliquidAdapterConfig {
  /**
   * Network to connect to: 'mainnet' or 'testnet'
   */
  network: 'mainnet' | 'testnet';
  
  /**
   * Optional timeout for API requests in milliseconds
   * @default 10000
   */
  timeout?: number;
}

// Re-export types from the methods
export type {
  PerpetualMetadata,
  FundingRateHistory,
  GetHistoricalFundingRatesParams,
  AssetPredictedFundingRates,
  VenueFundingRate
} from './methods';

/**
 * Hyperliquid adapter implementation for the Grix Protocol
 * 
 * This adapter provides methods for interacting with the Hyperliquid perpetual futures protocol.
 */
export class HyperliquidAdapter implements IPerpsAdapter {
  private client: hl.PublicClient;
  
  /**
   * Creates a new instance of the Hyperliquid adapter
   * @param config Configuration options for the adapter
   */
  constructor(
    private readonly config: HyperliquidAdapterConfig
  ) {
    // Initialize the HTTP transport with the appropriate network setting
    // Note: The SDK might have different options than what's documented
    // We're using the URL directly instead of isTestnet flag
    const baseUrl = config.network === 'testnet' 
      ? 'https://api.hyperliquid-testnet.xyz'
      : 'https://api.hyperliquid.xyz';
    
    const transport = new hl.HttpTransport({
      url: baseUrl,
      timeout: config.timeout || 10000
    });
    
    // Initialize the public client with the transport
    this.client = new hl.PublicClient({ transport });
  }

  /**
   * Fetches all available trading pairs from Hyperliquid
   * @returns A promise that resolves to an array of trading pair strings
   */
  async getPairs(): Promise<string[]> {
    return methods.getPairs(this.client);
  }

  /**
   * Fetches the current price for a specific trading pair
   * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
   * @returns A promise that resolves to the current price as a number
   */
  async getAssetPrice(pair: string): Promise<number> {
    return methods.getAssetPrice(this.client, pair);
  }

  /**
   * Fetches the current funding rate for a specific trading pair
   * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
   * @returns A promise that resolves to the current funding rate as a number
   */
  async getFundingRate(pair: string): Promise<number> {
    return methods.getFundingRate(this.client, pair);
  }

  /**
   * Returns the network the adapter is configured for
   * @returns The network name ('mainnet' or 'testnet')
   */
  getNetwork(): string {
    return this.config.network;
  }

  /**
   * Returns the name of the protocol
   * @returns The protocol name ('Hyperliquid')
   */
  getProtocolName(): string {
    return 'Hyperliquid';
  }

  // Additional Hyperliquid-specific methods

  /**
   * Fetches metadata about all perpetual contracts from Hyperliquid
   * @returns A promise that resolves to an array of perpetual contract metadata
   * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-metadata
   */
  async getPerpetualsMetadata() {
    return methods.getPerpetualsMetadata(this.client);
  }

  /**
   * Fetches historical funding rates for a specific trading pair
   * @param params Parameters for fetching historical funding rates
   * @returns A promise that resolves to an array of historical funding rate entries
   * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-historical-funding-rates
   */
  async getHistoricalFundingRates(params: methods.GetHistoricalFundingRatesParams) {
    return methods.getHistoricalFundingRates(this.client, params);
  }

  /**
   * Fetches predicted funding rates for different venues
   * @returns A promise that resolves to an array of predicted funding rates by asset and venue
   * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-predicted-funding-rates-for-different-venues
   */
  async getPredictedFundingRates() {
    return methods.getPredictedFundingRates(this.client);
  }

  /**
   * Fetches a list of perpetual contracts that have reached their open interest caps
   * @returns A promise that resolves to an array of trading pair strings that have reached their open interest caps
   * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#query-perps-at-open-interest-caps
   */
  async getPerpsAtOpenInterestCap() {
    return methods.getPerpsAtOpenInterestCap(this.client);
  }
}

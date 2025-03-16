import { IPerpsAdapter } from '../base';

/**
 * Configuration options for the Template adapter
 */
export interface TemplateAdapterConfig {
  // Network to connect to: 'mainnet' or 'testnet'
  network: 'mainnet' | 'testnet';
  
  // Optional timeout for API requests in milliseconds (default: 10000)
  timeout?: number;
  
  // Add any other protocol-specific configuration options here
}

/**
 * Template adapter for the Grix Protocol
 * 
 * This is a template for creating new protocol adapters.
 * Replace all occurrences of "Template" with your protocol name.
 */
export class TemplateAdapter implements IPerpsAdapter {
  private config: TemplateAdapterConfig;
  private client: any; // Replace with your protocol's client type

  /**
   * Creates a new instance of the Template adapter
   * @param config Configuration options for the adapter
   */
  constructor(config: TemplateAdapterConfig) {
    this.config = {
      timeout: 10000, // Default timeout
      ...config,
    };
    
    // Initialize the client
    this.client = this.initializeClient();
  }

  /**
   * Initializes the client for the protocol
   * @returns Initialized client
   */
  private initializeClient() {
    // TODO: Initialize your protocol's client here
    // Example:
    // if (this.config.network === 'mainnet') {
    //   return new YourProtocolClient({ 
    //     baseUrl: 'https://api.yourprotocol.com',
    //     timeout: this.config.timeout
    //   });
    // } else {
    //   return new YourProtocolClient({ 
    //     baseUrl: 'https://testnet-api.yourprotocol.com',
    //     timeout: this.config.timeout
    //   });
    // }
    
    return null; // Replace with your client initialization
  }

  /**
   * Gets all available trading pairs
   * @returns Promise that resolves to an array of trading pair strings
   */
  async getPairs(): Promise<string[]> {
    try {
      // TODO: Implement this method
      // This should return all available trading pairs in the format "BASE-QUOTE"
      // Example: ["BTC-USD", "ETH-USD", ...]
      
      // Import and use the implementation from methods/getPairs.ts
      const { getPairs } = await import('./methods/getPairs');
      return getPairs(this.client);
    } catch (error) {
      console.error('Error in getPairs:', error);
      throw error;
    }
  }

  /**
   * Gets the current price for a specific trading pair
   * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
   * @returns Promise that resolves to the current price as a number
   */
  async getAssetPrice(pair: string): Promise<number> {
    try {
      // TODO: Implement this method
      // This should return the current price for the specified trading pair
      
      // Import and use the implementation from methods/getAssetPrice.ts
      const { getAssetPrice } = await import('./methods/getAssetPrice');
      return getAssetPrice(this.client, pair);
    } catch (error) {
      console.error(`Error in getAssetPrice for ${pair}:`, error);
      throw error;
    }
  }

  /**
   * Gets the current funding rate for a specific trading pair
   * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
   * @returns Promise that resolves to the current funding rate as a number
   */
  async getFundingRate(pair: string): Promise<number> {
    try {
      // TODO: Implement this method
      // This should return the current funding rate for the specified trading pair
      
      // Import and use the implementation from methods/getFundingRate.ts
      const { getFundingRate } = await import('./methods/getFundingRate');
      return getFundingRate(this.client, pair);
    } catch (error) {
      console.error(`Error in getFundingRate for ${pair}:`, error);
      throw error;
    }
  }

  /**
   * Gets the network the adapter is configured for
   * @returns The network name ('mainnet' or 'testnet')
   */
  getNetwork(): string {
    return this.config.network;
  }

  /**
   * Gets the name of the protocol
   * @returns The protocol name
   */
  getProtocolName(): string {
    return 'Template'; // Replace with your protocol name
  }

  /**
   * Gets metadata about all perpetual contracts
   * @returns Promise that resolves to an array of perpetual contract metadata
   */
  async getPerpetualsMetadata(): Promise<any[]> {
    try {
      // TODO: Implement this method
      // This should return metadata about all perpetual contracts
      
      // Import and use the implementation from methods/getPerpetualsMetadata.ts
      const { getPerpetualsMetadata } = await import('./methods/getPerpetualsMetadata');
      return getPerpetualsMetadata(this.client);
    } catch (error) {
      console.error('Error in getPerpetualsMetadata:', error);
      throw error;
    }
  }

  /**
   * Gets historical funding rates for a specific trading pair
   * @param params Parameters for fetching historical funding rates
   * @returns Promise that resolves to an array of historical funding rate entries
   */
  async getHistoricalFundingRates(params: any): Promise<any[]> {
    try {
      // TODO: Implement this method
      // This should return historical funding rates for the specified trading pair
      
      // Import and use the implementation from methods/getHistoricalFundingRates.ts
      const { getHistoricalFundingRates } = await import('./methods/getHistoricalFundingRates');
      return getHistoricalFundingRates(this.client, params);
    } catch (error) {
      console.error(`Error in getHistoricalFundingRates for ${params.pair}:`, error);
      throw error;
    }
  }

  /**
   * Gets predicted funding rates for different venues
   * @returns Promise that resolves to an array of predicted funding rates by asset and venue
   */
  async getPredictedFundingRates(): Promise<any[]> {
    try {
      // TODO: Implement this method
      // This should return predicted funding rates for different venues
      
      // Import and use the implementation from methods/getPredictedFundingRates.ts
      const { getPredictedFundingRates } = await import('./methods/getPredictedFundingRates');
      return getPredictedFundingRates(this.client);
    } catch (error) {
      console.error('Error in getPredictedFundingRates:', error);
      throw error;
    }
  }

  /**
   * Gets a list of perpetual contracts that have reached their open interest caps
   * @returns Promise that resolves to an array of trading pair strings that have reached their open interest caps
   */
  async getPerpsAtOpenInterestCap(): Promise<string[]> {
    try {
      // TODO: Implement this method
      // This should return a list of perpetual contracts that have reached their open interest caps
      
      // Import and use the implementation from methods/getPerpsAtOpenInterestCap.ts
      const { getPerpsAtOpenInterestCap } = await import('./methods/getPerpsAtOpenInterestCap');
      return getPerpsAtOpenInterestCap(this.client);
    } catch (error) {
      console.error('Error in getPerpsAtOpenInterestCap:', error);
      throw error;
    }
  }
} 
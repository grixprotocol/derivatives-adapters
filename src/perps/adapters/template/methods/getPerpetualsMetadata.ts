/**
 * Metadata for a perpetual contract
 */
export interface PerpetualMetadata {
  name: string;        // Asset name (e.g., "BTC")
  szDecimals: number;  // Decimal places for size
  maxLeverage: number; // Maximum leverage allowed
  onlyIsolated?: boolean; // Whether the asset can only be traded with isolated margin
  isDelisted?: boolean;   // Whether the asset is delisted
}

/**
 * Gets metadata about all perpetual contracts
 * @param client The protocol client
 * @returns Promise that resolves to an array of perpetual contract metadata
 */
export async function getPerpetualsMetadata(client: any): Promise<PerpetualMetadata[]> {
  try {
    // TODO: Implement this method
    // This should return metadata about all perpetual contracts
    
    // Example implementation:
    // const response = await client.getMarkets();
    // const metadata = response.markets.map(market => ({
    //   name: market.coin,
    //   szDecimals: market.szDecimals,
    //   maxLeverage: market.maxLeverage,
    //   onlyIsolated: market.onlyIsolated,
    //   isDelisted: market.isDelisted,
    // }));
    // return metadata;
    
    // Placeholder implementation
    // This is just a placeholder that returns mock metadata
    // Replace this with actual implementation
    return [
      {
        name: 'BTC',
        szDecimals: 8,
        maxLeverage: 100,
        onlyIsolated: false,
        isDelisted: false,
      },
      {
        name: 'ETH',
        szDecimals: 8,
        maxLeverage: 100,
        onlyIsolated: false,
        isDelisted: false,
      },
      {
        name: 'SOL',
        szDecimals: 8,
        maxLeverage: 50,
        onlyIsolated: false,
        isDelisted: false,
      },
      {
        name: 'AVAX',
        szDecimals: 8,
        maxLeverage: 50,
        onlyIsolated: false,
        isDelisted: false,
      },
      {
        name: 'LINK',
        szDecimals: 8,
        maxLeverage: 50,
        onlyIsolated: false,
        isDelisted: false,
      },
    ];
  } catch (error) {
    console.error('Error in getPerpetualsMetadata:', error);
    throw error;
  }
} 
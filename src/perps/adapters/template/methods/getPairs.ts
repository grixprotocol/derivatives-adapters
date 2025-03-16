import { coinToPair } from './utils';

/**
 * Gets all available trading pairs
 * @param client The protocol client
 * @returns Promise that resolves to an array of trading pair strings
 */
export async function getPairs(client: any): Promise<string[]> {
  try {
    // TODO: Implement this method
    // This should return all available trading pairs in the format "BASE-QUOTE"
    // Example: ["BTC-USD", "ETH-USD", ...]
    
    // Example implementation:
    // const response = await client.getMarkets();
    // const pairs = response.markets.map(market => coinToPair(market.coin));
    // return pairs;
    
    // Placeholder implementation
    return [
      'BTC-USD',
      'ETH-USD',
      'SOL-USD',
      'AVAX-USD',
      'LINK-USD',
    ];
  } catch (error) {
    console.error('Error in getPairs:', error);
    throw error;
  }
} 
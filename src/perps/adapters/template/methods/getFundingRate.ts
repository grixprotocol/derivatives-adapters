import { isValidPair, pairToCoin, formatNumber } from './utils';

/**
 * Gets the current funding rate for a specific trading pair
 * @param client The protocol client
 * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
 * @returns Promise that resolves to the current funding rate as a number
 */
export async function getFundingRate(client: any, pair: string): Promise<number> {
  try {
    // Validate the pair format
    if (!isValidPair(pair)) {
      throw new Error(`Invalid pair format: ${pair}. Expected format: BASE-QUOTE (e.g., BTC-USD)`);
    }

    // Extract the coin from the pair
    const coin = pairToCoin(pair);

    // TODO: Implement this method
    // This should return the current funding rate for the specified trading pair
    
    // Example implementation:
    // const response = await client.getFundingRate(coin);
    // return formatNumber(response.fundingRate, 8);
    
    // Placeholder implementation
    // This is just a placeholder that returns a random funding rate
    // Replace this with actual implementation
    const mockFundingRates: Record<string, number> = {
      'BTC': (Math.random() * 0.002) - 0.001, // Random value between -0.1% and 0.1%
      'ETH': (Math.random() * 0.002) - 0.001,
      'SOL': (Math.random() * 0.003) - 0.0015,
      'AVAX': (Math.random() * 0.003) - 0.0015,
      'LINK': (Math.random() * 0.002) - 0.001,
    };
    
    const fundingRate = mockFundingRates[coin] || 0.0001; // Default funding rate if coin not found
    return formatNumber(fundingRate, 6);
  } catch (error) {
    console.error(`Error in getFundingRate for ${pair}:`, error);
    throw error;
  }
} 
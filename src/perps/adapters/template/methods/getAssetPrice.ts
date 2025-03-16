import { isValidPair, pairToCoin, formatNumber } from './utils';

/**
 * Gets the current price for a specific trading pair
 * @param client The protocol client
 * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
 * @returns Promise that resolves to the current price as a number
 */
export async function getAssetPrice(client: any, pair: string): Promise<number> {
  try {
    // Validate the pair format
    if (!isValidPair(pair)) {
      throw new Error(`Invalid pair format: ${pair}. Expected format: BASE-QUOTE (e.g., BTC-USD)`);
    }

    // Extract the coin from the pair
    const coin = pairToCoin(pair);

    // TODO: Implement this method
    // This should return the current price for the specified trading pair
    
    // Example implementation:
    // const response = await client.getPrice(coin);
    // return formatNumber(response.price, 8);
    
    // Placeholder implementation
    // This is just a placeholder that returns a random price
    // Replace this with actual implementation
    const mockPrices: Record<string, number> = {
      'BTC': 50000 + Math.random() * 5000,
      'ETH': 3000 + Math.random() * 300,
      'SOL': 100 + Math.random() * 10,
      'AVAX': 30 + Math.random() * 3,
      'LINK': 15 + Math.random() * 1.5,
    };
    
    const price = mockPrices[coin] || 100; // Default price if coin not found
    return formatNumber(price, 2);
  } catch (error) {
    console.error(`Error in getAssetPrice for ${pair}:`, error);
    throw error;
  }
} 
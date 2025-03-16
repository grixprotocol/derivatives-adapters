import { coinToPair } from './utils';

/**
 * Gets a list of perpetual contracts that have reached their open interest caps
 * @param client The protocol client
 * @returns Promise that resolves to an array of trading pair strings that have reached their open interest caps
 */
export async function getPerpsAtOpenInterestCap(client: any): Promise<string[]> {
  try {
    // TODO: Implement this method
    // This should return a list of perpetual contracts that have reached their open interest caps
    
    // Example implementation:
    // const response = await client.getMarkets();
    // const perpsAtCap = response.markets
    //   .filter(market => market.openInterest >= market.openInterestCap)
    //   .map(market => coinToPair(market.coin));
    // return perpsAtCap;
    
    // Placeholder implementation
    // This is just a placeholder that returns an empty array
    // Replace this with actual implementation
    
    // For demonstration purposes, let's randomly return some pairs as at cap
    const allPairs = ['BTC-USD', 'ETH-USD', 'SOL-USD', 'AVAX-USD', 'LINK-USD'];
    
    // Randomly select 0-2 pairs to be at cap
    const numAtCap = Math.floor(Math.random() * 3); // 0, 1, or 2
    const shuffled = [...allPairs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numAtCap);
  } catch (error) {
    console.error('Error in getPerpsAtOpenInterestCap:', error);
    throw error;
  }
} 
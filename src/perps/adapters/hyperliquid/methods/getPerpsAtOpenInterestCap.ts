/**
 * Implementation of the getPerpsAtOpenInterestCap method for the Hyperliquid adapter
 * 
 * This method fetches a list of perpetual contracts that have reached their open interest caps.
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#query-perps-at-open-interest-caps
 */
import * as hl from '@nktkas/hyperliquid';
import { formatAsPair } from './utils';

/**
 * Fetches a list of perpetual contracts that have reached their open interest caps
 * @param client The Hyperliquid PublicClient instance
 * @returns A promise that resolves to an array of trading pair strings that have reached their open interest caps
 */
export async function getPerpsAtOpenInterestCap(client: hl.PublicClient): Promise<string[]> {
  try {
    // Fetch the list of perps at open interest caps
    const perpsAtCap = await client.perpsAtOpenInterestCap();
    
    // Format the asset names as trading pairs
    return perpsAtCap.map(asset => formatAsPair(asset));
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch perps at open interest cap from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
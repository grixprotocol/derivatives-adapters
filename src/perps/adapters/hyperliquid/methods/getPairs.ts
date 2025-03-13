/**
 * Implementation of the getPairs method for the Hyperliquid adapter
 * 
 * This method fetches all available trading pairs from the Hyperliquid API.
 */
import * as hl from '@nktkas/hyperliquid';
import { formatAsPair } from './utils';

/**
 * Fetches all available trading pairs from Hyperliquid
 * @param client The Hyperliquid PublicClient instance
 * @returns A promise that resolves to an array of trading pair strings
 */
export async function getPairs(client: hl.PublicClient): Promise<string[]> {
  try {
    // Fetch the metadata which contains the universe of available assets
    const meta = await client.meta();
    
    // Extract the coin names from the universe and format them as trading pairs
    // Hyperliquid uses USD as the quote currency for all pairs
    const pairs = meta.universe.map(asset => formatAsPair(asset.name));
    
    return pairs;
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch pairs from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
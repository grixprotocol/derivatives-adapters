/**
 * Implementation of the getAssetPrice method for the Hyperliquid adapter
 * 
 * This method fetches the current price for a specific trading pair from the Hyperliquid API.
 */
import * as hl from '@nktkas/hyperliquid';
import { extractBaseAsset } from './utils';

/**
 * Fetches the current price for a specific trading pair
 * @param client The Hyperliquid PublicClient instance
 * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
 * @returns A promise that resolves to the current price as a number
 */
export async function getAssetPrice(client: hl.PublicClient, pair: string): Promise<number> {
  try {
    // Extract the base asset from the pair
    const baseAsset = extractBaseAsset(pair);
    
    // Fetch the metadata and asset contexts which include current prices
    const metaAndAssetCtxs = await client.metaAndAssetCtxs();
    
    // Find the asset context for the requested pair
    const assetIndex = metaAndAssetCtxs[0].universe.findIndex(
      asset => asset.name === baseAsset
    );
    
    if (assetIndex === -1) {
      throw new Error(`Asset not found: ${baseAsset}`);
    }
    
    // Get the asset context which contains the price information
    const assetCtx = metaAndAssetCtxs[1][assetIndex];
    
    // Return the mark price as a number
    return parseFloat(assetCtx.markPx);
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch price for ${pair} from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
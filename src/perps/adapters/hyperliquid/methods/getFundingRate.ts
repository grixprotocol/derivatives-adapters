/**
 * Implementation of the getFundingRate method for the Hyperliquid adapter
 * 
 * This method fetches the current funding rate for a specific trading pair from the Hyperliquid API.
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-asset-contexts-includes-mark-price-current-funding-open-interest-etc
 */
import * as hl from '@nktkas/hyperliquid';
import { extractBaseAsset } from './utils';

/**
 * Fetches the current funding rate for a specific trading pair
 * @param client The Hyperliquid PublicClient instance
 * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
 * @returns A promise that resolves to the current funding rate as a number
 */
export async function getFundingRate(client: hl.PublicClient, pair: string): Promise<number> {
  try {
    // Extract the base asset from the pair
    const baseAsset = extractBaseAsset(pair);
    
    // Fetch the metadata and asset contexts which include current funding rates
    const metaAndAssetCtxs = await client.metaAndAssetCtxs();
    
    // Find the asset context for the requested pair
    const assetIndex = metaAndAssetCtxs[0].universe.findIndex(
      asset => asset.name === baseAsset
    );
    
    if (assetIndex === -1) {
      throw new Error(`Asset not found: ${baseAsset}`);
    }
    
    // Get the asset context which contains the funding rate information
    const assetCtx = metaAndAssetCtxs[1][assetIndex];
    
    // Return the funding rate as a number
    // The funding rate is expressed as a decimal (e.g., 0.0001 = 0.01%)
    return parseFloat(assetCtx.funding);
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch funding rate for ${pair} from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
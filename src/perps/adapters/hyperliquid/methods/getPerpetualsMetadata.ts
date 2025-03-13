/**
 * Implementation of the getPerpetualsMetadata method for the Hyperliquid adapter
 * 
 * This method fetches metadata about all perpetual contracts from the Hyperliquid API.
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-perpetuals-metadata
 */
import * as hl from '@nktkas/hyperliquid';

/**
 * Represents a perpetual contract's metadata
 */
export interface PerpetualMetadata {
  /**
   * Name of the asset (e.g., "BTC")
   */
  name: string;
  
  /**
   * Decimal places for size
   */
  szDecimals: number;
  
  /**
   * Maximum leverage allowed
   */
  maxLeverage: number;
  
  /**
   * Whether the asset can only be traded with isolated margin
   */
  onlyIsolated?: boolean;
  
  /**
   * Whether the asset is delisted
   */
  isDelisted?: boolean;
}

/**
 * Fetches metadata about all perpetual contracts from Hyperliquid
 * @param client The Hyperliquid PublicClient instance
 * @returns A promise that resolves to an array of perpetual contract metadata
 */
export async function getPerpetualsMetadata(client: hl.PublicClient): Promise<PerpetualMetadata[]> {
  try {
    // Fetch the metadata which contains the universe of available assets
    const meta = await client.meta();
    
    // Return the universe array which contains metadata for all perpetual contracts
    return meta.universe;
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch perpetuals metadata from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
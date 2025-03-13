/**
 * Implementation of the getPredictedFundingRates method for the Hyperliquid adapter
 * 
 * This method fetches predicted funding rates for different venues from the Hyperliquid API.
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-predicted-funding-rates-for-different-venues
 */
import * as hl from '@nktkas/hyperliquid';

/**
 * Represents a venue's predicted funding rate
 */
export interface VenueFundingRate {
  /**
   * Funding rate as a string (e.g., "0.0001")
   */
  fundingRate: string;
  
  /**
   * Next funding time in milliseconds
   */
  nextFundingTime: number;
}

/**
 * Represents predicted funding rates for an asset across different venues
 */
export interface AssetPredictedFundingRates {
  /**
   * Asset name (e.g., "BTC")
   */
  asset: string;
  
  /**
   * Funding rates by venue
   */
  venues: {
    /**
     * Venue name (e.g., "HlPerp", "BinPerp", etc.)
     */
    name: string;
    
    /**
     * Predicted funding rate information
     */
    rate: VenueFundingRate | null;
  }[];
}

/**
 * Fetches predicted funding rates for different venues
 * @param client The Hyperliquid PublicClient instance
 * @returns A promise that resolves to an array of predicted funding rates by asset and venue
 */
export async function getPredictedFundingRates(
  client: hl.PublicClient
): Promise<AssetPredictedFundingRates[]> {
  try {
    // Fetch the predicted funding rates
    const predictedFundings = await client.predictedFundings();
    
    // Transform the response into a more user-friendly format
    return predictedFundings.map(([asset, venues]) => {
      return {
        asset,
        venues: venues.map(([venueName, rate]) => {
          return {
            name: venueName,
            rate
          };
        })
      };
    });
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch predicted funding rates from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
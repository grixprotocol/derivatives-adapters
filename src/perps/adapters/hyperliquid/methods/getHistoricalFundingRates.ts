/**
 * Implementation of the getHistoricalFundingRates method for the Hyperliquid adapter
 * 
 * This method fetches historical funding rates for a specific trading pair from the Hyperliquid API.
 * @see https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals#retrieve-historical-funding-rates
 */
import * as hl from '@nktkas/hyperliquid';
import { extractBaseAsset } from './utils';

/**
 * Represents a historical funding rate entry
 */
export interface FundingRateHistory {
  /**
   * Asset name (e.g., "BTC")
   */
  coin: string;
  
  /**
   * Funding rate as a string (e.g., "0.0001")
   */
  fundingRate: string;
  
  /**
   * Premium as a string (e.g., "0.0002")
   */
  premium: string;
  
  /**
   * Timestamp in milliseconds
   */
  time: number;
}

/**
 * Parameters for fetching historical funding rates
 */
export interface GetHistoricalFundingRatesParams {
  /**
   * Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
   */
  pair: string;
  
  /**
   * Start time in milliseconds, inclusive
   */
  startTime: number;
  
  /**
   * End time in milliseconds, inclusive
   * Defaults to current time if not provided
   */
  endTime?: number;
}

/**
 * Fetches historical funding rates for a specific trading pair
 * @param client The Hyperliquid PublicClient instance
 * @param params Parameters for fetching historical funding rates
 * @returns A promise that resolves to an array of historical funding rate entries
 */
export async function getHistoricalFundingRates(
  client: hl.PublicClient, 
  params: GetHistoricalFundingRatesParams
): Promise<FundingRateHistory[]> {
  try {
    // Validate time parameters
    if (params.endTime && params.endTime < params.startTime) {
      throw new Error(`Invalid time parameters: endTime (${params.endTime}) must be after startTime (${params.startTime})`);
    }
    
    // Extract the base asset from the pair
    const baseAsset = extractBaseAsset(params.pair);
    
    // Prepare the parameters for the API call
    const apiParams = {
      coin: baseAsset,
      startTime: params.startTime,
      endTime: params.endTime
    };
    
    // Fetch the historical funding rates
    const fundingHistory = await client.fundingHistory(apiParams);
    
    return fundingHistory;
  } catch (error) {
    // Rethrow with a more descriptive message
    throw new Error(`Failed to fetch historical funding rates for ${params.pair} from Hyperliquid: ${error instanceof Error ? error.message : String(error)}`);
  }
} 
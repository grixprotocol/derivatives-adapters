import { isValidPair, pairToCoin } from './utils';

/**
 * Parameters for fetching historical funding rates
 */
export interface GetHistoricalFundingRatesParams {
  pair: string;      // Trading pair (e.g., "BTC-USD")
  startTime: number; // Start time in milliseconds, inclusive
  endTime?: number;  // End time in milliseconds, inclusive (default: current time)
}

/**
 * Historical funding rate entry
 */
export interface FundingRateHistory {
  coin: string;        // Asset name (e.g., "BTC")
  fundingRate: string; // Funding rate as a string (e.g., "0.0001")
  premium: string;     // Premium as a string (e.g., "0.0002")
  time: number;        // Timestamp in milliseconds
}

/**
 * Gets historical funding rates for a specific trading pair
 * @param client The protocol client
 * @param params Parameters for fetching historical funding rates
 * @returns Promise that resolves to an array of historical funding rate entries
 */
export async function getHistoricalFundingRates(
  client: any,
  params: GetHistoricalFundingRatesParams
): Promise<FundingRateHistory[]> {
  try {
    // Validate the pair format
    if (!isValidPair(params.pair)) {
      throw new Error(`Invalid pair format: ${params.pair}. Expected format: BASE-QUOTE (e.g., BTC-USD)`);
    }

    // Extract the coin from the pair
    const coin = pairToCoin(params.pair);
    
    // Set default end time if not provided
    const endTime = params.endTime || Date.now();
    
    // Validate time range
    if (params.startTime > endTime) {
      throw new Error('Start time must be less than or equal to end time');
    }

    // TODO: Implement this method
    // This should return historical funding rates for the specified trading pair
    
    // Example implementation:
    // const response = await client.getHistoricalFundingRates({
    //   coin,
    //   startTime: params.startTime,
    //   endTime,
    // });
    // return response.fundingRates.map(rate => ({
    //   coin,
    //   fundingRate: rate.fundingRate.toString(),
    //   premium: rate.premium.toString(),
    //   time: rate.time,
    // }));
    
    // Placeholder implementation
    // This is just a placeholder that returns mock historical funding rates
    // Replace this with actual implementation
    const result: FundingRateHistory[] = [];
    
    // Generate mock funding rates every 8 hours from start time to end time
    const interval = 8 * 60 * 60 * 1000; // 8 hours in milliseconds
    for (let time = params.startTime; time <= endTime; time += interval) {
      result.push({
        coin,
        fundingRate: ((Math.random() * 0.002) - 0.001).toFixed(6), // Random value between -0.1% and 0.1%
        premium: ((Math.random() * 0.003) - 0.0015).toFixed(6),
        time,
      });
    }
    
    return result;
  } catch (error) {
    console.error(`Error in getHistoricalFundingRates for ${params.pair}:`, error);
    throw error;
  }
} 
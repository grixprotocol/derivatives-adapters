/**
 * Predicted funding rate for a venue
 */
export interface VenuePredictedFundingRate {
  name: string; // Venue name (e.g., "TemplatePerp", "BinPerp", etc.)
  rate: {
    fundingRate: string;    // Funding rate as a string (e.g., "0.0001")
    nextFundingTime: number; // Next funding time in milliseconds
  } | null;
}

/**
 * Predicted funding rates for an asset across different venues
 */
export interface AssetPredictedFundingRates {
  asset: string;  // Asset name (e.g., "BTC")
  venues: VenuePredictedFundingRate[];
}

/**
 * Gets predicted funding rates for different venues
 * @param client The protocol client
 * @returns Promise that resolves to an array of predicted funding rates by asset and venue
 */
export async function getPredictedFundingRates(client: any): Promise<AssetPredictedFundingRates[]> {
  try {
    // TODO: Implement this method
    // This should return predicted funding rates for different venues
    
    // Example implementation:
    // const response = await client.getPredictedFundingRates();
    // return response.assets.map(asset => ({
    //   asset: asset.coin,
    //   venues: asset.venues.map(venue => ({
    //     name: venue.name,
    //     rate: venue.rate ? {
    //       fundingRate: venue.rate.fundingRate.toString(),
    //       nextFundingTime: venue.rate.nextFundingTime,
    //     } : null,
    //   })),
    // }));
    
    // Placeholder implementation
    // This is just a placeholder that returns mock predicted funding rates
    // Replace this with actual implementation
    const assets = ['BTC', 'ETH', 'SOL', 'AVAX', 'LINK'];
    const venues = ['TemplatePerp', 'BinPerp', 'DyDxPerp', 'MuxPerp'];
    
    // Next funding time (8 hours from now)
    const nextFundingTime = Date.now() + (8 * 60 * 60 * 1000);
    
    return assets.map(asset => ({
      asset,
      venues: venues.map(venue => ({
        name: venue,
        rate: Math.random() > 0.1 ? { // 10% chance of null rate
          fundingRate: ((Math.random() * 0.002) - 0.001).toFixed(6), // Random value between -0.1% and 0.1%
          nextFundingTime,
        } : null,
      })),
    }));
  } catch (error) {
    console.error('Error in getPredictedFundingRates:', error);
    throw error;
  }
} 
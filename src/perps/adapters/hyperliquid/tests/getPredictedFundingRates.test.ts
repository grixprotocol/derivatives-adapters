/**
 * Tests for the getPredictedFundingRates method of the Hyperliquid adapter
 */
import { createTestAdapter, retry } from './utils';

describe('HyperliquidAdapter - getPredictedFundingRates', () => {
  it('should return an array of predicted funding rates by asset and venue', async () => {
    const adapter = createTestAdapter();
    
    // Get predicted funding rates
    const predictedRates = await retry(async () => {
      return await adapter.getPredictedFundingRates();
    });
    
    // Check that the result is an array
    expect(Array.isArray(predictedRates)).toBe(true);
    expect(predictedRates.length).toBeGreaterThan(0);
    
    // Check that each item has the expected properties
    for (const item of predictedRates) {
      expect(item).toHaveProperty('asset');
      expect(typeof item.asset).toBe('string');
      
      expect(item).toHaveProperty('venues');
      expect(Array.isArray(item.venues)).toBe(true);
      
      // Check venue properties
      for (const venue of item.venues) {
        expect(venue).toHaveProperty('name');
        expect(typeof venue.name).toBe('string');
        
        // Rate can be null or an object with fundingRate and nextFundingTime
        if (venue.rate !== null) {
          expect(venue.rate).toHaveProperty('fundingRate');
          expect(typeof venue.rate.fundingRate).toBe('string');
          
          expect(venue.rate).toHaveProperty('nextFundingTime');
          expect(typeof venue.rate.nextFundingTime).toBe('number');
        }
      }
    }
  });
  
  it('should include common assets in the predicted funding rates', async () => {
    const adapter = createTestAdapter();
    
    // Get predicted funding rates
    const predictedRates = await retry(async () => {
      return await adapter.getPredictedFundingRates();
    });
    
    // Check that common assets are included
    const commonAssets = ['BTC', 'ETH', 'SOL'];
    for (const asset of commonAssets) {
      const found = predictedRates.some(item => item.asset === asset);
      expect(found).toBe(true);
    }
  });
  
  it('should include HlPerp venue for each asset', async () => {
    const adapter = createTestAdapter();
    
    // Get predicted funding rates
    const predictedRates = await retry(async () => {
      return await adapter.getPredictedFundingRates();
    });
    
    // Check that each asset has the HlPerp venue
    for (const item of predictedRates) {
      const hasHlPerp = item.venues.some(venue => venue.name === 'HlPerp');
      expect(hasHlPerp).toBe(true);
    }
  });
});
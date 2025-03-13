/**
 * Tests for the getHistoricalFundingRates method of the Hyperliquid adapter
 */
import { createTestAdapter, retry } from './utils';

describe('HyperliquidAdapter - getHistoricalFundingRates', () => {
  it('should return an array of historical funding rate entries', async () => {
    const adapter = createTestAdapter();
    
    // Get historical funding rates for BTC for the last 7 days
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const fundingRates = await retry(async () => {
      return await adapter.getHistoricalFundingRates({
        pair: 'BTC-USD',
        startTime: oneWeekAgo
      });
    });
    
    // Check that the result is an array
    expect(Array.isArray(fundingRates)).toBe(true);
    
    // There should be at least some funding rate entries
    // (funding happens every 8 hours, so there should be at least 21 entries for 7 days)
    expect(fundingRates.length).toBeGreaterThan(0);
    
    // Check that each item has the expected properties
    for (const item of fundingRates) {
      expect(item).toHaveProperty('coin');
      expect(typeof item.coin).toBe('string');
      expect(item.coin).toBe('BTC');
      
      expect(item).toHaveProperty('fundingRate');
      expect(typeof item.fundingRate).toBe('string');
      
      expect(item).toHaveProperty('premium');
      expect(typeof item.premium).toBe('string');
      
      expect(item).toHaveProperty('time');
      expect(typeof item.time).toBe('number');
      
      // Time should be after the start time
      expect(item.time).toBeGreaterThanOrEqual(oneWeekAgo);
    }
  });
  
  it('should handle the endTime parameter', async () => {
    const adapter = createTestAdapter();
    
    // Get historical funding rates for ETH for a specific time range
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    
    const fundingRates = await retry(async () => {
      return await adapter.getHistoricalFundingRates({
        pair: 'ETH-USD',
        startTime: oneWeekAgo,
        endTime: threeDaysAgo
      });
    });
    
    // Check that the result is an array
    expect(Array.isArray(fundingRates)).toBe(true);
    
    // Check that all entries are within the specified time range
    for (const item of fundingRates) {
      expect(item.time).toBeGreaterThanOrEqual(oneWeekAgo);
      expect(item.time).toBeLessThanOrEqual(threeDaysAgo);
    }
  });
  
  it('should throw an error for an invalid pair', async () => {
    const adapter = createTestAdapter();
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    // The adapter should throw an error for an invalid pair
    await expect(adapter.getHistoricalFundingRates({
      pair: 'INVALID-USD',
      startTime: oneWeekAgo
    })).rejects.toThrow();
  });
  
  it('should throw an error for invalid time parameters', async () => {
    const adapter = createTestAdapter();
    
    // The adapter should throw an error if endTime is before startTime
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const twoWeeksAgo = Date.now() - 14 * 24 * 60 * 60 * 1000;
    
    await expect(adapter.getHistoricalFundingRates({
      pair: 'BTC-USD',
      startTime: oneWeekAgo,
      endTime: twoWeeksAgo
    })).rejects.toThrow();
  });
});
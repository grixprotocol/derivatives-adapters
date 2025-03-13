/**
 * Tests for the getFundingRate method of the Hyperliquid adapter
 */
import { createTestAdapter, isValidNumber, retry } from './utils';

describe('HyperliquidAdapter - getFundingRate', () => {
  it('should return the current funding rate as a number for a valid pair', async () => {
    const adapter = createTestAdapter();
    
    // Test with BTC-USD pair
    const fundingRate = await retry(async () => {
      return await adapter.getFundingRate('BTC-USD');
    });
    
    // Check that the result is a valid number
    expect(isValidNumber(fundingRate)).toBe(true);
    
    // Funding rate should be a small number (typically between -0.01 and 0.01)
    expect(Math.abs(fundingRate)).toBeLessThan(0.1);
  });
  
  it('should return funding rates for multiple valid pairs', async () => {
    const adapter = createTestAdapter();
    const pairs = ['BTC-USD', 'ETH-USD', 'SOL-USD'];
    
    for (const pair of pairs) {
      const fundingRate = await retry(async () => {
        return await adapter.getFundingRate(pair);
      });
      
      // Check that the result is a valid number
      expect(isValidNumber(fundingRate)).toBe(true);
      
      // Funding rate should be a small number (typically between -0.01 and 0.01)
      expect(Math.abs(fundingRate)).toBeLessThan(0.1);
    }
  });
  
  it('should throw an error for an invalid pair', async () => {
    const adapter = createTestAdapter();
    const invalidPair = 'INVALID-USD';
    
    // The adapter should throw an error for an invalid pair
    await expect(adapter.getFundingRate(invalidPair)).rejects.toThrow();
  });
  
  it('should handle pairs with different formats', async () => {
    const adapter = createTestAdapter();
    
    // Test with different pair formats
    const btcFundingRate = await retry(async () => {
      return await adapter.getFundingRate('BTC-USD');
    });
    
    // Try with lowercase
    await expect(adapter.getFundingRate('btc-usd')).rejects.toThrow();
    
    // Try without USD suffix
    await expect(adapter.getFundingRate('BTC')).rejects.toThrow();
  });
  
  it('should return consistent funding rates when called multiple times', async () => {
    const adapter = createTestAdapter();
    const pair = 'BTC-USD';
    
    // Get funding rate twice
    const fundingRate1 = await retry(async () => {
      return await adapter.getFundingRate(pair);
    });
    
    const fundingRate2 = await retry(async () => {
      return await adapter.getFundingRate(pair);
    });
    
    // The funding rates should be very close to each other
    // (they might not be exactly equal due to time passing between calls)
    expect(Math.abs(fundingRate1 - fundingRate2)).toBeLessThan(0.0001);
  });
});
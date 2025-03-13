/**
 * Tests for the getPerpsAtOpenInterestCap method of the Hyperliquid adapter
 */
import { createTestAdapter, isValidStringArray, retry } from './utils';

describe('HyperliquidAdapter - getPerpsAtOpenInterestCap', () => {
  it('should return an array of trading pair strings that have reached their open interest caps', async () => {
    const adapter = createTestAdapter();
    
    // Get perps at open interest cap
    const perpsAtCap = await retry(async () => {
      return await adapter.getPerpsAtOpenInterestCap();
    });
    
    // Check that the result is an array of strings
    // Note: This might be an empty array if no perps are at their cap
    expect(isValidStringArray(perpsAtCap) || perpsAtCap.length === 0).toBe(true);
    
    // If there are any perps at cap, check that they are in the expected format
    if (perpsAtCap.length > 0) {
      for (const pair of perpsAtCap) {
        expect(pair).toMatch(/^[A-Z0-9]+-USD$/);
      }
    }
  });
  
  it('should return a subset of all available pairs', async () => {
    const adapter = createTestAdapter();
    
    // Get all pairs
    const allPairs = await retry(async () => {
      return await adapter.getPairs();
    });
    
    // Get perps at open interest cap
    const perpsAtCap = await retry(async () => {
      return await adapter.getPerpsAtOpenInterestCap();
    });
    
    // Check that all perps at cap are also in the list of all pairs
    for (const pair of perpsAtCap) {
      expect(allPairs).toContain(pair);
    }
    
    // The number of perps at cap should be less than or equal to the total number of pairs
    expect(perpsAtCap.length).toBeLessThanOrEqual(allPairs.length);
  });
});
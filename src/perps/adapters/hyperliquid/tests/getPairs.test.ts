/**
 * Tests for the getPairs method of the Hyperliquid adapter
 */
import { createTestAdapter, isValidStringArray, retry } from './utils';

describe('HyperliquidAdapter - getPairs', () => {
  it('should return an array of trading pair strings', async () => {
    const adapter = createTestAdapter();
    
    // Use retry to handle potential network issues
    const pairs = await retry(async () => {
      return await adapter.getPairs();
    });
    
    // Check that the result is a non-empty array of strings
    expect(isValidStringArray(pairs)).toBe(true);
    expect(pairs.length).toBeGreaterThan(0);
    
    // Check that the pairs are in the expected format (e.g., "BTC-USD")
    for (const pair of pairs) {
      expect(pair).toMatch(/^[A-Za-z0-9]+-USD$/);
    }
    
    // Check that common pairs are included
    const commonPairs = ['BTC-USD', 'ETH-USD'];
    for (const commonPair of commonPairs) {
      expect(pairs).toContain(commonPair);
    }
  });
  
  it('should transform the response from the Hyperliquid API format to the expected format', async () => {
    const adapter = createTestAdapter();
    
    // Get the pairs
    const pairs = await retry(async () => {
      return await adapter.getPairs();
    });
    
    // Get the metadata directly to verify the transformation
    const metadata = await retry(async () => {
      return await adapter.getPerpetualsMetadata();
    });
    
    // Check that all assets in the metadata are included in the pairs
    for (const asset of metadata) {
      // Skip delisted assets
      if (asset.isDelisted) continue;
      
      const expectedPair = `${asset.name}-USD`;
      expect(pairs).toContain(expectedPair);
    }
  });
});
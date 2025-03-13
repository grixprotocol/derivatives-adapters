/**
 * Tests for the getPerpetualsMetadata method of the Hyperliquid adapter
 */
import { createTestAdapter, retry } from './utils';

describe('HyperliquidAdapter - getPerpetualsMetadata', () => {
  it('should return an array of perpetual contract metadata', async () => {
    const adapter = createTestAdapter();
    
    // Get the metadata
    const metadata = await retry(async () => {
      return await adapter.getPerpetualsMetadata();
    });
    
    // Check that the result is an array
    expect(Array.isArray(metadata)).toBe(true);
    expect(metadata.length).toBeGreaterThan(0);
    
    // Check that each item has the expected properties
    for (const item of metadata) {
      expect(item).toHaveProperty('name');
      expect(typeof item.name).toBe('string');
      
      expect(item).toHaveProperty('szDecimals');
      expect(typeof item.szDecimals).toBe('number');
      
      expect(item).toHaveProperty('maxLeverage');
      expect(typeof item.maxLeverage).toBe('number');
      
      // onlyIsolated and isDelisted are optional
      if ('onlyIsolated' in item) {
        expect(typeof item.onlyIsolated).toBe('boolean');
      }
      
      if ('isDelisted' in item) {
        expect(typeof item.isDelisted).toBe('boolean');
      }
    }
  });
  
  it('should include common assets in the metadata', async () => {
    const adapter = createTestAdapter();
    
    // Get the metadata
    const metadata = await retry(async () => {
      return await adapter.getPerpetualsMetadata();
    });
    
    // Check that common assets are included
    const commonAssets = ['BTC', 'ETH', 'SOL'];
    for (const asset of commonAssets) {
      const found = metadata.some(item => item.name === asset);
      expect(found).toBe(true);
    }
  });
});
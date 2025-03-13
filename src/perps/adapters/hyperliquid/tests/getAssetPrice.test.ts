/**
 * Tests for the getAssetPrice method of the Hyperliquid adapter
 */
import { createTestAdapter, isValidNumber, retry } from './utils';

describe('HyperliquidAdapter - getAssetPrice', () => {
  it('should return the current price as a number for a valid pair', async () => {
    const adapter = createTestAdapter();
    
    // Test with BTC-USD pair
    const price = await retry(async () => {
      return await adapter.getAssetPrice('BTC-USD');
    });
    
    // Check that the result is a valid number
    expect(isValidNumber(price)).toBe(true);
    
    // BTC price should be greater than 0
    expect(price).toBeGreaterThan(0);
  });
  
  it('should return prices for multiple valid pairs', async () => {
    const adapter = createTestAdapter();
    const pairs = ['BTC-USD', 'ETH-USD', 'SOL-USD'];
    
    for (const pair of pairs) {
      const price = await retry(async () => {
        return await adapter.getAssetPrice(pair);
      });
      
      // Check that the result is a valid number
      expect(isValidNumber(price)).toBe(true);
      
      // Price should be greater than 0
      expect(price).toBeGreaterThan(0);
    }
  });
  
  it('should throw an error for an invalid pair', async () => {
    const adapter = createTestAdapter();
    const invalidPair = 'INVALID-USD';
    
    // The adapter should throw an error for an invalid pair
    await expect(adapter.getAssetPrice(invalidPair)).rejects.toThrow();
  });
  
  it('should handle pairs with different formats', async () => {
    const adapter = createTestAdapter();
    
    // Test with different pair formats
    const btcPrice = await retry(async () => {
      return await adapter.getAssetPrice('BTC-USD');
    });
    
    // Try with lowercase
    await expect(adapter.getAssetPrice('btc-usd')).rejects.toThrow();
    
    // Try without USD suffix
    await expect(adapter.getAssetPrice('BTC')).rejects.toThrow();
  });
});
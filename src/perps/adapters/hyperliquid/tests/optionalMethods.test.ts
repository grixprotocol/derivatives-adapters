/**
 * Tests for the optional methods of the Hyperliquid adapter
 */
import { createTestAdapter } from './utils';

describe('HyperliquidAdapter - Optional Methods', () => {
  describe('getNetwork', () => {
    it('should return the network name configured in the constructor', () => {
      // Create adapter with testnet configuration
      const adapter = createTestAdapter();
      
      // Test that getNetwork returns 'testnet'
      expect(adapter.getNetwork()).toBe('testnet');
      
      // Create adapter with mainnet configuration
      const mainnetAdapter = new (adapter.constructor as any)({
        network: 'mainnet'
      });
      
      // Test that getNetwork returns 'mainnet'
      expect(mainnetAdapter.getNetwork()).toBe('mainnet');
    });
  });
  
  describe('getProtocolName', () => {
    it('should return "Hyperliquid" as the protocol name', () => {
      const adapter = createTestAdapter();
      
      // Test that getProtocolName returns 'Hyperliquid'
      expect(adapter.getProtocolName()).toBe('Hyperliquid');
    });
  });
});
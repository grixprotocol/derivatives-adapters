import { LodeAdapter } from '../index';
import { testAdapter } from '../../__tests__/adapter.test';

describe('Lode Adapter Tests', () => {
  const adapter = new LodeAdapter({
    network: 'mainnet',
    // Add any protocol-specific config needed for testing
  });

  // Run the standard test suite
  testAdapter(adapter, 'Lode');

  // Add protocol-specific tests
  describe('Lode-specific functionality', () => {
    it('should return correct network', () => {
      expect(adapter.getNetwork()).toBe('mainnet');
    });

    it('should return correct protocol name', () => {
      expect(adapter.getProtocolName()).toBe('Lode');
    });
  });
}); 
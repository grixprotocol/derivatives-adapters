import { describe, expect, test } from '@jest/globals';
import { deribitAdapter } from '../adapters/deribit';
import { mobyAdapter } from '../adapters/moby';
import { ProtocolAdapter } from '../types/adapter';

function testAdapter(name: string, adapter: ProtocolAdapter) {
  describe(`${name} Adapter`, () => {
    // Test suite setup
    beforeAll(() => {
      console.log(`Testing ${name} adapter implementation`);
    });

    // Test fetchExpiryDates
    test('implements fetchExpiryDates correctly', async () => {
      expect(adapter.fetchExpiryDates).toBeDefined();
      const dates = await adapter.fetchExpiryDates(adapter.testParams.fetchExpiryDates);
      
      expect(Array.isArray(dates)).toBe(true);
      expect(dates).not.toHaveLength(0);
      
      dates?.forEach(date => {
        expect(typeof date).toBe('number');
        expect(date).toBeGreaterThan(Date.now() / 1000); // Should be future dates
      });
    });

    // Test getLongOptionPremium
    test('implements getLongOptionPremium correctly', async () => {
      expect(adapter.getLongOptionPremium).toBeDefined();
      const premium = await adapter.getLongOptionPremium(
        adapter.testParams.getLongOptionPremium
      );
      
      expect(typeof premium).toBe('number');
      expect(premium).toBeGreaterThan(0);
    });

    // Test getShortOptionPremium
    test('implements getShortOptionPremium correctly', async () => {
      expect(adapter.getShortOptionPremium).toBeDefined();
      const premium = await adapter.getShortOptionPremium(
        adapter.testParams.getShortOptionPremium
      );
      
      expect(typeof premium).toBe('number');
      expect(premium).toBeGreaterThan(0);
    });

    // Test listStrikePricesByExpiry
    test('implements listStrikePricesByExpiry correctly', async () => {
      expect(adapter.listStrikePricesByExpiry).toBeDefined();
      const strikePrices = await adapter.listStrikePricesByExpiry(
        adapter.testParams.listStrikePricesByExpiry
      );
      
      expect(Array.isArray(strikePrices)).toBe(true);
      expect(strikePrices).not.toHaveLength(0);
      
      strikePrices?.forEach(price => {
        expect(typeof price).toBe('number');
        expect(price).toBeGreaterThan(0);
      });
    });

    // Test suite teardown
    afterAll(() => {
      console.log(`Completed testing ${name} adapter`);
    });
  });
}

// Test all adapters
describe('Protocol Adapters', () => {
  testAdapter('Deribit', deribitAdapter);
//  testAdapter('Moby', mobyAdapter);
}); 
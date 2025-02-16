import { describe, expect, test } from '@jest/globals';
import { ithacaAdapter } from '../src/adapters/ithaca';
import { ProtocolAdapter } from '../src/types/adapter'; 
import { zommaAdapter } from '../src/adapters/zomma';

function testAdapter(name: string, adapter: ProtocolAdapter) {
  describe(`${name} Adapter`, () => {
    test('implements fetchExpiryDates', async () => {
      expect(adapter.fetchExpiryDates).toBeDefined();
      const dates = await adapter.fetchExpiryDates();
      expect(Array.isArray(dates)).toBe(true);
      dates.forEach(date => {
        console.log(`${name} adapter date: ${date}`);
        expect(typeof date).toBe('number');
      });
    });
    test('implements listStrikePricesByExpiry', async () => {
      expect(adapter.listStrikePricesByExpiry).toBeDefined();
      const strikePrices = await adapter.listStrikePricesByExpiry(1713446400);
      expect(Array.isArray(strikePrices)).toBe(true);
    });
    test('implements getLongOptionPremium', async () => {
      expect(adapter.getLongOptionPremium).toBeDefined();
      const premium = await adapter.getLongOptionPremium(1713446400, 10000);
      expect(typeof premium).toBe('number');
    });
  });
}

// Test the Ithaca adapter
testAdapter('Ithaca', ithacaAdapter);

// Export for use in other test files
export { testAdapter, type ProtocolAdapter }; 
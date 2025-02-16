import { describe, expect, test } from '@jest/globals';
import { deribitAdapter } from '../src/adapters/deribit';
import { ProtocolAdapter } from '../src/types/adapter'; 

function testAdapter(name: string, adapter: ProtocolAdapter) {
  describe(`${name} Adapter`, () => {
    test('implements fetchExpiryDates', async () => {
      expect(adapter.fetchExpiryDates).toBeDefined();
      const dates = await adapter.fetchExpiryDates(adapter.testParams.fetchExpiryDates);
      expect(Array.isArray(dates)).toBe(true);
      console.log('dates ->', dates);
      dates?.forEach(date => {
        expect(typeof date).toBe('number');
      });
    });
    test('implements getLongOptionPremium', async () => {
      expect(adapter.getLongOptionPremium).toBeDefined();
      const premium = await adapter.getLongOptionPremium(
        adapter.testParams.getLongOptionPremium
      );
      console.log('getLongOptionPremium premium ->', premium);
      expect(typeof premium).toBe('number');
    });
    test('implements getShortOptionPremium', async () => {
      expect(adapter.getShortOptionPremium).toBeDefined();
      const premium = await adapter.getShortOptionPremium(
        adapter.testParams.getShortOptionPremium
      );
      console.log('getShortOptionPremium premium ->', premium);
      expect(typeof premium).toBe('number');
    });
  });
}

testAdapter('Deribit', deribitAdapter);
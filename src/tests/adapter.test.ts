import { describe, expect, test } from '@jest/globals';
import { deribitAdapter } from '../adapters/deribit';
import { mobyAdapter } from '../adapters/moby';
import { ProtocolAdapter } from '../types/adapter'; 

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
    test('implements listStrikePricesByExpiry', async () => {
      expect(adapter.listStrikePricesByExpiry).toBeDefined();
      const strikePrices = await adapter.listStrikePricesByExpiry(
        adapter.testParams.listStrikePricesByExpiry
      );
      console.log('listStrikePricesByExpiry strikePrices ->', strikePrices);
      expect(Array.isArray(strikePrices)).toBe(true);
      strikePrices?.forEach(price => {
        expect(typeof price).toBe('number');
      });
    });
  });
}

testAdapter('Deribit', deribitAdapter);
testAdapter('Moby', mobyAdapter); 
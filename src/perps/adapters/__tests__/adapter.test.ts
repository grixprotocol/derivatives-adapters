import { IPerpsAdapter } from '../base';

// Generic test suite that can be used for any adapter
export function testAdapter(adapter: IPerpsAdapter, protocolName: string) {
  describe(`${protocolName} Adapter`, () => {
    describe('getPairs', () => {
      it('should return an array of trading pairs', async () => {
        const pairs = await adapter.getPairs();
        expect(Array.isArray(pairs)).toBe(true);
        expect(pairs.length).toBeGreaterThan(0);
        pairs.forEach(pair => {
          expect(typeof pair).toBe('string');
        });
      });
    });

    describe('getAssetPrice', () => {
      it('should return a valid price for a given pair', async () => {
        const pairs = await adapter.getPairs();
        const price = await adapter.getAssetPrice(pairs[0]);
        expect(typeof price).toBe('number');
        expect(price).toBeGreaterThan(0);
      });

      it('should throw error for invalid pair', async () => {
        await expect(adapter.getAssetPrice('INVALID-PAIR'))
          .rejects.toThrow();
      });
    });

    describe('getFundingRate', () => {
      it('should return a valid funding rate for a given pair', async () => {
        const pairs = await adapter.getPairs();
        const rate = await adapter.getFundingRate(pairs[0]);
        expect(typeof rate).toBe('number');
      });
    });
  });
} 
import { TemplateAdapter } from '../index';

describe('TemplateAdapter', () => {
  let adapter: TemplateAdapter;

  beforeEach(() => {
    // Create a new instance of the adapter before each test
    adapter = new TemplateAdapter({
      network: 'testnet',
    });
  });

  describe('Required Methods', () => {
    test('getPairs returns an array of strings', async () => {
      const pairs = await adapter.getPairs();
      expect(Array.isArray(pairs)).toBe(true);
      expect(pairs.length).toBeGreaterThan(0);
      pairs.forEach(pair => expect(typeof pair).toBe('string'));
    });

    test('getAssetPrice returns a number for a valid pair', async () => {
      const price = await adapter.getAssetPrice('BTC-USD');
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });

    test('getFundingRate returns a number for a valid pair', async () => {
      const fundingRate = await adapter.getFundingRate('BTC-USD');
      expect(typeof fundingRate).toBe('number');
    });
  });

  describe('Optional Methods', () => {
    test('getNetwork returns the configured network', () => {
      expect(adapter.getNetwork()).toBe('testnet');
    });

    test('getProtocolName returns the protocol name', () => {
      expect(adapter.getProtocolName()).toBe('Template');
    });
  });

  describe('Extended Methods', () => {
    test('getPerpetualsMetadata returns an array of metadata objects', async () => {
      const metadata = await adapter.getPerpetualsMetadata();
      expect(Array.isArray(metadata)).toBe(true);
      expect(metadata.length).toBeGreaterThan(0);
      
      // Check the structure of the first metadata object
      const firstMetadata = metadata[0];
      expect(firstMetadata).toHaveProperty('name');
      expect(firstMetadata).toHaveProperty('szDecimals');
      expect(firstMetadata).toHaveProperty('maxLeverage');
    });

    test('getHistoricalFundingRates returns an array of funding rate history objects', async () => {
      const startTime = Date.now() - (24 * 60 * 60 * 1000); // 24 hours ago
      const history = await adapter.getHistoricalFundingRates({
        pair: 'BTC-USD',
        startTime,
      });
      
      expect(Array.isArray(history)).toBe(true);
      
      if (history.length > 0) {
        // Check the structure of the first history object
        const firstHistory = history[0];
        expect(firstHistory).toHaveProperty('coin');
        expect(firstHistory).toHaveProperty('fundingRate');
        expect(firstHistory).toHaveProperty('premium');
        expect(firstHistory).toHaveProperty('time');
      }
    });

    test('getPredictedFundingRates returns an array of predicted funding rate objects', async () => {
      const predicted = await adapter.getPredictedFundingRates();
      
      expect(Array.isArray(predicted)).toBe(true);
      expect(predicted.length).toBeGreaterThan(0);
      
      // Check the structure of the first predicted object
      const firstPredicted = predicted[0];
      expect(firstPredicted).toHaveProperty('asset');
      expect(firstPredicted).toHaveProperty('venues');
      expect(Array.isArray(firstPredicted.venues)).toBe(true);
      
      if (firstPredicted.venues.length > 0) {
        const firstVenue = firstPredicted.venues[0];
        expect(firstVenue).toHaveProperty('name');
        expect(firstVenue).toHaveProperty('rate');
      }
    });

    test('getPerpsAtOpenInterestCap returns an array of strings', async () => {
      const perpsAtCap = await adapter.getPerpsAtOpenInterestCap();
      
      expect(Array.isArray(perpsAtCap)).toBe(true);
      
      if (perpsAtCap.length > 0) {
        perpsAtCap.forEach(pair => expect(typeof pair).toBe('string'));
      }
    });
  });
}); 
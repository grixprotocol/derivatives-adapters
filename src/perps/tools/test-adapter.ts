#!/usr/bin/env node

/**
 * Testing framework for protocol adapters
 * 
 * This tool runs tests for a protocol adapter to ensure it meets the required interface.
 * It tests all required methods and optional methods if they are implemented.
 * 
 * Usage:
 * ```
 * npx ts-node src/perps/tools/test-adapter.ts <adapter-name>
 * ```
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

// Main function
async function main() {
  try {
    // Get adapter name from command line arguments
    const adapterName = process.argv[2];
    if (!adapterName) {
      console.error('Please provide an adapter name');
      console.error('Usage: npx ts-node src/perps/tools/test-adapter.ts <adapter-name>');
      process.exit(1);
    }

    // Paths
    const rootDir = path.resolve(__dirname, '..', '..');
    const adapterDir = path.join(rootDir, 'perps', 'adapters', adapterName.toLowerCase());
    
    // Check if adapter directory exists
    if (!fs.existsSync(adapterDir)) {
      console.error(`Adapter directory ${adapterDir} does not exist`);
      process.exit(1);
    }

    // Check if tests directory exists
    const testsDir = path.join(adapterDir, 'tests');
    if (!fs.existsSync(testsDir)) {
      console.error(`Tests directory ${testsDir} does not exist`);
      console.error('Creating tests directory...');
      fs.mkdirSync(testsDir, { recursive: true });
    }

    // Create test file if it doesn't exist
    const testFile = path.join(testsDir, `${adapterName.toLowerCase()}.test.ts`);
    if (!fs.existsSync(testFile)) {
      console.log(`Creating test file ${testFile}...`);
      createTestFile(adapterName, testFile);
    }

    // Run tests
    console.log(`Running tests for ${adapterName} adapter...`);
    try {
      execSync(`npm test -- --testPathPattern=src/perps/adapters/${adapterName.toLowerCase()}`, {
        stdio: 'inherit',
      });
      console.log(`✅ Tests passed for ${adapterName} adapter`);
    } catch (error) {
      console.error(`❌ Tests failed for ${adapterName} adapter`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Create test file
function createTestFile(adapterName: string, testFile: string) {
  const capitalizedName = adapterName.charAt(0).toUpperCase() + adapterName.slice(1);
  
  const testContent = `import { ${capitalizedName}Adapter } from '../index';

describe('${capitalizedName}Adapter', () => {
  let adapter: ${capitalizedName}Adapter;

  beforeEach(() => {
    // Create a new instance of the adapter before each test
    adapter = new ${capitalizedName}Adapter({
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
      expect(adapter.getProtocolName()).toBe('${capitalizedName}');
    });
  });

  // Uncomment and implement these tests if you have implemented the extended methods
  /*
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
  */
});
`;

  fs.writeFileSync(testFile, testContent);
}

// Run the main function
main().catch(console.error); 
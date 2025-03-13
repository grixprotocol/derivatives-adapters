# Hyperliquid Adapter

## Overview
This directory contains the implementation of the Hyperliquid adapter for perpetual futures trading. The adapter implements the `IPerpsAdapter` interface defined in `../base.ts` and provides additional Hyperliquid-specific methods.

## Files
- `index.ts`: Main adapter implementation file
- `methods/`: Directory containing individual method implementations
  - `getPairs.ts`: Implementation of the getPairs method
  - `getAssetPrice.ts`: Implementation of the getAssetPrice method
  - `getFundingRate.ts`: Implementation of the getFundingRate method
  - `getPerpetualsMetadata.ts`: Implementation of the getPerpetualsMetadata method
  - `getHistoricalFundingRates.ts`: Implementation of the getHistoricalFundingRates method
  - `getPredictedFundingRates.ts`: Implementation of the getPredictedFundingRates method
  - `getPerpsAtOpenInterestCap.ts`: Implementation of the getPerpsAtOpenInterestCap method
  - `utils.ts`: Utility functions used across methods
  - `index.ts`: Exports all methods
- `tests/`: Directory containing test files for the adapter
  - `utils.ts`: Test utilities for working with the Hyperliquid SDK
  - `optionalMethods.test.ts`: Tests for the optional methods (getNetwork and getProtocolName)
  - `getPairs.test.ts`: Tests for the getPairs method
  - `getAssetPrice.test.ts`: Tests for the getAssetPrice method
  - `getFundingRate.test.ts`: Tests for the getFundingRate method
  - `getPerpetualsMetadata.test.ts`: Tests for the getPerpetualsMetadata method
  - `getHistoricalFundingRates.test.ts`: Tests for the getHistoricalFundingRates method
  - `getPredictedFundingRates.test.ts`: Tests for the getPredictedFundingRates method
  - `getPerpsAtOpenInterestCap.test.ts`: Tests for the getPerpsAtOpenInterestCap method
- `todo.md`: Todo list for implementing tests
- `hyperliquid_updates.md`: Tracking file for updates to the adapter

## Implementation Status
The adapter is fully implemented with the following methods:

### Required Methods (IPerpsAdapter Interface)
- `getPairs()`: Fetches available trading pairs from Hyperliquid
- `getAssetPrice(pair: string)`: Fetches current asset price for a given pair
- `getFundingRate(pair: string)`: Fetches current funding rate for a given pair

### Optional Methods (IPerpsAdapter Interface)
- `getNetwork()`: Returns the network configuration
- `getProtocolName()`: Returns "Hyperliquid" as the protocol name

### Additional Hyperliquid-Specific Methods
- `getPerpetualsMetadata()`: Fetches metadata about all perpetual contracts
- `getHistoricalFundingRates(params)`: Fetches historical funding rates for a specific trading pair
- `getPredictedFundingRates()`: Fetches predicted funding rates for different venues
- `getPerpsAtOpenInterestCap()`: Fetches a list of perpetual contracts that have reached their open interest caps

## Testing
The adapter includes comprehensive tests for all methods. The tests use the actual Hyperliquid SDK to make real API calls to the testnet environment. To run the tests:

```bash
npm test
```

Note that the tests may take some time to run due to network latency, and they may occasionally fail due to network issues or API changes. The test utilities include retry logic to handle flaky tests.

## Configuration
The adapter is configured with the following parameters:
- `network`: The network to connect to ('mainnet' or 'testnet')
- `timeout`: Optional timeout for API requests in milliseconds (default: 10000)

## Installation
To use this adapter, you need to install the Hyperliquid SDK:

```bash
# npm
npm install @nktkas/hyperliquid

# yarn
yarn add @nktkas/hyperliquid

# pnpm
pnpm add @nktkas/hyperliquid
```

## Usage Examples

### Basic Usage
```typescript
import { HyperliquidAdapter } from './index';

// Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

// Use the required methods
const pairs = await adapter.getPairs();
const price = await adapter.getAssetPrice('BTC-USD');
const fundingRate = await adapter.getFundingRate('BTC-USD');
```

### Using Additional Hyperliquid-Specific Methods
```typescript
import { HyperliquidAdapter } from './index';

// Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

// Get metadata about all perpetual contracts
const metadata = await adapter.getPerpetualsMetadata();
console.log('Available assets:', metadata.map(asset => asset.name));

// Get historical funding rates for BTC-USD
const historicalRates = await adapter.getHistoricalFundingRates({
  pair: 'BTC-USD',
  startTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
});
console.log('Historical funding rates:', historicalRates);

// Get predicted funding rates for all assets
const predictedRates = await adapter.getPredictedFundingRates();
console.log('Predicted funding rates:', predictedRates);

// Get perps at open interest cap
const perpsAtCap = await adapter.getPerpsAtOpenInterestCap();
console.log('Perps at open interest cap:', perpsAtCap);
```

## API Documentation
For more information about the Hyperliquid API, refer to the official documentation:
- [Hyperliquid API Documentation](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api)
- [Perpetuals Endpoints](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals) 
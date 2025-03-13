# Hyperliquid Adapter for Grix Protocol

This adapter provides a standardized interface for interacting with the Hyperliquid perpetual futures protocol within the Grix Protocol ecosystem.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
  - [Required Methods](#required-methods)
  - [Optional Methods](#optional-methods)
  - [Additional Methods](#additional-methods)
- [Examples](#examples)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Documentation](#documentation)

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

## Configuration

The adapter is configured with the following options:

```typescript
interface HyperliquidAdapterConfig {
  // Network to connect to: 'mainnet' or 'testnet'
  network: 'mainnet' | 'testnet';
  
  // Optional timeout for API requests in milliseconds (default: 10000)
  timeout?: number;
}
```

## Basic Usage

```typescript
import { HyperliquidAdapter } from './index';

// Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet', // or 'testnet'
  timeout: 15000, // optional, default is 10000
});

// Use the adapter methods
async function main() {
  try {
    // Get all available trading pairs
    const pairs = await adapter.getPairs();
    console.log('Available pairs:', pairs);

    // Get the current price for BTC-USD
    const price = await adapter.getAssetPrice('BTC-USD');
    console.log('BTC-USD price:', price);

    // Get the current funding rate for ETH-USD
    const fundingRate = await adapter.getFundingRate('ETH-USD');
    console.log('ETH-USD funding rate:', fundingRate);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

## Project Structure

The adapter is organized into the following directory structure:

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

## API Reference

### Required Methods

These methods are required by the `IPerpsAdapter` interface:

#### `getPairs(): Promise<string[]>`

Fetches all available trading pairs from Hyperliquid.

**Returns:** A promise that resolves to an array of trading pair strings (e.g., `["BTC-USD", "ETH-USD", ...]`).

#### `getAssetPrice(pair: string): Promise<number>`

Fetches the current price for a specific trading pair.

**Parameters:**
- `pair`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")

**Returns:** A promise that resolves to the current price as a number.

#### `getFundingRate(pair: string): Promise<number>`

Fetches the current funding rate for a specific trading pair.

**Parameters:**
- `pair`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")

**Returns:** A promise that resolves to the current funding rate as a number.

### Optional Methods

These methods are optional in the `IPerpsAdapter` interface but are implemented in this adapter:

#### `getNetwork(): string`

Returns the network the adapter is configured for.

**Returns:** The network name ('mainnet' or 'testnet').

#### `getProtocolName(): string`

Returns the name of the protocol.

**Returns:** The protocol name ('Hyperliquid').

### Additional Methods

These methods are specific to the Hyperliquid adapter and are not part of the `IPerpsAdapter` interface:

#### `getPerpetualsMetadata(): Promise<PerpetualMetadata[]>`

Fetches metadata about all perpetual contracts from Hyperliquid.

**Returns:** A promise that resolves to an array of perpetual contract metadata.

```typescript
interface PerpetualMetadata {
  name: string;        // Asset name (e.g., "BTC")
  szDecimals: number;  // Decimal places for size
  maxLeverage: number; // Maximum leverage allowed
  onlyIsolated?: boolean; // Whether the asset can only be traded with isolated margin
  isDelisted?: boolean;   // Whether the asset is delisted
}
```

#### `getHistoricalFundingRates(params: GetHistoricalFundingRatesParams): Promise<FundingRateHistory[]>`

Fetches historical funding rates for a specific trading pair.

**Parameters:**
```typescript
interface GetHistoricalFundingRatesParams {
  pair: string;      // Trading pair (e.g., "BTC-USD")
  startTime: number; // Start time in milliseconds, inclusive
  endTime?: number;  // End time in milliseconds, inclusive (default: current time)
}
```

**Returns:** A promise that resolves to an array of historical funding rate entries.

```typescript
interface FundingRateHistory {
  coin: string;        // Asset name (e.g., "BTC")
  fundingRate: string; // Funding rate as a string (e.g., "0.0001")
  premium: string;     // Premium as a string (e.g., "0.0002")
  time: number;        // Timestamp in milliseconds
}
```

#### `getPredictedFundingRates(): Promise<AssetPredictedFundingRates[]>`

Fetches predicted funding rates for different venues.

**Returns:** A promise that resolves to an array of predicted funding rates by asset and venue.

```typescript
interface AssetPredictedFundingRates {
  asset: string;  // Asset name (e.g., "BTC")
  venues: {
    name: string; // Venue name (e.g., "HlPerp", "BinPerp", etc.)
    rate: {
      fundingRate: string;    // Funding rate as a string (e.g., "0.0001")
      nextFundingTime: number; // Next funding time in milliseconds
    } | null;
  }[];
}
```

#### `getPerpsAtOpenInterestCap(): Promise<string[]>`

Fetches a list of perpetual contracts that have reached their open interest caps.

**Returns:** A promise that resolves to an array of trading pair strings that have reached their open interest caps.

## Examples

### Fetching Historical Funding Rates

```typescript
import { HyperliquidAdapter } from './index';

const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

async function fetchHistoricalFundingRates() {
  try {
    // Get historical funding rates for BTC-USD for the past 7 days
    const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    
    const historicalRates = await adapter.getHistoricalFundingRates({
      pair: 'BTC-USD',
      startTime: oneWeekAgo,
    });
    
    // Calculate average funding rate
    const avgFundingRate = historicalRates.reduce((sum, rate) => {
      return sum + parseFloat(rate.fundingRate);
    }, 0) / historicalRates.length;
    
    console.log('Historical funding rates:', historicalRates);
    console.log('Average funding rate:', avgFundingRate);
  } catch (error) {
    console.error('Error fetching historical funding rates:', error);
  }
}

fetchHistoricalFundingRates();
```

### Comparing Predicted Funding Rates Across Venues

```typescript
import { HyperliquidAdapter } from './index';

const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

async function compareFundingRates() {
  try {
    const predictedRates = await adapter.getPredictedFundingRates();
    
    // Find BTC predicted funding rates
    const btcRates = predictedRates.find(asset => asset.asset === 'BTC');
    
    if (btcRates) {
      console.log('BTC predicted funding rates by venue:');
      btcRates.venues.forEach(venue => {
        if (venue.rate) {
          console.log(`${venue.name}: ${venue.rate.fundingRate} (next funding at ${new Date(venue.rate.nextFundingTime).toISOString()})`);
        } else {
          console.log(`${venue.name}: No data available`);
        }
      });
    }
  } catch (error) {
    console.error('Error comparing funding rates:', error);
  }
}

compareFundingRates();
```

## Error Handling

All methods in the adapter include proper error handling. Errors are caught and rethrown with more descriptive messages. Here's an example of how to handle errors:

```typescript
import { HyperliquidAdapter } from './index';

const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

async function handleErrors() {
  try {
    // Try to get the price for a non-existent pair
    const price = await adapter.getAssetPrice('NONEXISTENT-USD');
    console.log('Price:', price);
  } catch (error) {
    console.error('Error occurred:', error.message);
    // Output: Error occurred: Failed to fetch price for NONEXISTENT-USD from Hyperliquid: Asset not found: NONEXISTENT
  }
}

handleErrors();
```

## Testing

The adapter includes comprehensive tests for all methods. The tests use the actual Hyperliquid SDK to make real API calls to the testnet environment. To run the tests:

```bash
npm test
```

Note that the tests may take some time to run due to network latency, and they may occasionally fail due to network issues or API changes. The test utilities include retry logic to handle flaky tests.

### Test Coverage

The tests cover all implemented methods:

- Required methods:
  - `getPairs()`
  - `getAssetPrice(pair: string)`
  - `getFundingRate(pair: string)`
- Optional methods:
  - `getNetwork()`
  - `getProtocolName()`
- Additional Hyperliquid-specific methods:
  - `getPerpetualsMetadata()`
  - `getHistoricalFundingRates(params)`
  - `getPredictedFundingRates()`
  - `getPerpsAtOpenInterestCap()`

### Test Utilities

The `tests/utils.ts` file provides utility functions for working with the Hyperliquid SDK in a testing environment, including retry logic for handling flaky tests due to network issues.

## Documentation

For more information about the Hyperliquid API, refer to the official documentation:

- [Hyperliquid API Documentation](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api)
- [Perpetuals Endpoints](https://hyperliquid.gitbook.io/hyperliquid-docs/for-developers/api/info-endpoint/perpetuals) 
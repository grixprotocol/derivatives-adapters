# Hyperliquid Adapter for Grix Protocol

Imagine Jack Dorsey in 2006. He needed a way to quickly get real-time market data to power the first version of Twitter. He might have used something like this adapter!

This adapter provides a standardized interface for interacting with the Hyperliquid perpetual futures protocol within the Grix Protocol ecosystem. It helps you to easily access market data, manage positions, and execute trades on Hyperliquid, saving you time and effort.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Basic Usage](#basic-usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
  - [Impulsive Amiables: Quick Start](#impulsive-amiables-quick-start)
  - [Detail-Oriented Analysts: Technical Deep Dive](#detail-oriented-analysts-technical-deep-dive)
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

The adapter is configured with the following options. You can configure the adapter for different environments (e.g., development, testing, production) by setting the appropriate environment variables.

```typescript
interface HyperliquidAdapterConfig {
  // Network to connect to: 'mainnet' or 'testnet'
  network: 'mainnet' | 'testnet';

  // Optional timeout for API requests in milliseconds (default: 10000)
  timeout?: number;
}
```

### Configuration Options

*   `network`: Specifies the Hyperliquid network to connect to.
    *   `mainnet`: Connects to the main Hyperliquid network. Use this for production environments.
    *   `testnet`: Connects to the Hyperliquid test network. Use this for development and testing environments.
*   `timeout`: Specifies the maximum amount of time (in milliseconds) to wait for an API request to complete.
    *   Default: `10000` (10 seconds)
    *   You can increase this value if you are experiencing frequent timeouts due to network latency.

## Basic Usage

Here are some basic examples of how to use the adapter:

```typescript
import { HyperliquidAdapter } from './index';

// 1. Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet', // or 'testnet'
  timeout: 15000, // optional, default is 10000
});

// 2. Use the adapter methods
async function main() {
  try {
    // 3. Get all available trading pairs
    const pairs = await adapter.getPairs();
    console.log('Available pairs:', pairs);

    // 4. Get the current price for BTC-USD
    const price = await adapter.getAssetPrice('BTC-USD');
    console.log('BTC-USD price:', price);

    // 5. Get the current funding rate for ETH-USD
    const fundingRate = await adapter.getFundingRate('ETH-USD');
    console.log('ETH-USD funding rate:', fundingRate);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
```

### Example: Fetching and Displaying Trading Pairs

This example demonstrates how to fetch all available trading pairs and display them in the console:

```typescript
import { HyperliquidAdapter } from './index';

const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

async function displayTradingPairs() {
  try {
    const pairs = await adapter.getPairs();
    console.log('Available trading pairs:');
    pairs.forEach(pair => console.log(pair));
  } catch (error) {
    console.error('Error fetching trading pairs:', error);
  }
}

displayTradingPairs();
```

### Example: Getting the Price of a Specific Asset

This example demonstrates how to get the current price of a specific asset (e.g., BTC-USD):

```typescript
import { HyperliquidAdapter } from './index';

const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

async function getBtcPrice() {
  try {
    const price = await adapter.getAssetPrice('BTC-USD');
    console.log('BTC-USD price:', price);
  } catch (error) {
    console.error('Error fetching BTC-USD price:', error);
  }
}

getBtcPrice();
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
  - `getFundingRate.ts`: Tests for the getFundingRate method
  - `getPerpetualsMetadata.ts`: Tests for the getPerpetualsMetadata method
  - `getHistoricalFundingRates.ts`: Tests for the getHistoricalFundingRates method
  - `getPredictedFundingRates.ts`: Tests for the getPredictedFundingRates method
  - `getPerpsAtOpenInterestCap.ts`: Tests for the getPerpsAtOpenInterestCap method

## API Reference

### Impulsive Amiables: Quick Start

For users who want to get started quickly and see results immediately.

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

### Detail-Oriented Analysts: Technical Deep Dive

For users who need a comprehensive understanding of the API and its underlying mechanisms.

#### `getNetwork(): string`

Returns the network the adapter is configured for.

**Returns:** The network name ('mainnet' or 'testnet').

#### `getProtocolName(): string`

Returns the name of the protocol.

**Returns:** The protocol name ('Hyperliquid').

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

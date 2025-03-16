# Template Adapter for Grix Protocol

This is a template for creating new protocol adapters for the Grix Protocol. It provides a standardized interface for interacting with perpetual futures protocols.

## Table of Contents

- [Getting Started](#getting-started)
- [Adapter Structure](#adapter-structure)
- [Required Methods](#required-methods)
- [Optional Methods](#optional-methods)
- [Testing](#testing)
- [Documentation](#documentation)

## Getting Started

To create a new protocol adapter:

1. Copy this template directory to a new directory named after your protocol (e.g., `src/perps/adapters/yourprotocol`).
2. Replace all occurrences of "Template" with your protocol name.
3. Install your protocol's SDK:

```bash
# npm
npm install your-protocol-sdk

# yarn
yarn add your-protocol-sdk

# pnpm
pnpm add your-protocol-sdk
```

4. Implement the required methods in the `methods` directory.
5. Update the README.md file with your protocol-specific information.
6. Write tests for your adapter in the `tests` directory.

## Adapter Structure

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

## Required Methods

The following methods are required for all adapters:

### `getPairs(): Promise<string[]>`

Fetches all available trading pairs from the protocol.

**Returns:** A promise that resolves to an array of trading pair strings (e.g., `["BTC-USD", "ETH-USD", ...]`).

### `getAssetPrice(pair: string): Promise<number>`

Fetches the current price for a specific trading pair.

**Parameters:**
- `pair`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")

**Returns:** A promise that resolves to the current price as a number.

### `getFundingRate(pair: string): Promise<number>`

Fetches the current funding rate for a specific trading pair.

**Parameters:**
- `pair`: Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")

**Returns:** A promise that resolves to the current funding rate as a number.

## Optional Methods

The following methods are optional but recommended:

### `getNetwork(): string`

Returns the network the adapter is configured for.

**Returns:** The network name ('mainnet' or 'testnet').

### `getProtocolName(): string`

Returns the name of the protocol.

**Returns:** The protocol name.

### `getPerpetualsMetadata(): Promise<PerpetualMetadata[]>`

Fetches metadata about all perpetual contracts from the protocol.

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

### `getHistoricalFundingRates(params: GetHistoricalFundingRatesParams): Promise<FundingRateHistory[]>`

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

### `getPredictedFundingRates(): Promise<AssetPredictedFundingRates[]>`

Fetches predicted funding rates for different venues.

**Returns:** A promise that resolves to an array of predicted funding rates by asset and venue.

```typescript
interface AssetPredictedFundingRates {
  asset: string;  // Asset name (e.g., "BTC")
  venues: {
    name: string; // Venue name (e.g., "TemplatePerp", "BinPerp", etc.)
    rate: {
      fundingRate: string;    // Funding rate as a string (e.g., "0.0001")
      nextFundingTime: number; // Next funding time in milliseconds
    } | null;
  }[];
}
```

### `getPerpsAtOpenInterestCap(): Promise<string[]>`

Fetches a list of perpetual contracts that have reached their open interest caps.

**Returns:** A promise that resolves to an array of trading pair strings that have reached their open interest caps.

## Testing

To test your adapter, create test files in the `tests` directory. You can use the following command to run the tests:

```bash
npm test -- --testPathPattern=src/perps/adapters/yourprotocol
```

## Documentation

Update this README.md file with your protocol-specific information, including:

- Installation instructions for your protocol's SDK
- Configuration options
- Basic usage examples
- API reference
- Error handling
- Testing instructions 
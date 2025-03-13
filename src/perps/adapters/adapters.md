# Perpetuals Adapters

## Overview
This directory contains adapter implementations for various perpetual futures trading protocols. Each adapter implements the `IPerpsAdapter` interface defined in `base.ts`.

## Files and Directories
- `base.ts`: Defines the base interface (`IPerpsAdapter`) that all perpetuals adapters must implement
- `__tests__/`: Contains test files for the adapters
- `hyperliquid/`: Hyperliquid protocol adapter implementation
- `derive/`: Derive protocol adapter implementation
- `lode/`: Lode protocol adapter implementation

## Interface
The `IPerpsAdapter` interface defines the following required methods:
- `getPairs()`: Returns a list of available trading pairs
- `getAssetPrice(pair: string)`: Returns the current price for a given trading pair
- `getFundingRate(pair: string)`: Returns the current funding rate for a given trading pair

And the following optional methods:
- `getNetwork()`: Returns the network the adapter is configured for
- `getProtocolName()`: Returns the name of the protocol

## Implementation Status
- Hyperliquid: In progress - Basic structure implemented, required methods not yet implemented
- Derive: Status unknown
- Lode: Status unknown

## Adding a New Adapter
To add a new adapter for a perpetual futures protocol:

1. Create a new directory with the protocol name
2. Create an `index.ts` file that exports a class implementing the `IPerpsAdapter` interface
3. Implement all required methods
4. Add tests in the `__tests__` directory
5. Document the adapter usage and configuration

## Usage Example
```typescript
import { HyperliquidAdapter } from './hyperliquid';

// Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

// Use the adapter methods
const pairs = await adapter.getPairs();
const price = await adapter.getAssetPrice('BTC-USD');
const fundingRate = await adapter.getFundingRate('BTC-USD');
``` 
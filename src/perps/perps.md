# Perpetuals (Perps) Module

## Overview
This directory contains the implementation of adapters for perpetual futures trading protocols. The module provides a standardized interface for interacting with different perpetual futures protocols.

## Directories
- `adapters/`: Contains adapter implementations for various perpetual futures protocols
- `types/`: Contains type definitions used throughout the perpetuals module
- `tests/`: Contains test files for the perpetuals module

## Architecture
The perpetuals module follows the adapter pattern, where each protocol has its own adapter that implements a standardized interface (`IPerpsAdapter`). This allows the main application to interact with any protocol through the same methods.

## Adapter Interface
The `IPerpsAdapter` interface defines the following required methods:
- `getPairs()`: Returns a list of available trading pairs
- `getAssetPrice(pair: string)`: Returns the current price for a given trading pair
- `getFundingRate(pair: string)`: Returns the current funding rate for a given trading pair

And the following optional methods:
- `getNetwork()`: Returns the network the adapter is configured for
- `getProtocolName()`: Returns the name of the protocol

## Supported Protocols
Currently, the module is working on supporting the following protocols:
- Hyperliquid
- Derive
- Lode

## Implementation Status
The perpetuals module is currently in development, with the following status:
- Base interface: Completed
- Hyperliquid adapter: In progress
- Other adapters: Planned

## Usage Example
```typescript
import { HyperliquidAdapter } from './adapters/hyperliquid';

// Create a new instance of the adapter
const adapter = new HyperliquidAdapter({
  network: 'mainnet',
});

// Use the adapter methods
const pairs = await adapter.getPairs();
const price = await adapter.getAssetPrice('BTC-USD');
const fundingRate = await adapter.getFundingRate('BTC-USD');
``` 
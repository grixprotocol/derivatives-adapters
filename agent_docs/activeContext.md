# Active Context

## Current Work
We are currently implementing the Hyperliquid adapter for perpetual futures (perps) trading. The adapter needs to implement the IPerpsAdapter interface defined in `src/perps/adapters/base.ts`.

The Hyperliquid adapter is located at `src/perps/adapters/hyperliquid/index.ts` and currently has stub implementations for the required methods:
- `getPairs()`: For fetching available trading pairs
- `getAssetPrice(pair: string)`: For fetching asset price
- `getFundingRate(pair: string)`: For fetching funding rate

All methods currently throw "Not implemented" errors and need to be properly implemented.

## Recent Changes
- Created the basic structure for the Hyperliquid adapter
- Defined the constructor with network configuration
- Implemented the optional methods `getNetwork()` and `getProtocolName()`

## Next Steps
1. Implement the `getPairs()` method to fetch available trading pairs from Hyperliquid
2. Implement the `getAssetPrice(pair: string)` method to fetch current asset prices
3. Implement the `getFundingRate(pair: string)` method to fetch current funding rates
4. Add any necessary helper methods or utilities specific to Hyperliquid
5. Write tests for the adapter implementation
6. Document the adapter usage and configuration options

## Current Focus
The immediate focus is on implementing the `getFundingRate(pair: string)` method, which needs to fetch the current funding rate for a specified trading pair from the Hyperliquid API. 
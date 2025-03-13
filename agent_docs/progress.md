# Progress

## What Works
- The base interface for perpetuals adapters (`IPerpsAdapter`) is defined and ready for implementation.
- Several adapters have been implemented for options protocols (as seen in the README).
- The project structure is set up with proper organization for both options and perpetuals adapters.
- Testing framework is in place with Jest.

## What's Left to Build

### Hyperliquid Adapter Implementation
- **getPairs()**: Method to fetch available trading pairs from Hyperliquid API
  - Status: Not implemented
  - Priority: High
  
- **getAssetPrice(pair: string)**: Method to fetch current asset price for a given pair
  - Status: Not implemented
  - Priority: High
  
- **getFundingRate(pair: string)**: Method to fetch current funding rate for a given pair
  - Status: Not implemented
  - Priority: High (Current focus)

### Other Perpetuals Adapters
- Complete implementation of other perpetuals adapters (Derive, Lode, etc.)
- Add more adapters for other perpetual futures protocols

### Testing
- Write unit tests for all adapter implementations
- Create integration tests for end-to-end testing

### Documentation
- Document usage examples for each adapter
- Create API reference documentation
- Update README with information about perpetuals adapters

## Progress Status

### Overall Project Status
- Options Adapters: ~70% complete
- Perpetuals Adapters: ~20% complete
- Testing: ~50% complete
- Documentation: ~40% complete

### Hyperliquid Adapter Status
- Basic structure: 100% complete
- Required methods implementation: 0% complete
- Optional methods implementation: 100% complete
- Testing: 0% complete
- Documentation: 0% complete

### Next Immediate Tasks
1. Implement the `getFundingRate(pair: string)` method for the Hyperliquid adapter
2. Implement the `getAssetPrice(pair: string)` method for the Hyperliquid adapter
3. Implement the `getPairs()` method for the Hyperliquid adapter
4. Write tests for the Hyperliquid adapter
5. Document the Hyperliquid adapter usage 
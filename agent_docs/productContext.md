# Product Context: Grix Protocol Adapters

## Why This Project Exists
The Grix Protocol Adapters project exists to standardize the integration of various DeFi derivatives protocols (options and perpetuals) with the Grix platform. It provides a unified interface for interacting with different protocols, allowing Grix to offer a comprehensive view of the DeFi derivatives market to its users.

## Problems It Solves
1. **Fragmentation in DeFi Derivatives**: The DeFi derivatives space is fragmented with multiple protocols, each with their own APIs and interfaces. This project creates a standardized way to interact with all of them.
2. **Integration Complexity**: Without adapters, integrating each protocol would require custom code, increasing development time and maintenance burden.
3. **Market Access**: Users would need to interact with multiple platforms to access the full range of derivatives products. This project enables a single point of access.
4. **Data Consistency**: Different protocols represent similar data in different formats. The adapters normalize this data for consistent handling.

## How It Should Work
The project follows an adapter pattern with these key components:

### Options Adapters
Options adapters implement a standard interface with methods for:
- Fetching expiry dates for options
- Listing strike prices by expiry
- Getting long and short option premiums
- Executing various options operations (buy, sell, exercise, etc.)

### Perpetuals (Perps) Adapters
Perps adapters implement a standard interface with methods for:
- Getting available trading pairs
- Fetching asset prices
- Retrieving funding rates
- Protocol-specific operations

### Implementation Process
1. Each protocol gets its own adapter implementation that conforms to the base interface
2. Adapters handle the protocol-specific API calls and data transformations
3. The Grix platform interacts with all protocols through these standardized adapters
4. New protocols can be added by implementing new adapters without changing the core platform

### Current Focus
The repository is currently expanding its perpetuals adapters, with the Hyperliquid adapter being one of the implementations in progress. The adapter needs to implement the required methods defined in the IPerpsAdapter interface. 
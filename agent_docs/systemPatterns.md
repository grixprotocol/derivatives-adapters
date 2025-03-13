# System Patterns

## How the System is Built
The Grix Protocol Adapters system is built using TypeScript and follows a modular architecture based on the adapter pattern. The system is organized into two main categories:

1. **Options Adapters**: For integrating with options trading protocols
2. **Perpetuals (Perps) Adapters**: For integrating with perpetual futures trading protocols

Each category has its own directory structure and base interface that all protocol-specific adapters must implement.

## Key Technical Decisions

### 1. Adapter Pattern
The system uses the adapter pattern to provide a consistent interface for interacting with different protocols. Each protocol has its own adapter that implements a standardized interface, allowing the main application to interact with any protocol through the same methods.

### 2. TypeScript for Type Safety
TypeScript is used throughout the project to provide type safety and better developer experience. Interfaces are defined for all adapters, ensuring that implementations conform to the expected contract.

### 3. Promise-based Async API
All adapter methods that interact with external services return Promises, allowing for asynchronous operations without blocking the main thread.

### 4. Modular Structure
The codebase is organized into modules by protocol type and specific protocol, making it easy to add new protocols or modify existing ones without affecting the rest of the system.

### 5. Testing Framework
Jest is used for testing, with a focus on unit tests for each adapter implementation.

## Architecture Patterns

### Directory Structure
```
src/
├── options/           # Options trading adapters
│   ├── adapters/      # Protocol-specific adapters
│   ├── types/         # Type definitions
│   └── tests/         # Test files
├── perps/             # Perpetual futures adapters
│   ├── adapters/      # Protocol-specific adapters
│   │   ├── base.ts    # Base interface for all perps adapters
│   │   ├── hyperliquid/  # Hyperliquid-specific adapter
│   │   ├── derive/    # Derive-specific adapter
│   │   └── lode/      # Lode-specific adapter
│   ├── types/         # Type definitions
│   └── tests/         # Test files
```

### Adapter Implementation Pattern
Each adapter follows this implementation pattern:
1. Import the base interface
2. Create a class that implements the interface
3. Define a constructor that accepts protocol-specific configuration
4. Implement all required methods from the interface
5. Add any protocol-specific helper methods
6. Export the adapter class

### Configuration Pattern
Adapters are configured through constructor parameters, allowing for different instances to be created with different configurations (e.g., different networks, API keys, etc.).

### Error Handling Pattern
Methods should handle errors gracefully and provide meaningful error messages. Errors from external APIs should be caught and transformed into consistent error formats.

### Testing Pattern
Each adapter should have corresponding test files that verify:
1. Correct implementation of the interface
2. Proper handling of API responses
3. Error handling
4. Edge cases 
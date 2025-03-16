# Grix Protocol Adapter Tools

This directory contains tools for working with protocol adapters in the Grix Protocol ecosystem.

## Table of Contents

- [Create Adapter](#create-adapter)
- [Generate Documentation](#generate-documentation)
- [Test Adapter](#test-adapter)

## Create Adapter

The `create-adapter.ts` tool creates a new protocol adapter based on the template adapter. It copies the template adapter to a new directory and replaces all occurrences of "Template" with the new protocol name.

### Usage

```bash
npx ts-node src/perps/tools/create-adapter.ts
```

The tool will prompt you for the following information:

- Protocol name: The name of your protocol (e.g., "Hyperliquid")
- SDK package name: The npm package name for your protocol SDK (e.g., "@nktkas/hyperliquid")
- Features: The optional features you want to implement

### Example

```bash
$ npx ts-node src/perps/tools/create-adapter.ts
🚀 Grix Protocol Adapter Generator 🚀
-----------------------------------
This tool will help you create a new protocol adapter for the Grix Protocol.

What is the name of your protocol? Hyperliquid
What is the npm package name for your protocol SDK? (Leave empty if none) @nktkas/hyperliquid

Select the features you want to implement:
1. Historical Funding Rates
2. Predicted Funding Rates
3. Open Interest Cap
4. All of the above
5. None of the above (required methods only)
Enter the numbers of the features you want to implement (comma-separated): 4

Installing @nktkas/hyperliquid...
✅ Installed @nktkas/hyperliquid

✅ Adapter for Hyperliquid created successfully!
📁 Location: /Users/username/grixRepos/derivatives-adapters/src/perps/adapters/hyperliquid

Next steps:
1. Implement the required methods in /Users/username/grixRepos/derivatives-adapters/src/perps/adapters/hyperliquid/methods/
2. Update the README.md file with your protocol-specific information
3. Write tests for your adapter in /Users/username/grixRepos/derivatives-adapters/src/perps/adapters/hyperliquid/tests/
4. Run the tests: npm test -- --testPathPattern=src/perps/adapters/hyperliquid
```

## Generate Documentation

The `generate-docs.ts` tool generates documentation for a protocol adapter based on its implementation. It reads the adapter's source code and generates a README.md file with API documentation.

### Usage

```bash
npx ts-node src/perps/tools/generate-docs.ts <adapter-name>
```

### Example

```bash
$ npx ts-node src/perps/tools/generate-docs.ts hyperliquid
✅ Generated README.md for hyperliquid adapter
📁 Location: /Users/username/grixRepos/derivatives-adapters/src/perps/adapters/hyperliquid/README.md
```

## Test Adapter

The `test-adapter.ts` tool runs tests for a protocol adapter to ensure it meets the required interface. It tests all required methods and optional methods if they are implemented.

### Usage

```bash
npx ts-node src/perps/tools/test-adapter.ts <adapter-name>
```

### Example

```bash
$ npx ts-node src/perps/tools/test-adapter.ts hyperliquid
Running tests for hyperliquid adapter...
PASS src/perps/adapters/hyperliquid/tests/hyperliquid.test.ts
✅ Tests passed for hyperliquid adapter
``` 
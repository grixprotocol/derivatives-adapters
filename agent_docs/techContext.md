# Technical Context

## Technologies Used

### Core Technologies
- **TypeScript**: The project is written in TypeScript for type safety and better developer experience.
- **Node.js**: The runtime environment for the project.
- **Jest**: Used for testing the adapters.

### Dependencies
- **axios**: HTTP client for making API requests to protocol endpoints.
- **dotenv**: For loading environment variables from .env files.
- **zomma.js**: Client library for interacting with the Zomma protocol.

### Development Dependencies
- **@types/jest**: TypeScript definitions for Jest.
- **@types/node**: TypeScript definitions for Node.js.
- **ts-jest**: TypeScript preprocessor for Jest.
- **typescript**: TypeScript compiler.

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/grixprotocol/derivatives-adapters.git
   cd derivatives-adapters
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Build the project:
   ```
   npm run build
   ```

### Testing
Run tests using Jest:
```
npm test
```

Run tests in watch mode:
```
npm run test:watch
```

## Technical Constraints

### API Limitations
- Each protocol has its own API limitations, rate limits, and data formats.
- Some protocols may require API keys or authentication.
- Response times may vary between protocols.

### Error Handling
- Adapters must handle API errors gracefully.
- Network errors should be caught and reported in a consistent format.
- Timeouts should be implemented for API calls.

### Type Safety
- All adapter implementations must adhere to the defined interfaces.
- Type definitions should be used for all data structures.

### Testing Requirements
- All adapters must have test coverage.
- Tests should mock external API calls to avoid dependencies on external services.
- Edge cases should be tested.

### Performance Considerations
- API calls should be optimized to minimize latency.
- Caching strategies may be implemented for frequently accessed data.
- Batch requests should be used where possible to reduce the number of API calls.

### Deployment
- The project is designed to be used as a library in other projects.
- It can be published to npm or used directly from the repository.
- Environment variables should be used for configuration in production. 
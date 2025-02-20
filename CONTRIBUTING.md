# Contributing to DeFi Protocol Adapters

## Overview
This repository standardizes data collection from DeFi derivatives protocols. We currently support:
- Options protocols
- Perpetual futures protocols

## Requirements

1. Your adapter must implement the appropriate interface:
   - `OptionsAdapter` for options protocols
   - `PerpsAdapter` for perpetual futures protocols

2. Follow the standard directory structure:
   ```
   src/
   ├── options/
   │   └── adapters/
   │       └── your-protocol/
   │           ├── index.ts           # Main adapter implementation
   │           ├── README.md          # Protocol-specific documentation
   │           └── types.ts           # Protocol-specific types
   │
   └── perps/
       └── adapters/
           └── your-protocol/
               ├── index.ts           # Main adapter implementation
               ├── README.md          # Protocol-specific documentation
               └── types.ts           # Protocol-specific types
   ```

3. Include working test parameters in your adapter
4. All tests must pass (`npm test`)
5. Follow TypeScript best practices

## Implementation Checklist

- [ ] Choose correct base interface (Options or Perps)
- [ ] Implement all required methods
- [ ] Add protocol-specific types if needed
- [ ] Include valid test parameters
- [ ] Add protocol-specific documentation
- [ ] Ensure all tests pass locally
- [ ] Follow code style guidelines
- [ ] No API keys or secrets included

## Testing Requirements

Before submitting:

1. Run the standard test suite:
   ```bash
   npm test
   ```
2. Test with real protocol data
3. Verify error handling
4. Check type safety
5. Test with example parameters

## Documentation Requirements

1. Update your protocol's README.md with:
   - Protocol overview
   - Supported networks
   - Required configuration
   - Example usage
   - Test parameters explanation

2. Include inline documentation for complex logic

## Pull Request Process

1. Create a new branch from `main`
2. Implement your adapter
3. Run tests locally
4. Submit PR with:
   - Clear description of the protocol
   - Links to protocol documentation
   - Test results
   - Any special considerations

PRs will be merged when:
- All tests pass
- Code review is approved
- Documentation is complete
- No security concerns identified

## Best Practices

1. Keep implementations simple
2. Focus on data fetching only
3. Handle errors gracefully
4. Use consistent naming
5. Document assumptions
6. Include type definitions
7. Follow existing patterns

## Need Help?

- Check existing adapters for examples
- Review the interface documentation
- Open an issue for questions
- Join our community discussions 
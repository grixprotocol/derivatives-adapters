# Contributing a New Protocol Adapter

## Requirements

1. Your adapter must implement the `ProtocolAdapter` interface
2. All tests must pass (`npm test`)
3. Include working test parameters
4. Follow the standard directory structure:
   ```
   src/adapters/your-protocol/
   ├── index.ts           # Main adapter implementation
   ├── README.md          # Protocol-specific documentation
   └── types.ts           # Protocol-specific types
   ```

## Checklist

- [ ] Implement all required methods
- [ ] Include valid test parameters
- [ ] Add protocol-specific documentation
- [ ] All tests pass locally
- [ ] Code follows style guidelines
- [ ] No API keys or secrets included

## Testing

Before submitting:

1. Run `npm test` to verify your adapter
2. Test with real protocol data
3. Verify error handling
4. Check type safety

## Pull Request Process

1. Create a new branch
2. Implement your adapter
3. Run tests locally
4. Submit PR
5. Address review feedback

PRs will only be merged if:
- All tests pass
- Code review is approved
- Structure validation passes
- Documentation is complete 
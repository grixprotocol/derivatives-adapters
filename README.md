# Grix Protocol Adapters

Welcome to the Grix Protocol Adapters repository! This project is designed to facilitate the integration of various DeFi options protocols with the Grix platform, enabling easy and smooth quoting of options premium prices.

## Grix Protocol Integration Kit

This guide will help you integrate your DeFi options protocol with Grix, making it easy for Grix users to reach your protocol's options.

### How Grix Works

Fetching Expiry Dates: Grix retrieves all available expiry dates for options, ensuring you have the latest data.
Listing Strike Prices by Expiry: For each expiry date, Grix lists all possible strike prices, giving you a comprehensive view of the market.
Calculating Option Premiums: Grix calculates both long and short option premiums, providing accurate pricing information for your users.

### Quick Contribution Guide

- Fork the Repository: Start by forking the [Grix Protocol Adapters Repository](https://github.com/grixprotocol/defi-options-adapters).
- Develop Your Adapter: Implement the necessary functions for expiry dates, strike prices, and premiums.
- Submit Your Work: Create a pull request with your adapter and documentation.
- Engage with the Community: Join discussions and contribute to the ongoing development.
- For detailed guidelines, please refer to our [Contribution Guidelines](./CONTRIBUTE.md).

For contribution example, see this [PR by Thetanuts](https://github.com/grixprotocol/defi-options-adapters/pull/4) or this [PR by Arrow Market](https://github.com/grixprotocol/defi-options-adapters/pull/10)

### Please Note

While we value consistency and maintainability, we also aim to be flexible to maximize community involvement.
Our coding standards are a guide, not a strict rulebook. We're open to different styles and approaches, especially if they lead to innovative solutions.

Thank you for contributing to Grix! Your efforts help us build a robust, community-driven DeFi options framework.

## Protocols Integration Table

<!-- INTEGRATIONS_TABLE_SECTION -->

| **Protocol Name** | **fetchExpiryDates**                                                                                              | **listStrikePricesByExpiry**                                                                                              | **getLongOptionPremium**                                                                                              | **getShortOptionPremium**                                                                                              | **buyOptionContract**                                                                                              | **addOptionToPosition**                                                                                              | **exerciseOptionContract**                                                                                              | **sellOptionBackToIssuer**                                                                                              | **transferOptionOwnership**                                                                                              | **getEstimatedClosedValue**                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Moby**          | [✅](./moby/fetchExpiryDates/CONTRIBUTE.md)         | [✅](./moby/listStrikePricesByExpiry/CONTRIBUTE.md)         | [✅](./moby/getLongOptionPremium/CONTRIBUTE.md)         | [✅](./moby/getShortOptionPremium/CONTRIBUTE.md)         | [✅](./moby/buyOptionContract/CONTRIBUTE.md)         | [✅](./moby/addOptionToPosition/CONTRIBUTE.md)         | [⏳](./moby/exerciseOptionContract/CONTRIBUTE.md)         | [⏳](./moby/sellOptionBackToIssuer/CONTRIBUTE.md)         | [⏳](./moby/transferOptionOwnership/CONTRIBUTE.md)         | [⏳](./moby/getEstimatedClosedValue/CONTRIBUTE.md)         |
| **Premia**        | [✅](./premia/fetchExpiryDates/CONTRIBUTE.md)       | [✅](./premia/listStrikePricesByExpiry/CONTRIBUTE.md)       | [✅](./premia/getLongOptionPremium/CONTRIBUTE.md)       | [⏳](./premia/getShortOptionPremium/CONTRIBUTE.md)       | [✅](./premia/buyOptionContract/CONTRIBUTE.md)       | [✅](./premia/addOptionToPosition/CONTRIBUTE.md)       | [⏳](./premia/exerciseOptionContract/CONTRIBUTE.md)       | [⏳](./premia/sellOptionBackToIssuer/CONTRIBUTE.md)       | [⏳](./premia/transferOptionOwnership/CONTRIBUTE.md)       | [⏳](./premia/getEstimatedClosedValue/CONTRIBUTE.md)       |
| **Derive**          | [✅](./lyra/fetchExpiryDates/CONTRIBUTE.md)         | [✅](./lyra/listStrikePricesByExpiry/CONTRIBUTE.md)         | [✅](./lyra/getLongOptionPremium/CONTRIBUTE.md)         | [⏳](./lyra/getShortOptionPremium/CONTRIBUTE.md)         | [⏳](./lyra/buyOptionContract/CONTRIBUTE.md)         | [⏳](./lyra/addOptionToPosition/CONTRIBUTE.md)         | [⏳](./lyra/exerciseOptionContract/CONTRIBUTE.md)         | [⏳](./lyra/sellOptionBackToIssuer/CONTRIBUTE.md)         | [⏳](./lyra/transferOptionOwnership/CONTRIBUTE.md)         | [⏳](./lyra/getEstimatedClosedValue/CONTRIBUTE.md)         |
| **Stryke**         | [✅](./stryke/fetchExpiryDates/CONTRIBUTE.md)        | [✅](./stryke/listStrikePricesByExpiry/CONTRIBUTE.md)        | [✅](./stryke/getLongOptionPremium/CONTRIBUTE.md)        | [⏳](./stryke/getShortOptionPremium/CONTRIBUTE.md)        | [⏳](./stryke/buyOptionContract/CONTRIBUTE.md)        | [⏳](./stryke/addOptionToPosition/CONTRIBUTE.md)        | [⏳](./stryke/exerciseOptionContract/CONTRIBUTE.md)        | [⏳](./stryke/sellOptionBackToIssuer/CONTRIBUTE.md)        | [⏳](./stryke/transferOptionOwnership/CONTRIBUTE.md)        | [⏳](./stryke/getEstimatedClosedValue/CONTRIBUTE.md)        |
| **Aevo**          | [✅](./aevo/fetchExpiryDates/CONTRIBUTE.md)         | [✅](./aevo/listStrikePricesByExpiry/CONTRIBUTE.md)         | [✅](aevo/getLongOptionPremium/CONTRIBUTE.md)                                                                         | [✅](./aevo/getShortOptionPremium/CONTRIBUTE.md)         | [⏳](./aevo/buyOptionContract/CONTRIBUTE.md)         | [⏳](./aevo/addOptionToPosition/CONTRIBUTE.md)         | [⏳](./aevo/exerciseOptionContract/CONTRIBUTE.md)         | [⏳](./aevo/sellOptionBackToIssuer/CONTRIBUTE.md)         | [⏳](./aevo/transferOptionOwnership/CONTRIBUTE.md)         | [⏳](./aevo/getEstimatedClosedValue/CONTRIBUTE.md)         |
| **Zomma**         | [✅](./zomma/fetchExpiryDates/CONTRIBUTE.md)        | [✅](./zomma/listStrikePricesByExpiry/CONTRIBUTE.md)        | [✅](./zomma/getLongOptionPremium/CONTRIBUTE.md)        | [⏳](./zomma/getShortOptionPremium/CONTRIBUTE.md)        | [⏳](./zomma/buyOptionContract/CONTRIBUTE.md)        | [⏳](./zomma/addOptionToPosition/CONTRIBUTE.md)        | [⏳](./zomma/exerciseOptionContract/CONTRIBUTE.md)        | [⏳](./zomma/sellOptionBackToIssuer/CONTRIBUTE.md)        | [⏳](./zomma/transferOptionOwnership/CONTRIBUTE.md)        | [⏳](./zomma/getEstimatedClosedValue/CONTRIBUTE.md)        |
| **Ithaca**          | [✅](./ithaca/fetchExpiryDates/CONTRIBUTE.md)         | [✅](./ithaca/listStrikePricesByExpiry/CONTRIBUTE.md)         | [✅](./ithaca/getLongOptionPremium/CONTRIBUTE.md)         | [✅](./ithaca/getShortOptionPremium/CONTRIBUTE.md)         | [⏳](./ithaca/buyOptionContract/CONTRIBUTE.md)         | [⏳](./ithaca/addOptionToPosition/CONTRIBUTE.md)         | [⏳](./ithaca/exerciseOptionContract/CONTRIBUTE.md)         | [⏳](./ithaca/sellOptionBackToIssuer/CONTRIBUTE.md)         | [⏳](./ithaca/transferOptionOwnership/CONTRIBUTE.md)         | [⏳](./ithaca/getEstimatedClosedValue/CONTRIBUTE.md)         |
| **Thetanuts**     | [⏳](thetanuts/fetchExpiryDates/CONTRIBUTE.md)                                                                    | [⏳](./thetanuts/listStrikePricesByExpiry/CONTRIBUTE.md)    | [⏳](./thetanuts/getLongOptionPremium/CONTRIBUTE.md)    | [⏳](./thetanuts/getShortOptionPremium/CONTRIBUTE.md)    | [⏳](./thetanuts/buyOptionContract/CONTRIBUTE.md)    | [⏳](./thetanuts/addOptionToPosition/CONTRIBUTE.md)    | [⏳](./thetanuts/exerciseOptionContract/CONTRIBUTE.md)    | [⏳](./thetanuts/sellOptionBackToIssuer/CONTRIBUTE.md)    | [⏳](./thetanuts/transferOptionOwnership/CONTRIBUTE.md)    | [⏳](./thetanuts/getEstimatedClosedValue/CONTRIBUTE.md)    |
| **Rysk Finance**  | [✅](./rysk-finance/fetchExpiryDates/CONTRIBUTE.md) | [✅](./rysk-finance/listStrikePricesByExpiry/CONTRIBUTE.md) | [✅](./rysk-finance/getLongOptionPremium/CONTRIBUTE.md) | [⏳](./rysk-finance/getShortOptionPremium/CONTRIBUTE.md) | [✅](./rysk-finance/buyOptionContract/CONTRIBUTE.md) | [✅](./rysk-finance/addOptionToPosition/CONTRIBUTE.md) | [⏳](./rysk-finance/exerciseOptionContract/CONTRIBUTE.md) | [⏳](./rysk-finance/sellOptionBackToIssuer/CONTRIBUTE.md) | [⏳](./rysk-finance/transferOptionOwnership/CONTRIBUTE.md) | [⏳](./rysk-finance/getEstimatedClosedValue/CONTRIBUTE.md) |
| **Hegic**         | [⏳](./hegic/fetchExpiryDates/CONTRIBUTE.md)        | [⏳](./hegic/listStrikePricesByExpiry/CONTRIBUTE.md)        | [⏳](./hegic/getLongOptionPremium/CONTRIBUTE.md)        | [⏳](./hegic/getShortOptionPremium/CONTRIBUTE.md)        | [⏳](./hegic/buyOptionContract/CONTRIBUTE.md)        | [⏳](./hegic/addOptionToPosition/CONTRIBUTE.md)        | [⏳](./hegic/exerciseOptionContract/CONTRIBUTE.md)        | [⏳](./hegic/sellOptionBackToIssuer/CONTRIBUTE.md)        | [⏳](./hegic/transferOptionOwnership/CONTRIBUTE.md)        | [⏳](./hegic/getEstimatedClosedValue/CONTRIBUTE.md)        |
| **Gamma Swap**    | [⏳](./gamma-swap/fetchExpiryDates/CONTRIBUTE.md)   | [⏳](./gamma-swap/listStrikePricesByExpiry/CONTRIBUTE.md)   | [⏳](./gamma-swap/getLongOptionPremium/CONTRIBUTE.md)   | [⏳](./gamma-swap/getShortOptionPremium/CONTRIBUTE.md)   | [⏳](./gamma-swap/buyOptionContract/CONTRIBUTE.md)   | [⏳](./gamma-swap/addOptionToPosition/CONTRIBUTE.md)   | [⏳](./gamma-swap/exerciseOptionContract/CONTRIBUTE.md)   | [⏳](./gamma-swap/sellOptionBackToIssuer/CONTRIBUTE.md)   | [⏳](./gamma-swap/transferOptionOwnership/CONTRIBUTE.md)   | [⏳](./gamma-swap/getEstimatedClosedValue/CONTRIBUTE.md)   |
| **Siren**         | [⏳](./siren/fetchExpiryDates/CONTRIBUTE.md)        | [⏳](./siren/listStrikePricesByExpiry/CONTRIBUTE.md)        | [⏳](./siren/getLongOptionPremium/CONTRIBUTE.md)        | [⏳](./siren/getShortOptionPremium/CONTRIBUTE.md)        | [⏳](./siren/buyOptionContract/CONTRIBUTE.md)        | [⏳](./siren/addOptionToPosition/CONTRIBUTE.md)        | [⏳](./siren/exerciseOptionContract/CONTRIBUTE.md)        | [⏳](./siren/sellOptionBackToIssuer/CONTRIBUTE.md)        | [⏳](./siren/transferOptionOwnership/CONTRIBUTE.md)        | [⏳](./siren/getEstimatedClosedValue/CONTRIBUTE.md)        |

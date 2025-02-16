import { ProtocolAdapter } from "../../types/adapter";
import { fetchExpiries } from "./fetchExpiryDates";
import { getLongOptionPremium } from "./getLongOptionPremium";
import { getShortOptionPremium } from "./getShortOptionPremium";
import { listStrikePricesByExpiry } from "./listStrikePricesByExpiry";

/**
 * Test parameters used for validating adapter functionality.
 * Each method has a set of working test parameters that should 
 * return valid responses from Deribit's API.
*/

const testParams = {
    fetchExpiryDates: {
        asset: 'BTC',
    },
    getLongOptionPremium: {
        instrument_name: 'BTC-17FEB25-97000-P',
    },
    getShortOptionPremium: {
        instrument_name: 'BTC-17FEB25-97000-P',
    },
    listStrikePricesByExpiry: {
        expiry: 1739779200,
        asset: 'BTC',
    },
} as const;

/**
 * Deribit Protocol Adapter
 * Implements standard options trading interface for Deribit exchange.
 */

export const deribitAdapter: ProtocolAdapter = {
    fetchExpiryDates: fetchExpiries,
    getLongOptionPremium,
    getShortOptionPremium,
    listStrikePricesByExpiry,
    testParams,
};
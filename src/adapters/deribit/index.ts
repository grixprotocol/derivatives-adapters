import { ProtocolAdapter } from "../../types/adapter";
import { fetchExpiries } from "./fetchExpiryDates";
import { getLongOptionPremium } from "./getLongOptionPremium";
import { getShortOptionPremium } from "./getShortOptionPremium";
import { getBoard } from "./helpers/getOptionsBoard";

// Test parameters that should work with this adapter
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
} as const;


export const deribitAdapter : ProtocolAdapter = {
    fetchExpiryDates: fetchExpiries,
    getLongOptionPremium: getLongOptionPremium,
    getShortOptionPremium: getShortOptionPremium,
    testParams,
};


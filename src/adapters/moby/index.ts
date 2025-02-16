import { fetchExpiryDates } from "./fetchExpiryDates/fetchExpiries";
import { ProtocolAdapter } from "../../types/adapter";

const testParams = {
    fetchExpiryDates: {
        asset: 'ETH',
    },
    
    getLongOptionPremium: {
        instrument_name: 'ETH-30JUN24-3000-C',
    },
    
    getShortOptionPremium: {
        instrument_name: 'ETH-30JUN24-3000-C',
    },
} as const;

export const mobyAdapter: ProtocolAdapter = {
    fetchExpiryDates: fetchExpiryDates,
    getLongOptionPremium: async (params: any) => {
        return 0;
    },
    getShortOptionPremium: async (params: any) => {
        return 0;
    },
    testParams,
};


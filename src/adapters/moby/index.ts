import { fetchExpiryDates } from "./fetchExpiryDates/fetchExpiries";
import { ProtocolAdapter } from "../../types/adapter";

export const mobyAdapter: ProtocolAdapter = {
    fetchExpiryDates: fetchExpiryDates,
    listStrikePricesByExpiry: async (expiry: number) => {
        return [];
    },
    getLongOptionPremium: async (expiry: number, strike: number) => {
        return 0;
    },
};

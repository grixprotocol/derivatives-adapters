import { getShortOptionPremium } from "./getShortOptionPremium/getShortOptionsPremium";
import { getLongOptionPremium } from "./getLongOptionPremium/getLongOptionsPremium";

export const zommaAdapter = {
    getShortOptionPremium: getShortOptionPremium,
    getLongOptionPremium: getLongOptionPremium,
    listStrikePricesByExpiry: (expiry: number) => {
        return [];
    },
    fetchExpiryDates: () => {
        return [];
    },
}   
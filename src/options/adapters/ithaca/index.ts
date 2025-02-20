import { fetchExpiryDates } from "./fetchExpiryDates/fetchExpiryDates";
import { getLongOptionPremium } from "./getLongOptionPremium/getLongOptionPremium";
import { listStrikePricesByExpiry } from "./listStrikePricesByExpiry/listStrikePricesByExpiry";
export const ithacaAdapter = {
    fetchExpiryDates: fetchExpiryDates,
    getLongOptionPremium: getLongOptionPremium,
    listStrikePricesByExpiry: listStrikePricesByExpiry,
};
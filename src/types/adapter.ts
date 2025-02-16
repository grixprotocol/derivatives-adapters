// Interface for the minimal adapter implementation
export interface ProtocolAdapter {
    fetchExpiryDates: () => Promise<number[]>;
    listStrikePricesByExpiry: (expiryDate: number) => Promise<number[]>;
    getLongOptionPremium: (expiry: number, strike: number) => Promise<number>;
  }
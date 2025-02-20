// Interface for the minimal adapter implementation
export interface ProtocolAdapter {
    fetchExpiryDates: (params: any) => Promise<number[] | null>;
    getLongOptionPremium: (params: any) => Promise<number | null>;
    getShortOptionPremium: (params: any) => Promise<number | null>;
    listStrikePricesByExpiry: (params: any) => Promise<number[] | null>;
    testParams: {
      fetchExpiryDates: any;
      getLongOptionPremium: any;
      getShortOptionPremium: any;
      listStrikePricesByExpiry: any;
    };
  }
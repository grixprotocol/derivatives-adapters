export type DeribitBoardOptionsPerExpiry = {
    price_index: string;
    rfq: boolean;
    kind: string;
    min_trade_amount: number;
    is_active: boolean;
    instrument_name: string;
    maker_commission: number;
    taker_commission: number;
    instrument_type: string;
    expiration_timestamp: number;
    contract_size: number;
    strike: number;
    tick_size: number;
    base_currency: string;
    instrument_id: number;
    creation_timestamp: number;
    settlement_period: string;
    option_type: 'call' | 'put';
    block_trade_commission: number;
    block_trade_min_trade_amount: number;
    block_trade_tick_size: number;
    settlement_currency: string;
    counter_currency: string;
    quote_currency: string;
    tick_size_steps: Array<{
      tick_size: number;
      above_price: number;
    }>;
  };


  export enum OptionType {
    call = 'call',
    put = 'put',
  }
  
  export enum UnderlyingAsset {
    BTC = 'BTC',
    ETH = 'ETH',
  }
  
  export enum PriceType {
    bid = 'bid',
    ask = 'ask',
  }
  
export type GetMarketOptionsParams = {
  asset: UnderlyingAsset;
  assetPrice: number;
};

export type PriceData = {
  price: number;
  availableAmount: number | null;
  premiumRate: number | null;
};

export type MarketOption = {
  optionType: OptionType;
  expiryTimestamp: number;
  strikePrice: number;
  asset: UnderlyingAsset;
  metadata?: {
    markPrice: number | null;
    assetPrice: number | null;
  };
  ask: PriceData | null;
  bid: PriceData | null;
  instrument_name?: string;
};

export type GetMarketOptionsResponse = MarketOption[];

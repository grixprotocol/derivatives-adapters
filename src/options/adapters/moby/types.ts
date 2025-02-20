//**** MOBY BOARD - OPTION ****//

export type MobyBoardOption = {
    instrument: string; //example: BTC-17DEC24-97000-C
    optionId: string; //example: 0x00010067612f80000000017ae800000000000000000000000000000000000000
    strikePrice: number; //example: 97000
    markIv: number; //example: 0.7910035807555947,
    markPrice: number; //example: 7876.0835934441275, unit: USD
    riskPremiumRateForBuy: number; //example: 0.07636258955735702
    riskPremiumRateForSell: number; //example: 0.08692946057929313
    delta: number;
    gamma: number;
    vega: number;
    theta: number;
    volume: number; //example: 11048.123034777698, unit: USD
    isOptionAvailable: boolean;
  };
  
  export type MobyBoardOptionsPerExpiry = {
    [expiry: string]: {
      call: MobyBoardOption[];
      put: MobyBoardOption[];
    };
  };
  
  //**** OLPS - option liquidity pool ****//
  
  type OlpAssetAmount = {
    utilizedAmount: number;
    availableAmount: number; //the available amount is the amount that can be utilized to trade options
    depositedAmount: number;
  };
  
  type Olp = {
    greeks: any;
    assetAmounts: {
      wbtc: OlpAssetAmount;
      weth: OlpAssetAmount;
      usdc: OlpAssetAmount;
    };
    utilityRatio: {
      utilizedUsd: number;
      depositedUsd: number;
    };
  };
  
  export type OlpStats = {
    sOlp: Olp;
    mOlp: Olp;
    lOlp: Olp;
  };
  
  //**** MOBY BOARD ****//
  
  export type MobyBoardData = {
    data: {
      market: {
        BTC: {
          expiries: number[];
          options: MobyBoardOptionsPerExpiry;
        };
        ETH: {
          expiries: number[];
          options: MobyBoardOptionsPerExpiry;
        };
      };
      futureIndices: any;
      spotIndices: any;
      riskFreeRates: any;
      olpStats: OlpStats;
    };
    timestamp: number;
    lastUpdatedAt: Date;
  };
  
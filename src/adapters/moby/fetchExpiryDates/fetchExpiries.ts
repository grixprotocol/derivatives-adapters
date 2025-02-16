import { MobyBoardData, MobyBoardOptionsPerExpiry, OlpStats } from "../types";
  
export const fetchExpiryDates = async (): Promise<number[]> => {
    const assets = ['BTC', 'ETH'];
    const expiries: number[] = [];
    const mobyApi = 'https://api.moby.trade/v1/market/all';

    for (const asset of assets) {
        
        const response = await fetch(`${mobyApi}`);
        const data: MobyBoardData = await response.json();
        const fetchedExpiries = data.data.market[asset as keyof typeof data.data.market].expiries;

        expiries.push(...fetchedExpiries);
    }

    return expiries;
  };
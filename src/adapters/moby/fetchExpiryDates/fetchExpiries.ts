import { MobyBoardData } from "../types";
  
interface FetchExpiryDatesParams {
    asset: string;
}

export const fetchExpiryDates = async (params: FetchExpiryDatesParams): Promise<number[]> => {
    const { asset } = params;
    const mobyApi = 'https://api.moby.trade/v1/market/all';

    const response = await fetch(`${mobyApi}`);
    const data: MobyBoardData = await response.json();
    const fetchedExpiries = data.data.market[asset as keyof typeof data.data.market].expiries;

    return fetchedExpiries;
  };
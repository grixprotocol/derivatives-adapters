import { DeribitBoardOptionsPerExpiry } from '../types';

export const getBoard = async (asset: 'BTC' | 'ETH'): Promise<DeribitBoardOptionsPerExpiry[]> => {
  const deribitApi = `https://www.deribit.com/api/v2/public/get_instruments?currency=${asset}&expired=false&kind=option`;
  const response = await fetch(deribitApi);

  const data = await response.json();
  return data.result;
};





interface GetLongOptionPremiumParams {
  instrument_name: string;
}

export const getLongOptionPremium = async ({ instrument_name }: GetLongOptionPremiumParams) : Promise<number | null> => {
  console.log('instrument_name ->', instrument_name);
  const orderbookUrl = `https://www.deribit.com/api/v2/public/get_order_book?depth=1&instrument_name=${instrument_name}`;
  const response = await fetch(orderbookUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch orderbook: ${response.statusText}`);
  }

  const parsedOrderbook = await response.json();

  if (!parsedOrderbook.result) {
    throw new Error(
      `Invalid response from Deribit: ${JSON.stringify(parsedOrderbook)}`
    );
  }

  const orderbookData = parsedOrderbook.result;

  if (orderbookData.asks.length === 0) {
    return null;
  }

  if (orderbookData.asks.length > 0) {
    const askPrice = orderbookData.asks[0][0];
    return askPrice * orderbookData.underlying_price;
  }

  return null;
};

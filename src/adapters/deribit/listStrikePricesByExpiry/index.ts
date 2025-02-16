import { getBoard } from "../helpers/getOptionsBoard";

interface ListStrikePricesByExpiryParams {
    expiry: number;
    asset: 'BTC' | 'ETH';
}

export const listStrikePricesByExpiry = async (params: ListStrikePricesByExpiryParams) => {
    const { expiry, asset } = params;
    const board = await getBoard(asset);
    const options = board.filter((option) => option.expiration_timestamp/1000 === expiry);
    return options.map((option) => option.strike);
};
import { getBoard } from "../helpers/getOptionsBoard";

interface FetchExpiryDatesParams {
    asset: 'BTC' | 'ETH';
}

export const fetchExpiries = async ({ asset }: FetchExpiryDatesParams) => {
    const deribitOptionsBoard = await getBoard(asset);

    return deribitOptionsBoard.map((option) => option.expiration_timestamp);
};
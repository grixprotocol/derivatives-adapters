// Importing the necessary modules
import axios from 'axios';

interface fetchLongOptionPremiumPayload {
    contract_type: string;
    quantity: number;
    strike: string;
    side: string;
    expiration: string;
    underlying: string;
}

interface fetchLongOptionPremiumResponseItems {
    expiration: string;
    side: string;
    ticker: string;
    strike: number;
    price: number;
}
interface fetchLongOptionPremiumResponse {
    prices: fetchLongOptionPremiumResponseItems[];
}

function convertUnixToISO8601(unixTimestamp: number): string {
    // Multiply by 1000 to convert the Unix timestamp (seconds) to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Convert to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const isoString = date.toISOString();

    // Return the formatted string without the 'Z' (which indicates UTC time)
    return isoString.replace('Z', '');
}

async function fetchLongOptionPremium(underlying: string, strike: string, contract_type: string, expiration: number) {
    try {
        const payload: fetchLongOptionPremiumPayload = {
            contract_type: contract_type, // use 'C' or 'P'
            quantity: 0, // constant value, 
            strike: strike,
            side: 'Buy', // constant value for long option
            expiration: convertUnixToISO8601(expiration),
            underlying: underlying
        };

        const response = await axios.post<fetchLongOptionPremiumResponse>(
            'https://api-rfq-testnet.prd.arrowmarkets.delivery/options/bulk-price',
            // 'http://localhost:3000/options/bulk-price',
            {options: [payload]} // payload needs to be in a list, we can accept query of a lot of items at the same time
        );

        // currenntly set discounted price
        const discountedPrice = 0.75

        return response.data.prices[0].price * discountedPrice;

    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}
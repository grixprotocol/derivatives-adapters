// Importing the necessary modules
import axios from 'axios';

interface FetchStrikesResponse {
    strikes: string[];
}

function convertUnixToISO8601(unixTimestamp: number): string {
    // Multiply by 1000 to convert the Unix timestamp (seconds) to milliseconds
    const date = new Date(unixTimestamp * 1000);

    // Convert to ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
    const isoString = date.toISOString();

    // Return the formatted string without the 'Z' (which indicates UTC time)
    return isoString.replace('Z', '');
}

async function fetchStrikesByExpiry(underlying: string, expiration: number) {
    try {


        const iso_expiration = convertUnixToISO8601(expiration);

        const response = await axios.get<FetchStrikesResponse>('https://api-rfq-testnet.prd.arrowmarkets.delivery/options/strikes', {
            params: {
                underlying: underlying,
                expiration: iso_expiration
            }
        });

        return response.data.strikes;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

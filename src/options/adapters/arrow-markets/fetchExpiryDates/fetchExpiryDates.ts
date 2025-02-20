// Importing the necessary modules
import axios from 'axios';

interface FetchExpiryDatesResponse {
    expirations: number[];
}

async function fetchExpiryDates() {
    try {
        const response = await axios.get<FetchExpiryDatesResponse>('https://api-rfq-testnet.prd.arrowmarkets.delivery/options/expirations');
        
        // Axios automatically parses the response JSON
        const data = response.data;

        // Output the data to the console
        return data.expirations;
    } catch (error) {
        // Handle errors
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }
}

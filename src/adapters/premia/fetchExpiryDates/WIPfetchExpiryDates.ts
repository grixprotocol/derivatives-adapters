import { Premia, SupportedChainId, Addresses } from "@premia/v3-sdk";
import { ethers } from 'ethers';

interface TradeOptions {
    size: string; // Representing size as a string to handle large numbers
    isBuy: boolean;
    poolAddress: string;
    minimumSize?: string;
    referrer?: string;
    taker?: string;
}

// Enhanced to include expiry date fetching
export const fetchPoolsWithExpiries = async () => {
    const API_KEY = 'your_infura_api_key';
    const privateKey = 'your_private_key';
    const chainId = SupportedChainId.ARBITRUM;

    // Initialize Premia with the Arbitrum network configuration
    const premia = await Premia.initialize({
        provider: `https://arbitrum-mainnet.infura.io/v3/${API_KEY}`,
        chainId: chainId,
        privateKey: privateKey,
    });

    try {
        // Example: Fetching pools for a specific token, e.g., WBTC
        const tokenAddress = Addresses[chainId].WBTC;
        const pools = await premia.pools.getPools(tokenAddress, false);
        console.log("Pools for WBTC:", pools);

        // Process pools to extract unique expiries
        const uniqueExpiries = pools.reduce((acc, pool) => {
            const expiryDate = pool.maturity;
            // Ensure we only add unique expiry dates
            if (!acc.includes(expiryDate)) {
                acc.push(expiryDate);
            }
            return acc;
        }, []);

        console.log("Unique Expiry Dates:", uniqueExpiries);

        // Further logic to handle expiries, such as filtering pools by expiry, can be added here

    } catch (error) {
        console.error("Error fetching pools and expiries:", error);
    }
};

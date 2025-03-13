/**
 * Utility functions for the Hyperliquid adapter
 */

/**
 * Extracts the base asset name from a trading pair string
 * @param pair Trading pair in the format "BASE-QUOTE" (e.g., "BTC-USD")
 * @returns The base asset name
 */
export function extractBaseAsset(pair: string): string {
  // Split the pair by "-" and take the first part
  const parts = pair.split('-');
  if (parts.length < 2) {
    throw new Error(`Invalid pair format: ${pair}. Expected format: BASE-QUOTE (e.g., BTC-USD)`);
  }
  return parts[0];
}

/**
 * Formats an asset name as a trading pair with USD as the quote currency
 * @param assetName The base asset name (e.g., "BTC")
 * @returns The formatted trading pair (e.g., "BTC-USD")
 */
export function formatAsPair(assetName: string): string {
  return `${assetName}-USD`;
} 
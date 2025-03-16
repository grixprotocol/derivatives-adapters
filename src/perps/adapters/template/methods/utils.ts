/**
 * Utility functions for the Template adapter
 */

/**
 * Converts a coin name to a standardized trading pair format
 * @param coin The coin name (e.g., "BTC")
 * @returns The standardized trading pair (e.g., "BTC-USD")
 */
export function coinToPair(coin: string): string {
  return `${coin}-USD`;
}

/**
 * Extracts the coin name from a standardized trading pair
 * @param pair The trading pair (e.g., "BTC-USD")
 * @returns The coin name (e.g., "BTC")
 */
export function pairToCoin(pair: string): string {
  return pair.split('-')[0];
}

/**
 * Validates a trading pair format
 * @param pair The trading pair to validate
 * @returns True if the pair is valid, false otherwise
 */
export function isValidPair(pair: string): boolean {
  return /^[A-Z0-9]+-[A-Z0-9]+$/.test(pair);
}

/**
 * Formats a number to a specified number of decimal places
 * @param value The number to format
 * @param decimals The number of decimal places
 * @returns The formatted number
 */
export function formatNumber(value: number, decimals: number): number {
  return Number(value.toFixed(decimals));
} 
/**
 * Test utilities for Hyperliquid adapter tests
 */
import { HyperliquidAdapter } from '../index';

/**
 * Creates a new instance of the Hyperliquid adapter configured for testnet
 * @returns A new instance of the Hyperliquid adapter
 */
export function createTestAdapter(): HyperliquidAdapter {
  return new HyperliquidAdapter({
    network: 'testnet',
    timeout: 15000 // Increased timeout for tests
  });
}

/**
 * Checks if a value is a valid number
 * @param value The value to check
 * @returns True if the value is a valid number, false otherwise
 */
export function isValidNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}

/**
 * Checks if a value is a valid string array
 * @param value The value to check
 * @returns True if the value is a valid string array, false otherwise
 */
export function isValidStringArray(value: any): boolean {
  return Array.isArray(value) && value.every(item => typeof item === 'string');
}

/**
 * Waits for a specified amount of time
 * @param ms The number of milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Retries a function until it succeeds or the maximum number of retries is reached
 * @param fn The function to retry
 * @param maxRetries The maximum number of retries
 * @param delay The delay between retries in milliseconds
 * @returns The result of the function
 */
export async function retry<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.warn(`Retry ${i + 1}/${maxRetries} failed:`, error);
      
      if (i < maxRetries - 1) {
        await wait(delay);
      }
    }
  }
  
  throw lastError!;
}